# Values, Entities, Aggregates & Parsers

[Back to the workshop overview](https://github.com/PensionBee/ddd-workshop#ddd-workshop-overview)

## Context

### What is an Entity?

In Domain-Driven Design, an entity is a representation of anything in a domain which is defined by a unique identifier throughout it's lifecycle. For example:

```sh
Order                 # 'Order' is an entity - even when the attributes of an order change, it's still the same order
  ID                  # 'ID' is a simple value that uniquely identifies the specific order throughout its lifecycle
  Buyer ID            # 'Buyer ID' is a simple value that references the 'Buyer' entity by it's unique ID
  Total Price         # 'Total Price' is a simple value that can could change throughout the entity's lifecycle
  Delivery Address    # 'Delivery Address' is a nested value that could change throughout the entity's lifecycle
    Number
    Street
    City
    Postcode
  ...
```

You'll also often see the concept of an 'aggregate' thrown around in DDD communities. An aggregate is essentially a group of entities which **always** need to be consistent with each other and need to be processed/modified/persisted as a single unit. For example:

```sh
Order
  ID
  Total Price
  Buyer ID
  Delivery Address
    Number
    Street
    City
    Postcode
  Order Lines          # 'Order Lines' is a collection of 'Order Line' Entities (each with its own unique ID)
    Order Line 1
      ID
      Product ID
      Product Price
      Quantity
      Total Price**
    Order Line 2
      ID
      Product ID
      Product Price
      Quantity
      Total Price
```

In the above example, we have an Order aggregate (the consistency boundary) where the Order entity is the aggregate's primary entity, known as the 'aggregate root'.

Entities/aggregates all fall somewhere on an 'abstractness' scale. Some are really easy to reason about and visualise in the physical world (e.g. a customer entity) whereas others are more difficult to reason about and/or visualise. For example, in a banking application, we might choose to model the process of moving money between two `Bank Account` entities using a `Transaction` entity, which might look something like this:

```sh
Transaction
  ID
  Status
  Amount
  Sending Account ID
  Receiving Account ID
```

A `Transaction` might be more difficult to imagine in the physical world than a `Customer`, but it's still a perfectly valid entity.

### Parsing

In this context, parsing refers to turning a 'blob' of unvalidated data into a valid entity/aggregate. As an example, let's say we have a `/register` API endpoint which creates an `Account` entity in our system. The payload sent to that endpoint by a client (web app, mobile app, etc.) might look like this:

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

However, an internal representation of an `Account` entity might look like this:

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
}
```

When creating a new `Account` entity, we need to validate the data used to create it, and make sure it's in the correct structure. In practice, this can be done by rolling your own validation/transformation functions or by using a parsing library (which is what we'll do in the 'The Practical Bit' below).

## Resources

Feel free to check these out before or after completing 'The Practical Bit' below.

- [Domain-Driven Design: Entities, values, and How To Distinguish Them (5 minutes read)]([https://...](https://blog.jannikwempe.com/domain-driven-design-entities-value-objects))
- [Entities & values (2.5 minute video)](https://www.youtube.com/watch?v=r8q5DD9rd3M)

## Directory Structure Overview

At this point, it's worth touching upon the directory structure we're using. We currently have 2 bounded contexts, `Accounts` and `Posts`, which live in the **src/contexts/** directory and have the same structure:

- **core/**: This is our "application core", where we'll model our entities and build out our system's capabilities (e.g. creating a post or following another account). We want to keep the code in this layer focused on business concepts and business rules as much as possible. (*If you're already familiar with onion/clean/hexagonal/ports-and-adapters architecture, this layer is essentially the "domain" and "application" layers squashed into one for simplicity.*)
- **infra/**: Short for "infrastructure" - this is where we'll write the code which allows the application core to interact with the external world (e.g. accessing the database, the file system or a 3rd party system).
- **interface/**: This is the opposite of infrastructure; a way for the outside world to interact with our application. This is where we'll write our API code.

## The Practical Bit

*Note: each section of the workshop builds upon the previous one. You can check your solutions against the code found in the next section.*

Let's have another look at the EventStorming diagram we're using to guide the code we write...

Note that we have 3 entities: `Account`, `Post` and `Post Comment`. Let's turn those concepts into code.

### Part 1: Modelling Posts

When modelling entities/aggregates, we're trying to capture the essential attributes which uniquely define a particular domain concept. Too few attributes and we miss out important information. Too many and we clutter our entities with redundant information, especially when that information lives on related entities.

- In **src/contexts/posts/core/entities/post.ts**:
  - Complete the `postSchema` using the **zod** parsing library ([zod primitives](https://github.com/colinhacks/zod#primitives) and [zod objects](https://github.com/colinhacks/zod#objects)). This will serve as the primary definition of our post entity and provide us with runtime validation capabilities.
  - Complete the `parsePost` function which takes a `data` argument (an unknown record type) and parses it using the schema defined in the previous step ([zod parsing](https://github.com/colinhacks/zod#basic-usage)). This function should return a valid `Post` entity if the data is valid or throw an error if the data is invalid.

*Note that we're using `zod`'s `infer` utility type to generate a `Post` entity type that we can use in other parts of our system in future sections.*

### Part 2: Modelling Post Comments

- In **src/contexts/posts/core/entities/postComment.ts**:
  - Define the `PostComment` type, `postCommentSchema` and `parsePostComment` function.
  - Ensure the `PostComment` type and the `parsePostComment` function are exported so they can be used in other parts of the system.

### Part 3: Modelling Account Following

We already have an existing `Account` entity in our `Accounts` bounded context but it doesn't currently capture the concept of 'account following'. Let's rectify that...

- In **src/contexts/accounts/core/entities/account.ts**:
  - Update the `Account` entity parser to include a `following` attribute. This will hold information about all the accounts an account follows.

### Part 4: Testing our Parsers

Although tests are really important in software, it's not always obvious what we should be testing. Should we test every piece of functionality in isolation? Should we only write tests against API endpoints? What about integration and end-to-end tests?

In this workshop, we'll cover some of these questions by writing tests at various levels and then comparing them to each other to see how much value we're really getting out of each one. Let's start by testing our low-level parser functions.

- In **src/contexts/posts/core/entities/post.spec.ts**:
  - Complete the tests to ensure the `parsePost` function works as expected.
- In **src/contexts/posts/core/entities/postComment.spec.ts**:
  - Write the tests to ensure the `parsePostComment` function works as expected.
- In **src/contexts/accounts/core/entities/account.spec.ts**:
  - Update the tests to ensure the `parseAccount` function works as expected
