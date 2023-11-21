# Repositories & Persistence

[Back to the training overview](https://github.com/PensionBee/ddd-workshop#ddd-workshop-overview)

## Context

### What is a repository?

A repository is a piece of 'facade' code with a couple of responsibilities:

1. Provide a simple interface for fetching and saving aggregates (hiding the complexities of persistence technology access from calling code)
2. *(optional)* Verify aggregates are valid before writing to persistence or after reconstructing from persistence
3. *(if necessary)* Map persistence data to/from domain aggregates

Let's break those down...

#### Responsibility 1: Provide a simple interface for fetching and saving aggregates

Whatever domain we're working in, our application core always needs a way to fetch and persist aggregates. We can do this via database driver with a raw query, or via a layer of abstraction such as an ORM or Query Builder. However, with these methods, persistence specific code tends to leak into the core of our application. This isn't always a problem but over time our code can become increasingly coupled to the persistence technology it's using, making it difficult to refactor and easy to introduce bugs.

A repository prevents this leakage by capturing persistence access code in one location and providing a simple interface that our core application code can use to fetch existing aggregates or save new/modified aggregates.

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

#### Responsibility 2: *(optional)* Verify aggregates are valid before writing to persistence or after reconstructing from persistence

One of the core ideas in DDD is that aggregates should **always** be in a valid state. One way to achieve this is to always check aggregates are valid in the repository before persisting them or after reconstructing them from persistence. We can do this by utilising **parser** functions, like the ones we created in the previous section of the workshop.

#### Responsibility 3: *(if necessary)* Map persistence data to/from domain aggregates

Persistence data often doesn't perfectly match our domain models for various reasons. Let's look at a few examples where this might happen:

- Imagine we have an `Account` aggregate with 3 possible states: `Unverified`, `Verified` and `Deactivated`. However, our database contains some old accounts with the following legacy states: `Unchecked`, `Checked` and `Closed`. In an ideal world, we'd run a data migration to update the legacy states to the current states. However, there are cases where migrating legacy data is either impossible, too risky or too time consuming given project constraints. What we need in these situations is an approach to map data between our persistence technology and our domain aggregates at runtime.
- Imagine we have an `Order` aggregate comprising an `Order` entity (the aggregate root) and a collection of `Order Line` entities. If we were using a NoSQL database to store this aggregate, we'd likely be able to serialize/jsonify the aggregate and store it directly without further processing. But what if we're using a SQL database? Chances are we're going to have to store our `Order` entity in an `orders` table and all of the `Order Line` entities in an `order_lines` table. When we need to persist an `Order` aggregate, we need to map it to data that matches the underlying database structure before persisting it. Likewise, when fetching/reconstructing an `Order` aggregate from the database, we need to map the underlying database table data back to the structure of an `Order` aggregate.
- Imagine we were **really bad** at DDD when we designed our first `Account` aggregate, so much so that it contained 20 aggregates and hundreds of attributes, which we stored in a NoSQL database. After a couple of years working with this nightmare, we decide to split it into 10 different aggregates which is a lot easier to work with. However, we don't have the time at the moment to migrate all the data from the `accounts` collection in our database into 10 different collections. What do we do? In this case, we could design our 10 aggregates, model them in our code and then build repositories for each one that all map different parts of the data from the `accounts` collection to the relevant aggregate. Likewise, when persisting each new aggregate, it could write the relevant data to the specific parts of the `accounts` collection.

Okay, but how and where do we actually do this? One practical solution to this problem is to utilise two **mappers** in each of our repositories. The first mapper converts an aggregate into data which can be inserted into whatever persistence technology we're using, in whatever shape it expects. The second mapper takes data from whatever persistence technology we're using and reconstructs a validn aggregate from it.

## Resources

[Martin Fowler: Repository (1 minute read)](https://martinfowler.com/eaaCatalog/repository.html)

## The Practical Bit

*Note: each section of the workshop builds upon the previous one. You can check your solutions against the code found in the next section.*

In the following tasks, we're going to store our aggregates in memory for two reasons:

- It keeps us away from specific persistence technologies at this point, allowing us to focus more on the DDD principles.
- It highlights a nice benefit of using the repository pattern, namely that it allows us to quickly prototype and iterate on features in development, without having to touch any persistence infrastructure. At some point in the future, when our feature is ready to ship, we can introduce real persistence infrastructure and the only code we'll need to change is the code in our repository methods/mappers.

### Part 1: Complete the Post Repository

- In **contexts/posts/infra/repositories/postRepository.ts**:
  - Complete the `postRepository` so that other code can save new/updated `Post` aggregates and fetch existing `Post` aggregates by their ID.
  - Call `parsePost` in the relevant parts of the repository, ensuring all `Post` aggregates passing through our repository are in a valid state.

### Part 2: Create a Post Comment Repository

- In **contexts/posts/infra/repositories/postCommentRepository.ts**:
  - Create a `postCommentRepository` so that other code can save new/updated `PostComment` aggregates and fetch existing `PostComment` aggregates by their ID.
  - Call `parsePostComment` in the relevant parts of the repository, ensuring all `PostComment` aggregates passing through our repository are in a valid state.

### Part 3: Complete the Account Repository

For this part, let's add an assumption and a constraint:

- **Assumption**: In the future, we'll deploy our application in production alongside a SQL database.
- **Constraint**: If an **aggregate** contains multiple **entities**, each type of **entity** must be stored in a separate in-memory collection (which more accurately models how we tend to build SQL tables).

- In **contexts/accounts/infra/repositories/accountRepository.ts**:
  - Complete the `accountRepository` so that other code can save new/updated `Account` aggregates and fetch existing `Account` aggregates by their ID, email or username. This will involve saving `Account` entities and `AccountFollower` entities in separate collections (which have already been set up with the relevant types)

### Part 4: Write Tests

- For each repository, write some tests to make sure the implementation is working as expected. You have complete freedom here to write whatever tests you see fit but remember to try and focus on input/output.

## Questions Worth Pondering...

- Is the repository pattern worth the trade-offs? What even are the trade-offs?
- Are NoSQL databases better for persisting aggregates, given we can just serialise/jsonify them and store them as they are?
- Could the repository pattern be used in testing somehow to write tests independently of a real database?
