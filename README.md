# Values, Entities, Aggregates & Parsers

[Back to the workshop overview](https://github.com/PensionBee/ddd-workshop#ddd-workshop-overview)

## Context

### Values & Entities

#### What is an Entity?

In Domain-Driven Design, an **entity** is a representation of anything in a domain which can be defined by a unique identifier that remains constant throughout it's lifecycle. A simple entity can be made up of primitive **values** (attributes) some of which will change  throughout the entity's lifecycle. For example:

```sh
Order                      # 'Order' is an entity - even when the attributes of an order change, it's still the same order
  ID                       # 'ID' is a simple value that uniquely identifies the specific order throughout its lifecycle
  Buyer ID                 # 'Buyer ID' is a simple value that references the 'Buyer' entity by it's unique ID
  Estimated Delivery Date  # 'Estimated Delivery Date' is a simple value that could change throughout the Order's lifecycle
  ...
```

Entities can also contain more complex (nested) values...

```sh
Order
  ID
  Buyer ID
  Estimated Delivery Date
  Delivery Address    # 'Delivery Address' is a nested value that could change throughout the Order's lifecycle
    Number
    Street
    City
    Postcode
  ...
```

### Aggregates

#### What is an Aggregate?

An aggregate is essentially a group of closely related entities which **always** need to be consistent with each other and **always** need to be used, processed or persisted as a single unit.

Let's update the above `Order` entity by including additional (relevant) entities inside it:

```sh
Order
  ID
  Buyer ID
  Estimated Delivery Date
  Delivery Address
    Number
    Street
    City
    Postcode
  Order Lines              # 'Order Lines' is a collection of 'Order Line' Entities
    Order Line 1
      ID                   # Each 'Order Line' has it's own unique ID
      Product ID           # 'Product ID' is likely a reference to a specific `Product` instance
      Product Price
      Quantity             # 'Quantity' could change throughout the lifecycle of an 'Order Line' (a customer could edit this before dispatch)
      Total Price          # 'Total Price' could change throughout the lifecycle of an 'Order Line' (e.g. if the 'Quantity' changes)
    Order Line 2
      ID
      Product ID
      Product Price
      Quantity
      Total Price
    ...
  ...
```

In the above example, we have an `Order` aggregate (the consistency boundary), which is made up of an `Order` entity (the primary entity, commonly known as the "aggregate root") and a collection of `Order Line` entities. Note that aggregates often take on the name of the aggregate root entity, e.g. `Order` entity -> `Order` aggregate.

But why do we need this?

Let's say we have several business rules focused on orders:

- Spend more than £50 and get speedy delivery
- Buy the same item 5 times and get 5% off
- Spend more than £100 and get 10% off 'special' items
- Discounts are capped at £50
- Customers with an 'Eco' status pay £1 extra per delivery, after discounts
- etc.

As the number of business rules increases, it becomes easier for our `order` entities and `Order line` entities to get into an inconsistent state if we treat them all as independent units. To reduce the chances of this happening, we can process the `Order` as a single unit, i.e. everything within the aggregate's consistency boundary.

#### Single-Entity Aggregates

It's not unreasonable to have entities which only need to be used/modified/persisted on their own. In these cases, we essentially have a single-entity aggregate which we can name after the entity itself, e.g. `Profile` entity -> `Profile` aggregate. In the future, we might find that we need to add more entities to the `Profile` aggregate or move the `Profile` entity to be part of another aggregate - it all depends on how the domain and business rules evolve over time.

#### Abstract Aggregates

Aggregates (and entities) all fall somewhere on an 'abstractness' scale. Some are very easy to reason about and visualise in the physical world (e.g. a `Customer` aggregate) whereas others are more difficult. For example, in a banking application, we might choose to model the process of moving money between two `Bank Account` aggregates using a seaprate `Transaction` aggregate, which might look something like this:

```sh
Transaction
  ID
  Status
  Amount
  Sending Account ID
  Receiving Account ID
  ...
```

A `Transaction` may be more difficult to imagine in the physical world than a `Customer` but it's still a perfectly valid aggregate.

### Parsers

#### What is a Parser?

In the context of DDD aggregates, a parser turns some unknown, unvalidated data into a valid aggregate. As an example, let's say we have a `/register` API endpoint which creates an `Account` aggregate in our system. The payload sent to that endpoint by a client (web app, mobile app, etc.) might look like this:

```json
{
  "email": "abc123@test.com",
  "password": "password1",
  "houseNumber": "1",
  "streetName": "Main Street",
  "city": null,
  "postcode": "1234 567"
}
```

However, internally, an `Account` aggregate might look like this:

```ts
type Account = {
  id: string;         // Required but generated internally
  email: string;      // Required
  password: string;   // Required
  address: {
    number: number;   // Required
    street: string;   // Required
    city: string;     // Required
    postcode: string; // Required - should be in the format AB11 1AB
  }
  ...
}
```

When creating a new `Account` aggregate, we need to validate the data used to create it, and make sure it's in the correct structure (or transform it to the correct structure) - this is where parsers come in. In practice, this can be done by rolling your own validation/transformation functions or by using a parsing library (which is what we'll do in the 'The Practical Bit' below).

