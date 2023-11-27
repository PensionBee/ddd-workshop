# Repositories & Persistence

[Back to the training overview](https://github.com/PensionBee/ddd-workshop#ddd-workshop-overview)

## Context

### What is a Repository?

A repository is a piece of 'facade' code with a couple of responsibilities:

1. Provide a simple interface for fetching and saving entities (hiding the complexities of persistence technology access from calling code)
2. *(optional)* Verify entities are valid before writing to persistence or after reconstructing from persistence
3. *(if necessary)* Map persistence data to/from domain entities

Let's break those down...

#### Responsibility 1: Provide a simple interface for fetching and saving entities

Whatever domain we're working in, our application core always needs a way to fetch and persist entities. We can do this via database driver with a raw query, or via a layer of abstraction such as an ORM or Query Builder. However, with these methods, persistence specific code tends to leak into the core of our application. This isn't always a problem but over time our code can become increasingly coupled to the persistence technology it's using, making it difficult to refactor and easy to introduce bugs.

A repository prevents this leakage by capturing persistence access code in one location and providing a simple interface that our core application code can use to fetch existing entities or save new/modified entities.

In it's simplest form, a repository might look like this:

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

#### Responsibility 2: *(optional)* Verify entities are valid before writing to persistence or after reconstructing from persistence

One of the core ideas in DDD is that entities should **always** be in a valid state. One way to achieve this is to always check entities are valid in the repository before persisting them or after reconstructing them from persistence. We can do this by utilising **parser** functions, like the ones we created in the previous section of the workshop.

#### Responsibility 3: *(if necessary)* Map persistence data to/from domain entities

Persistence data often doesn't perfectly match our domain models for various reasons. Let's look at a few examples where this might happen:

- Imagine we have an `Account` entity with 3 possible states: `Unverified`, `Verified` and `Deactivated`. However, our database contains some old accounts with the following legacy states: `Unchecked`, `Checked` and `Closed`. In an ideal world, we'd run a data migration to update the legacy states to the current states. However, there are cases where migrating legacy data is either impossible, too risky or too time consuming given project constraints. What we need in these situations is an approach to map data between our persistence technology and our domain entities at runtime.
- Imagine we have an `Order` entity comprising an `Order` entity (the entity root) and a collection of `Order Line` entities. If we were using a NoSQL database to store this entity, we'd likely be able to serialize/jsonify the entity and store it directly without further processing. But what if we're using a SQL database? Chances are we're going to have to store our `Order` entity in an `orders` table and all of the `Order Line` entities in an `order_lines` table. When we need to persist an `Order` entity, we need to map it to data that matches the underlying database structure before persisting it. Likewise, when fetching/reconstructing an `Order` entity from the database, we need to map the underlying database table data back to the structure of an `Order` entity.
- Imagine we were **really bad** at DDD when we designed our first `Account` entity, so much so that it contained 20 entities and hundreds of attributes, which we stored in a NoSQL database. After a couple of years working with this nightmare, we decide to split it into 10 different entities which is a lot easier to work with. However, we don't have the time at the moment to migrate all the data from the `accounts` collection in our database into 10 different collections. What do we do? In this case, we could design our 10 entities, model them in our code and then build repositories for each one that all map different parts of the data from the `accounts` collection to the relevant entity. Likewise, when persisting each new entity, it could write the relevant data to the specific parts of the `accounts` collection.

Okay, but how and where do we actually do this? One practical solution to this problem is to utilise two **mappers** in each of our repositories. The first mapper converts an entity into data which can be inserted into whatever persistence technology we're using, in whatever shape it expects. The second mapper takes data from whatever persistence technology we're using and reconstructs a valid entity from it.

## Resources

[Martin Fowler: Repository (1 minute read)](https://martinfowler.com/eaaCatalog/repository.html)

## The Practical Bit

*Note: each section of the workshop builds upon the previous one. You can check your solutions against the code found in the next section.*

In the following tasks, we're going to store our entities in memory for two reasons:

- It keeps us away from specific persistence technologies at this point, allowing us to focus more on the DDD principles.
- It highlights a nice benefit of using the repository pattern, namely that it allows us to quickly prototype and iterate on features in development, without having to touch any persistence infrastructure. At some point in the future, when our feature is ready to ship, we can introduce real persistence infrastructure and the only code we'll need to change is the code in our repository methods/mappers.

### Part 1: Complete the Post Repository

Let's focus on the first repository responsibility:

> Provide a simple interface for fetching and saving entities

- In **contexts/posts/infra/repositories/postRepository.ts**:
  - Complete the `postRepository` so that other code can save new/updated `Post` entities and fetch existing `Post` entities by their ID.

### Part 2: Create a Post Comment Repository

Let's add the second repository responsibility on top of the first:

> *(optional)* Verify entities are valid before writing to persistence or after reconstructing from persistence

- In **contexts/posts/infra/repositories/postCommentRepository.ts**:
  - Create a `postCommentRepository` so that other code can save new/updated `PostComment` entities and fetch existing `PostComment` entities by their ID.
  - Call `parsePostComment` in the relevant parts of the repository, ensuring all `PostComment` entities passing through our repository are in a valid state.

### Part 3: Complete the Account Repository

Let's add the third repository responsibility on top of the other two:

> *(if necessary)* Map persistence data to/from domain entities

- In **contexts/accounts/infra/repositories/accountRepository.ts**:
  - Complete the `accountRepository` so that other code can save new/updated `Account` entities and fetch existing `Account` entities by their ID.
  - Call `parseAccount` in the relevant parts of the repository, ensuring all `Account` entities passing through our repository are in a valid state (hint: calling `parseAccount` in the mappers *may* make your repository methods cleaner.

### Part 4: Write Tests

- For each repository, write some tests to make sure the implementation is working as expected. You have complete freedom here to write whatever tests you see fit but remember to try and focus on input/output.

## Questions Worth Pondering

- What are the trade-offs of using the repository pattern?
- Is using the repository pattern worth the trade-offs?
- How do SQL databases compare with NoSQL databases when dealing with nested entities?****
- Could the repository pattern be used in testing somehow to write tests independently of a real database? What if we had a 'real' repository and a 'fake' (in-memory) repository?
