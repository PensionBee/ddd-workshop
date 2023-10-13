# DDD Workshop - Values, Entities & Parsers

[Back to the workshop overview](https://github.com/PensionBee/ddd-workshop#workshop-overview)

## Context

### What are Value Object & Entities?

In Domain Driven Design, Value Objects and Entities are used to model core concepts in a domain. Entities are defined by a unique ID present throughout it's entire lifecycle. Value Objects are defined by whatever the current value is:

```sh
Customer           # Remains the same entity even when email, phone, etc. change
  ID               # Constant throughout entity lifecycle
  Email            # Becomes a different value object each time it changes
  Address          # Nested value objects are allowed
    Number
    Street
    City
    Postcode
```

The above is an example of an entity we can easily imagine in the physical world, i.e. we can imagine a customer. However, there are situations where we need to model abstract concepts as entities too. For example, in a banking application, we might decide to model the process of moving money between two Bank Account entities using a dedicated Transaction entity, which might look something like this:

```sh
Transaction
  ID
  Amount
  Sending Account
  Receiving Account
```

A Transaction doesn't represent a physical thing we can easily imagine but it is still very much an entity in our domain - it has a unique ID that defines it throughout it's lifecycle and that is enough.

### Parsing

In this context, parsing refers to turning a blob of **unvalidated data** into a **valid domain entity**. This process may also involve transforming or reshaping the input data so that it conforms to the structure of the domain entity. As an example, let's say we have a `/register` API endpoint which creates an Account entity in our system. The payload send to that endpoint by a client might look like this:

```json
{
  "email": "abc123@test.com",
  "houseNumber": "1",
  "streetName": "Main Street",
  "city": null,
  "postcode": "1234 567"
}
```

However, a Customer is modelled in our domain like this:

```ts
type Customer = {
  id: string;         // Required - generated internally
  email: string;      // Required
  address: {
    number: number;   // Required
    street: string;   // Required
    city: string;     // Required
    postcode: string; // Required - should be in the format AB12 1AB
  }
}
```

When creating a new Customer entity in our system, we need to validate the data used to create it, and make sure it's in the correct structure. We can do this by rolling our own validation/transformation functions or using a dedicated parsing library (which is what we'll do below).

## Resources

Feel free to check these out before or after completing 'The Practical Bit' below.

- [Domain-Driven Design: Entities, Value Objects, and How To Distinguish Them (5 minutes read)]([https://...](https://blog.jannikwempe.com/domain-driven-design-entities-value-objects))
- [Entities & Value Objects (2.5 minute video)](https://www.youtube.com/watch?v=r8q5DD9rd3M)

## The Practical Bit

*Note: each section of the workshop builds upon the previous one. You can check your solutions against the code found in the following section.*

### A Quick Note on Project Structure & Layers

We'll go into more detail on this in a future section of the workshop but for now, it's worth touching upon it at a high level. Our project has 2 Bounded Contexts (Accounts and Posts) which live in **src/contexts/**. Both of these follow the same structure:

- **core/**: This is our 'application core', where we'll model our entities and build out the capabilities in our system (e.g. creating a post or following another account). We want to keep the code in this layer focused on business concepts and business rules as much as possible. *If you're already familiar with onion-esque architectures, this layer is essentially the 'domain' and 'application' layers squashed into one.*
- **infra/**: Short for 'infrastructure' - this is where we'll write the code which connects our application core to persistence infrastructure (e.g. databases or the file system) and external systems we rely on (if we have any). Think of infra as everything your application needs to interact with the external world.
- **interface/**: This is the opposite of infrastructure - a way for the outside world to interact with our application core. This directory could include code for a REST API, GraphQL API, gRPC, Command Line Interface (CLI), etc. The main idea here is that we could build multiple interfaces to support different clients and each interface would utilise the same functionality in our application core.

### Part 1: Modelling Posts

- In **src/contexts/posts/core/entities/post.ts**:
  - Create a `Post` type which models your understanding of what a `Post` is. This should be an object type with some kind of ID, plus any other value objects you think are necessary to capture the essence of a `Post`, e.g. `title`, `content`, etc.
  - Create a `postSchema` using the **zod** parsing library ([primitives](https://github.com/colinhacks/zod#primitives) and [objects](https://github.com/colinhacks/zod#objects)) - this should look structurally similar to the `Post` type defined in the previous step.
  - Create a `parsePost` function which takes a `data` argument (an unknown object/record type) and parses it using the schema defined in the previous step (see [here](https://github.com/colinhacks/zod#basic-usage) for an example of parsing data with a schema). This function should return a valid `Post` entity if the data passed to it is valid and throw an error if the data is invalid.
  - Let's make our lives a little simpler by replacing the manually created `Post` type from step 1, using **zod's** [type inference functionality](https://github.com/colinhacks/zod#type-inference). Our `postSchema` now serves as a pretty good source of truth for what a `Post` entity is, so manually defining a type is double the work. Now, any time we update the `postSchema`, our `Post` type will automatically be kept up to date. *Note that this is personal preference - some people love the clarity you get from modelling entities with explicitly defined types, rather than inferring from a schema.*
  - Finally, export the `Post` type and the `parsePost` function so they can be used in other parts of the system.

Congratulations! You've just modelled your first entity in only a few lines of code, which will serve as a powerful foundation for the code we write in future section of the workshop.

### Part 2: Modelling Post Comments

Let's keep up the momentum and model our `Post Entity` like we did with the `Post` entity above

- In **src/contexts/posts/core/entities/postComment.ts**:
  - Define the `PostComment` type, `postCommentSchema` and `parsePostComment` function.
  - Export the `PostComment` type and the `parsePostComment` function so they can be used in other parts of the system.

### Part 3: Modelling Account Following

We already have an existing `Account` entity in our `Accounts` Bounded Context but it's missing the concept of 'account following'. Let's rectify that...

- In **src/contexts/accounts/core/entities/account.ts**:
  - Update the `Account` entity parser to include a `following` value object. This will hold information about all the accounts an account follows. *Tip: When creating references to other entities, it's good practice to only reference the entity ID rather than the entire entity.*

### Part 4: Testing our Parsers

Although test-driven-development is super valuable, we'll defer using it until we're comfortable with the core technical concepts in DDD. However, tests are still super important for a scalable software system, so let's add a couple to make sure our parsers do what we expect them to do.

- In **src/contexts/posts/core/entities/post.spec.ts**:
  - Complete the tests to ensure our `parsePost` function works as expected.
In **src/contexts/posts/core/entities/postComment.spec.ts**:
  - Write the tests to ensure our `parsePostComment` function works as expected.
- In **src/contexts/accounts/core/entities/account.spec.ts**:
  - Update the tests to ensure our `parseAccount` function works as expected
