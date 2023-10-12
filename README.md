# L&DDD - Values, Entities & Parsers

[Back to the training overview](https://github.com/PensionBee/l-and-ddd/tree/main#training-overview)

## Context

### What are entities and values?

In Domain Driven Design, 'value objects' and 'entities' are core concepts used to represent the 'things' that exists in your domain. In it's simplest form, entities are things with unique identifiers and values are things that don't. For example, a customer might be made up of a unique ID, an email address, phone number, address, etc. Here, the cser is an entity (it has a unique identifier) whereas everything else that makes up a user is a value object (they don't have unique IDs of their own). Note that value objects can be 'complex', for example an address value object might be made up of a street, city and postcode.

Generally, JSON is super useful for modelling entities and value objects. You probably do it all the time; DDD just has a specific naming to distinguish the different concepts, which makes it easy to talk about this with fellow developers and business people. Here's an example of a customer in JSON:

```json
{
  "customer": {
    "id": "abc123",
    "email": "abc123@test.com",
    "phoneNumber": "01234567890",
    "address": {
      "street": "Main Street",
      "city": "London",
      "postcode": "EC1 1AA"
    }
  }
}
```

How abstract the 'things' you need to model are depends on several factors, such as **a)** the domain you're modelling and **b)** how you (plural you: developers plus business folk) *choose* to model reality - there are often multiple ways to model a problem. For example, in a banking application, we might have a Bank Account entity which isn't too abstract and most people can picture a bank account in some form (like as a big safe with all your hard earned gold inside). When it comes to modelling the process of moving money between two bank accounts, we have a couple of options. One option is to simply substract an amount from the 'balance' value object of one account and add the same amount to the 'balance' value object the another account. on the other hand, we could model the flow of money between two accounts as a separate 'Transaction' entity, which has it's own unique identifier and contains all the necessary information to capture the process. This new entity is a little more abstract; picturing a transaction as a physical thing in the world doesn't really make much sense - but that doesn't mean it can't be modelled as an entity. Both methods have their own pros and cons so it's useful to explore these ideas as a team when modelling new problems.

### Persistence agnostic entities

DDD communities generally advocate for creating 'domain models' independently from persistence concerns (how stuff is stored in a database or on disk or in another system). Taking this approach, we can think primarily about how best to represent the 'things' in our domain in the way that's most useful for the business' use cases, and we can defer storage considerations to a point in the future. This way, we are able to build a useful model of our domain, then choose our persistence technology and approach to fit our domain model, rather than the other way about.

This might feel a little strange if you're used to thinking primarily about how to store data in a database, but a little practice will show that it can provide much more clarity in the software systems you build, especially more complex ones.

***Note: We can't ignore the database entirely. Our system is still going to have to persist and reconstruct entities somehow... This will be covered in the 'Repository' lesson***.

### Parsing

In this context, parsing refers to turning a blob of **unvalidated data** into a **valid domain entity**. This process may or may not involve transforming the input data so that it conforms to the shape of the domain entity. As an example, let's say we have a `/register` endpoint which creates a customer in our system. The payload send to that endpoint by a client might look like this:

```json
{
  "email": "abc123@test.com",
  "street": "Main Street",
  "city": "London",
  "postcode": "1234 567"
}
```

As part of this business use case (the customer registration use case) we need to generate a valid domain entity which conforms to our definition of a Customer (see above). In this case, we need to validate the incoming data (we might need a phone number to be present and postcodes should to be in a certain format to be acceptable) as well as transform the data into a form which matches the internal definition of a customer entity. This can be done in several ways such as rolling your own validation functions and directly manipulating data into the correct format or using a dedicated parsing library (which is what we'll do below).

## Pre-Reading/Watching (Optional)

- [Domain-Driven Design: Entities, Value Objects, and How To Distinguish Them (5 minutes read)]([https://...](https://blog.jannikwempe.com/domain-driven-design-entities-value-objects))
- [Entities & Value Objects (2.5 minute video)](https://www.youtube.com/watch?v=r8q5DD9rd3M)


## A Note on Project Structure

Although we'll go into more detail about the directory structure and layers used in this project a little later on, it's worth touching upon it at a high level right off the bat. Each of our 2 bounded contexts (accounts and posts) follows the following structure:

- **core**: This is our 'application core', where we'll model our entities and build out our business use cases / system capabilities. We'll try to keep this as independent from our other two layers as much as possible (more on this in a later lesson).
- **infra**: Short for 'infrastructure' - this is where we'll write the code which connects our software to persistence infrastructure (e.g. databases or the file system) and external systems (if we have any). Think of infra as containing everything your application needs to interact with the external world.
- **interface**: This is the opposite of infrastructure; a way for the outside world to interact with your application. This directory could include REST API code, GraphQL API code, gRPC code, Command Line Interface (CLI) code or any other methods you want to support for interacting with your system. The idea here is that we could build multiple interfaces to support different clients, which all utilise the underlying code in the `core` directory.

## The Practical Bit

### Modelling a Post

- In ***src/contexts/posts/core/entities/post.ts***:
  - Create a `Post` type which represents the `Post` entity. This should be an object with an ID, plus any other value objects you think are necessary to capture the essence of a `Post`, e.g. `title`, `content`, etc.
  - Create a `postSchema` using the **zod** parsing library ([primitives](https://github.com/colinhacks/zod#primitives) and [objects](https://github.com/colinhacks/zod#objects)) - this should look structurally similar to the type defined in the previous step.
  - Create a `parsePost` function which takes a `data` argument (an unknown object/record type) and parses it using [zod](https://github.com/colinhacks/zod#basic-usage), returning a valid `Post` entity if the data is valid or throwing an error if the data is invalid.
  - Replace the manually created `Post` type by using **zod's** [type inference functionality](https://github.com/colinhacks/zod#type-inference). Our `postSchema` now serves as a pretty good source of truth for what a `Post` entity is, so manually defining a type is just double the work. Now, any time we update the `postSchema`, our `Post` type will automatically be kept up to date.
  - Export the `parsePost` function and the `Post` type so they can be used in other parts of the system.

### Modelling a Post Comment

- In ***src/contexts/posts/core/entities/postComment.ts***:
  - Define `type PostComment`, `const postCommentSchema` and `const parsePostComment` like we did for the `Post` entity.

### Updating the Account model

- In ***src/contexts/accounts/core/entities/account.ts***:
  - Update the `Account` entity to include a list of other accounts that an account follows

## Further Reading

- [?](https://...)
