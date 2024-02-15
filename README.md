# Values, Entities & Parsers

[Back to the workshop overview](https://github.com/PensionBee/ddd-workshop#ddd-workshop-overview)

## Context

### What is an Entity?

An **Entity** represents anything which has a lifecycle and can be modelled with a unique identifier. A simple entity can be made up of primitive **Values** (attributes) only, which may change throughout the entity's lifecycle. For example:

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
    Delivery Address         # 'Delivery Address' is a nested value that could change throughout the Order's lifecycle. Note the lack of a Delivery Address ID. 
        Number
        Street
        City
        Postcode
  ...
```

### Nested Entities (Aggregates)

A nested entity is essentially a group of closely related entities which **always** need to change as a single unit because they **always** need to be immediately consistent with each other (think "ACID transactions" if that's a familiar concept). For example:

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
            ID               # Each 'Order Line' has it's own unique ID
            Product ID       # 'Product ID' is likely a reference to a specific `Product` instance
            Product Price
            Quantity         # 'Quantity' could change throughout the lifecycle of an 'Order Line' (a customer could edit this before dispatch)
            Total Price      # 'Total Price' could change throughout the lifecycle of an 'Order Line' (e.g. if the 'Quantity' changes or a discount is applied because the order is delayed)
        Order Line 2
            ID
            Product ID
            Product Price
            Quantity
            Total Price
    ...
  ...
```

Here, the `Order` entity is the primary entity which creates a consistency boundary encapsulating both it's own values as well as a collection of `Order Line` entities.

**YOU'RE GUARANTEED TO COME ACROSS THE CONCEPT OF AN 'AGGREGATE' IN MOST DDD BOOKS/ARTICLES/TALKS/VIDEOS. THIS IS ESSENTIALLY WHAT WE HAVE ABOVE, WE'RE JUST CALLING THEM 'NESTED ENTITIES' HERE SO WE DON'T HAVE TO EXPLICITLY DISTINGUISH BETWEEN AGGREGATES AND ENTITIES.**

But why do we need this? Why can't we just model all our entities in isolation?

Good question! There's absolutely nothing stopping you doing exactly that but there can be some downsides to this approach...

Let's say we have several business rules centred around an order:

- Spend more than £50 and get speedy delivery
- Buy 5 or more of the same item and get 15% off that item item
- Spend more than £100 and get 10% off 'special' items
- Discounts are capped at £50
- Customers with an 'Eco' status pay £1 extra per delivery, after discounts, to support the environment
- etc.

As the number of business rules increases, it becomes easier for our `Order` and `Order line` entities to get into an inconsistent state and we might end up with some gnarly data inconsistency bugs if we treat each entity as an independent unit. To reduce the chances of this happening, we can group these entities together and treat them as a single unit when anything about those entities changes. This makes it easier to enforce business rules across all relevant entities.

Note that, from a code perspective, it's generally easier to deal with standalone entities than nested ones. In many cases, it's reasonable to design entities like this but there are certainly cases where the benefits of grouping entities together will outweigh the code overhead.

### Abstract Entities

Entities all fall somewhere on an 'abstractness' scale. Some are very easy to reason about and visualise in the physical world (e.g. a `Customer` entity) whereas others are more difficult - but that doesn't mean they aren't valid entities. For example, in a banking application, we might choose to model the process of moving money between two `Bank Account` entities using a seaprate `Transaction` entity, which might look something like this:

```sh
Transaction
    ID
    Status
    Amount
    Sending Account ID
    Receiving Account ID
  ...
```

### What is a Parser?

In the context of DDD entities, a parser turns unvalidated data into a valid entity (or throws/returns an error). As an example, let's say we have a `/register` API endpoint which results in an `Account` entity being created in our system. The payload sent to that endpoint by a client (web app, mobile app, etc.) might look like this:

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

However, internally, an `Account` entity might look like this:

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

When our system creates a new `Account` entity, we need to validate the data used to create it, and potentially transform the structure/format/data types in some way to match our internal representation. This is exactly where parsers come in.

In practice, we could roll your own validation/transformation functions or use an off-the-shelf parsing library (which is what we'll do in the 'The Practical Bit' below).

## Directory Structure Overview

At this point, it's worth touching upon the directory structure we're using. We currently have 2 bounded contexts, `Accounts` and `Posts`, which live in the **src/contexts/** directory. Each of these have the same structure:

- **core/**: This is our "application core", where we'll model our entities and build out our system's capabilities (e.g. creating a post or following another account). We want to keep the code in this layer focused on business concepts and business rules as much as possible. (*If you're already familiar with onion/clean/hexagonal/ports-and-adapters architecture, this layer is essentially the "domain" and "application" layers squashed into one for simplicity.*)
- **infra/**: Short for "infrastructure" - this is where we'll write the code which allows the application core to interact with the external world (e.g. accessing the database, the file system or a 3rd party system).
- **interface/**: This is the opposite of infrastructure; a way for the outside world to interact with our application. This is where we'll write our API code.

## The Practical Bit

*Note: each section of the workshop builds upon the previous one. You can check your solutions against the code found in the next section.*

Let's have another look at the EventStorming diagram we're using to guide the code we write...

![EventStorming Timeline with Bounded Contexts](./images/eventstorming-timeline-with-bounded-contexts.png)

Note that we have 3 entities: `Account`, `Post` and `Post Comment`. Let's turn those concepts into code.

### Part 1: Modelling Posts

When we model entities in our domain, we're trying to capture the essential attributes which define that domain concept. Too few attributes and we miss important details. Too many and we clutter our entities with redundant details.

In **src/contexts/posts/core/entities/post.ts**:

- Complete the `postSchema` using the **zod** parsing library ([zod primitives](https://github.com/colinhacks/zod#primitives) and [zod objects](https://github.com/colinhacks/zod#objects)) in particular. This schema serves as the primary definition of what a `Post` entity is, while providing us with the ability to perform runtime parsing (and autogenerate TypeScript definitions).

*Note that we're using `zod`'s `infer` utility type to generate a `Post` entity type that we can use in other areas of code in future sections.*

*Note that we've also created a `parsePost` function which simply calls `postSchema.parse` internally. This isn't essential but `parsePost({ ... })` is clearer and more explicit than `postSchema.parse({ ... })`.*

In **src/contexts/posts/core/entities/post.spec.ts**:

- Complete the tests to ensure the `parsePost` function works as expected.

### Part 2: Modelling Post Comments

In **src/contexts/posts/core/entities/postComment.ts**:

- Define the `PostComment` type, `postCommentSchema` and `parsePostComment` function.
- Ensure the `PostComment` type and the `parsePostComment` function are exported so they can be used in other parts of the system.

In **src/contexts/posts/core/entities/postComment.spec.ts**:

- Complete the tests to ensure the `parsePostComment` function works as expected.

### Part 3: Modelling Account Followers

We already have an existing `Account` entity in our `Accounts` bounded context but it doesn't currently capture the concept of 'account followers'. Let's rectify that...

In **src/contexts/accounts/core/entities/account.ts**:

- Update `accountSchema` to include a `follower` attribute that holds information about all the followers of an account.

In **src/contexts/accounts/core/entities/account.spec.ts**:

- Complete the tests to ensure the `parseAccount` function works as expected

## Additional Resources

- [Domain-Driven Design: Entities, values, and How To Distinguish Them (5 minutes read)](https://blog.jannikwempe.com/domain-driven-design-entities-value-objects)
- [Entities & values (2.5 minute video)](https://www.youtube.com/watch?v=r8q5DD9rd3M)
- [The One Question To Haunt Everyone: What is a DDD Aggregate? (25 minute video)](https://www.youtube.com/watch?v=zlFqjD2LKlE)
