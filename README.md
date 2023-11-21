# Repositories & Persistence

[Back to the training overview](https://github.com/PensionBee/ddd-workshop#ddd-workshop-overview)

## Context

### What is a repository?

A repository is a piece of 'facade' code with a couple of responsibilities:

1. Provide a simple interface for fetching and saving entities (hiding the complexities of persistence technology access from calling code)
2. *(optional)* Verify entities/aggregates are valid before writing to persistence or after reconstructing from persistence
3. *(if necessary)* Map persistence data to/from domain entities

Let's break those down...

#### Responsibility 1: Provide a simple interface for fetching and saving entities

Whatever domain we're working in, our application core always needs a way to fetch and persist entities/aggregates. We can do this in multiple ways, such as writing raw SQL, directly accessing files on disc or using an ORM or Query Builder. However, with these methods, persistence specific code tends to leak into the core of our application. This isn't always a problem but over time our code can become increasingly coupled to the persistence technology it's using, making it difficult to refactor and easy to introduce bugs.

A repository prevents this leakage by capturing all persistence access code in one place and providing a set of simple functions/methods that our core application code can use to fetch the entities it needs to process changes in the system, as well as persist the entities it creates/updates.

In it's simplest form, a repository might look like one of the following:

```ts
type UserRepository = {
  save: (user: User): void,
  getById: (id: string): User,
}
```

Or

```ts
type UserRepository = {
  create: (user: User): void,
  update: (user: User): void,
  getById: (id: string): User,
  getByEmail: (email: string): User,
}
```

In many cases, this will likely be sufficient but there may be a need for additional repository methods depending on the domain and business requirements.

#### Responsibility 2: *(optional)* Verify entities/aggregates are valid before writing to persistence or after reconstructing from persistence

One of the core ideas in DDD is that we should **always** have a valid domain model, i.e. all of our entities/aggregates within a bounded context should be in a valid state at all times. One way to achieve this is to always check domain entities are valid in the repository before persisting them or after reconstructing them from persistence. We can do this by utilising the **parser** functions we created in the previous section of the workshop.

#### Responsibility 3: *(if necessary)* Map persistence data to/from domain entities

Persistence data doesn't always match our domain entities 1 to 1. Let's looks at a couple of examples where this could happen:

- Let's imagine we have an `Account` entity with 3 possible statuses: `Unverified`, `Verified` and `Deactivated`. However, our database has some accounts with the following legacy statuses: `Pending`, `active` or `Closed`. In an ideal world, we'd run a data migration to migrate the legacy statuses to the current statuses. However, there are cases where migrating legacy data is either impossible, too risky or too time consuming given project constraints. What we need in such situations is an approach to map data between our persistence technology and our domain entities at runtime.
- Let's imagine we have an `Order` aggregate comprising an `Order` entity (the aggregate root) and a collection of `Order Line` entities. If we're using a NoSQL database to store this aggregate, we could probably just serialize/jsonify the aggregate and store it as is. But what if we're using a SQL database? Changes are we're going to have to store our `Order` entity in an `orders` table and all of the `Order Line` entities in an `order_lines` table. When we need to persist an `Order` aggregate, we need to map it to data that matches the underlying database table structures before persisting the data. Likewise, when fetching/reconstructing an `Order` aggregate from the database, we need to map the underlying database table data to the structure of an `Order` aggregate.
- Let's imagine we were **really bad** at DDD when we designed our first `Account` aggregate, so much so that it contained 20 entities and hundreds of attributes, which we stored in a NoSQL database. After a couple of years working with this nightmare, we decide to split it into 10 different entities/aggregates which is a lot easier to work with. However, we don't have the time at the moment to migrate all the data from the `accounts` collection in our database into 10 different collections. What do we do? In this case, we could design our 10 aggregates, model them in our code and then build repositories for each one that all map different parts of the data from the `accounts` collection to the relevant aggregate. Likewise, when persisting each new aggregate, it could write the relevant data to the specific parts of the `accounts` collection.

Okay, but how and where do we actually do this? One practical solution to this problem is to utilise two **mappers** in each of our repositories. The first mapper converts a domain entity into data which can be inserted into whatever persistence technology we're using, in whatever shape it expects. The second mapper takes data from whatever persistence technology we're using and reconstructs a valid domain entity from it.

## Resources

[Martin Fowler: Repository (1 minute read)](https://martinfowler.com/eaaCatalog/repository.html)

## The Practical Bit

*Note: each section of the workshop builds upon the previous one. You can check your solutions against the code found in the next section.*

In order to stay away from specific persistence technologies and highlight how repositories help us to create quick prototypes that we can iterate on before going live with new/updated features, we're going to use in-memory arrays to store our entities.

Also, let's assume that each in-memory array represents a single SQL database table, i.e. we can't store different entity types in one array (this condition will only be relevant for part 3 below)

### Part 1: Completing the Posts Repository

- In **contexts/posts/infra/repositories/postsRepository.ts**:
  - Complete the `postsRepository` so that other code can save new/updated `Post` entities and fetch existing `Post` entities by their ID.
  - Call `parsePost` in the relevant parts of the repository, ensuring all `Post` entities passing through our repository are in a valid state.

### Part 2: Creating the Post Comments Repository

- In **contexts/posts/infra/repositories/postCommentsRepository.ts**:
  - Create a `postCommentsRepository` so that other code can save new/updated `PostComment` entities and fetch existing `PostComment` entities by their ID.
  - Call `parsePostComment` in the relevant parts of the repository, ensuring all `PostComment` entities passing through our repository are in a valid state.

### Part 3: Updating the Accounts Repository

- In **contexts/accounts/infra/repositories/accountsRepository.ts**:
  - Update the repository and mappers to handle account followers.

### Part 4: Testing Our Repositories

- For each repository, write some tests to make sure the implementation is working as expected. You have complete freedom here to write whatever tests you see fit.