## Resources

Feel free to check these out before or after completing 'The Practical Bit' below.

- [Domain-Driven Design: Entities, values, and How To Distinguish Them (5 minutes read)]([https://...](https://blog.jannikwempe.com/domain-driven-design-entities-value-objects))
- [Entities & values (2.5 minute video)](https://www.youtube.com/watch?v=r8q5DD9rd3M)
- [The One Question To Haunt Everyone: What is a DDD Aggregate? (25 minute video)](https://www.youtube.com/watch?v=zlFqjD2LKlE)

## Directory Structure Overview

At this point, it's worth touching upon the directory structure we're using. We currently have 2 bounded contexts, `Accounts` and `Posts`, which live in the **src/contexts/** directory and have the same structure:

- **core/**: This is our "application core", where we'll model our entities and build out our system's capabilities (e.g. creating a post or following another account). We want to keep the code in this layer focused on business concepts and business rules as much as possible. (*If you're already familiar with onion/clean/hexagonal/ports-and-adapters architecture, this layer is essentially the "domain" and "application" layers squashed into one for simplicity.*)
- **infra/**: Short for "infrastructure" - this is where we'll write the code which allows the application core to interact with the external world (e.g. accessing the database, the file system or a 3rd party system).
- **interface/**: This is the opposite of infrastructure; a way for the outside world to interact with our application. This is where we'll write our API code.

## The Practical Bit

*Note: each section of the workshop builds upon the previous one. You can check your solutions against the code found in the next section.*

Let's have another look at the EventStorming diagram we're using to guide the code we write...

Note that we have 3 aggregates: `Account`, `Post` and `Post Comment`. Let's turn those concepts into code.

### Part 1: Modelling Posts

When modelling aggregates, we're trying to capture the essential attributes which uniquely define a particular domain concept. Too few attributes and we miss out important information. Too many and we clutter our aggregates with redundant information, especially when that information lives on related aggregates.

- In **src/contexts/posts/core/aggregates/post.ts**:
  - Complete the `postSchema` using the **zod** parsing library ([zod primitives](https://github.com/colinhacks/zod#primitives) and [zod objects](https://github.com/colinhacks/zod#objects)). This will serve as the primary 'definition' of our `Post` aggregate while providing us with the aboility to perform runtime validation.
  - Complete the `parsePost` function which takes a `data` argument (an unknown record type) and parses it using the schema defined in the previous step ([zod parsing](https://github.com/colinhacks/zod#basic-usage)). This function should return a valid `Post` aggregate if the data is valid or throw an error if the data is invalid.

*Note that we're using `zod`'s `infer` utility type to generate a `Post` aggregate type that we can use in other parts of our system in future sections.*

### Part 2: Modelling Post Comments

- In **src/contexts/posts/core/aggregates/postComment.ts**:
  - Define the `PostComment` type, `postCommentSchema` and `parsePostComment` function.
  - Ensure the `PostComment` type and the `parsePostComment` function are exported so they can be used in other parts of the system.

### Part 3: Modelling Account Followers

We already have an existing `Account` aggregate in our `Accounts` bounded context but it doesn't currently capture the concept of 'account followers'. Let's rectify that...

- In **src/contexts/accounts/core/aggregates/account.ts**:
  - Update `accountSchema` to include a `follower` attribute. This will hold information about all the followers of an account. (Hint: This could be a simple list of account IDs or a list of `Account Follower` entities. Feel free to explore this concept a little)

### Part 4: Testing our Parsers

Although tests are really important in software, it's not always obvious what we should be testing. Should we test every piece of functionality in isolation? Should we only write tests against API endpoints? What about integration and end-to-end tests?

In this workshop, we'll cover some of these questions by writing tests at various levels and then comparing them to each other to see how much value we're really getting out of each. Let's start by testing our low-level parser functions.

- In **src/contexts/posts/core/aggregates/post.spec.ts**:
  - Complete the tests to ensure the `parsePost` function works as expected.
- In **src/contexts/posts/core/aggregates/postComment.spec.ts**:
  - Write the tests to ensure the `parsePostComment` function works as expected.
- In **src/contexts/accounts/core/aggregates/account.spec.ts**:
  - Update the tests to ensure the `parseAccount` function works as expected
