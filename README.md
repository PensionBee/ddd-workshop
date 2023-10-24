# DDD Workshop - Values, Entities & Parsers

[Back to the workshop overview](https://github.com/PensionBee/ddd-workshop#workshop-overview)

## Context

### What are Value Object & Entities?

In Domain-Driven Design, **Value Objects** and **Entities** are used to model core concepts in a **Domain**. **Entities** are defined by a unique ID present throughout it's entire lifecycle. **Value Objects** are defined by whatever the current value is. For example:

```sh
Customer           # A customer remains the same entity throughout it's lifecycle, even when it's attributes change
  ID               # Constant throughout the entity lifecycle
  Email            # Becomes a different value object each time it changes
  Address          # Nested value objects are valid
    Number
    Street
    City
    Postcode
```

The above is an example of an **Entity** we can easily imagine in the physical world, i.e. we can picture what a customer is. However, there are situations where we need to model abstract concepts as **Entities** too. For example, in a banking application, we might decide to model the process of moving money between two `Bank Account` **Entities** using a dedicated `Transaction` **Entity**, which might look something like this:

```sh
Transaction
  ID
  Amount
  Sending Account ID
  Receiving Account ID
```

### Parsing

In this context, parsing refers to turning a 'blob' of unvalidated data into a valid **Entity**. This process may also involve transforming or reshaping the input data so that it conforms to the structure of the **Entity**. As an example, let's say we have a `/register` API endpoint which creates an `Account` **Entity** in our system. The payload sent to that endpoint by a client might look like this:

```json
{
  "email": "abc123@test.com",
  "houseNumber": "1",
  "streetName": "Main Street",
  "city": null,
  "postcode": "1234 567"
}
```

However, an `Account` **Entity** is modelled in our system like this:

```ts
type Account = {
  id: string;         // Required - generated internally
  email: string;      // Required
  address: {
    number: number;   // Required
    street: string;   // Required
    city: string;     // Required
    postcode: string; // Required - should be in the format AB11 1AB
  }
}
```

When creating a new `Customer` **Entity** in our system, we need to validate the data used to create it, and make sure it's in the correct structure. We can do this by rolling our own validation/transformation functions or by using a parsing library (which is what we'll do below).

## Resources

Feel free to check these out before or after completing 'The Practical Bit' below.

- [Domain-Driven Design: Entities, Value Objects, and How To Distinguish Them (5 minutes read)]([https://...](https://blog.jannikwempe.com/domain-driven-design-entities-value-objects))
- [Entities & Value Objects (2.5 minute video)](https://www.youtube.com/watch?v=r8q5DD9rd3M)

## Project Structure Overview

We'll go into more detail on this in a later section of the workshop but for now, it's worth touching upon it at a high level. Our project has 2 **Bounded Contexts** (`Accounts` and `Posts`) which live in **src/contexts/**. Both of these follow the same structure:

- **core/**: This is our 'application core', where we'll model our entities and build out our system's capabilities (e.g. creating a post or following another account). We want to keep the code in this layer focused on business concepts and business rules as much as possible. *If you're already familiar with onion-esque architectures, this layer is essentially the 'domain' and 'application' layers squashed into one for simplicity.*
- **infra/**: Short for 'infrastructure' - this is where we'll write the code which connects our 'application core' to persistence technology (e.g. databases or the file system) and external systems our contexts rely on (if any). Think of infra as everything your application needs to interact with the external world.
- **interface/**: This is the opposite of infrastructure; a way for the outside world to interact with our application. This is where we'll write our API code. The primary idea here is that we could create multiple interfaces (a REST API, a graphQL API, a CLI, etc.) and each one would utilise the same functionality exposed in our application core.

## The Practical Bit

*Note: each section of the workshop builds upon the previous one. You can check your solutions against the code found in the following section.*

### Part 1: Modelling Posts

- In **src/contexts/posts/core/entities/post.ts**:
  - Complete the `postSchema` using the **zod** parsing library ([primitives](https://github.com/colinhacks/zod#primitives) and [objects](https://github.com/colinhacks/zod#objects)).
  - Complete the `parsePost` function which takes a `data` argument (an unknown record type) and parses it using the schema defined in the previous step (see [here](https://github.com/colinhacks/zod#basic-usage) for an example of parsing data with a schema). This function should return a valid `Post` entity if the data is valid and throw an error if the data is invalid.

### Part 2: Modelling Post Comments

- In **src/contexts/posts/core/entities/postComment.ts**:
  - Define the `PostComment` type, `postCommentSchema` and `parsePostComment` function.
  - Ensure the `PostComment` type and the `parsePostComment` function are exported so they can be used in other parts of the system.

### Part 3: Modelling Account Following

We already have an existing `Account` **Entity** in our `Accounts` **Bounded Context** but we're missing the concept of 'account following'. Let's rectify that...

- In **src/contexts/accounts/core/entities/account.ts**:
  - Update the `Account` entity parser to include a `following` value object. This will hold information about all the accounts an account follows. *Tip: When creating references to other entities, it's good practice to only reference the entity ID rather than the entire entity structure (like how you would model a foreign key in a database table).*

### Part 4: Testing Parsers

- In **src/contexts/posts/core/entities/post.spec.ts**:
  - Complete the tests to ensure the `parsePost` function works as expected.
In **src/contexts/posts/core/entities/postComment.spec.ts**:
  - Write the tests to ensure the `parsePostComment` function works as expected.
- In **src/contexts/accounts/core/entities/account.spec.ts**:
  - Update the tests to ensure the `parseAccount` function works as expected
