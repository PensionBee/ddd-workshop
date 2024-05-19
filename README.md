# Repositories & Persistence

[Back to the training overview](https://github.com/PensionBee/ddd-workshop#ddd-workshop-overview)

## Context

### What is a Repository?

A repository a *facade* with 3 main responsibilities:

1. Provide a simple interface for fetching and persisting **Entities** (hiding the complexities of persistence technology access from calling code).
2. Parse **Entities** before writing to persistence and after reconstructing from persistence (reducing bugs caused by corrupt **Entities**).
3. Map persistence data to **Entities** and vice versa (if necessary).

Let's break those down...

#### Responsibility 1: Provide a simple interface for fetching and persisting **Entities**

Whatever domain we're working in, our application core always needs a way to fetch and persist **Entities**. We can do this via a database driver and a raw query, or via a layer of abstraction such as an ORM or Query Builder. However, with these methods, persistence specific code tends to leak into the rest of the application, creating fuzzy boundaries which are difficult to enforce. This isn't always a bad thing but over time, code can become increasingly coupled to the persistence technology it's using, making it difficult to refactor and easy to write  code which lacks clarity and is prone to bugs.

A repository prevents this leakage by hiding the complexities of persistence access and **Entity** reconstruction in a single location. The simple interface that a repository provides can then be used by the application core to fetch existing **Entities** or save new/modified **Entities**, without knowing what goes on under the hood.

In it's simplest form, a repository might look like this:

```ts
type AccountRepository = {
  save: (account: Account) => Promise<void>,
  getById: (id: Account['id']) => Promise<Account | null>,
}
```

Or

```ts
type AccountRepository = {
  create: (account: Account) => Promise<void>,
  update: (account: Account) => Promise<void>,
  getById: (id: Account['id']) => Promise<Account | null>,
}
```

In some cases, this will likely be sufficient for the applications needs but there may be a need for additional repository methods depending on the domain and business requirements. For example:

```ts
type AccountRepository = {
  // ...
  // Assuming a user can have many accounts, we might need a method like this...
  getAllByUserId: (userId: Account['userId']) => Promise<Account[]>,
}
```

#### Responsibility 2: Parse **Entities** before writing to persistence and after reconstructing from persistence

One of the great ideas in DDD is that **Entities** should *always* be in a valid state. One way to achieve this is to always check **Entities** are valid in the repository before persisting them or after reconstructing them from persistence. We can do this by utilising the parsers we wrote in the previous section of the workshop.

#### Responsibility 3: Map persistence data to **Entities** and vice versa

Persistence data often doesn't perfectly match our domain models for various reasons. For example:

1. Imagine we have an `Account` **Entity** with 3 possible states: `Unverified`, `Verified` and `Deactivated`. However, our database contains some old accounts with the following legacy states: `Unchecked`, `Checked` and `Closed`. In an ideal world, we'd run a data migration to update the legacy states to the current states. However, there are cases where migrating legacy data is either impossible, too risky or too time consuming given project constraints. What we need in these situations is an approach to map data between our persistence technology and our domain **Entities** at runtime.
2. Imagine we have an `Order` **Aggregate** comprising an `Order` **Entity** (the "aggregate root") and a collection of `Order Line` **Entities**. If we were using a NoSQL database to store this **Entity**, we'd likely be able to serialize/jsonify the **Entity** and store it directly without further processing. But what if we're using a SQL database? Chances are we're going to have to store our `Order` **Entity** in an `orders` table and all of the `Order Line` **Entities** in an `order_lines` table. When we need to persist an `Order` **Entity**, we need to map it to data that matches the underlying database structure before persisting it. Likewise, when fetching/reconstructing an `Order` **Entity** from the database, we need to map the underlying database table data back to the structure of an `Order` **Entity**.
3. Imagine we were **really bad** at DDD at the beginning, so much so that we created an `Account` **Aggregate** encapsulating 20 different **Entities** and hundreds of attributes, which we stored in a NoSQL database. After a couple of years working with this nightmare, we decide to split it into 10 different **Entities** that are each easier to work with and reason about. However, we don't have time at the moment to migrate all the data from the `accounts` collection in our database into 10 different collections. What do we do? In this case, we could model each **Entity** using `zod`, then build repositories for each one that maps different parts of the data from the `accounts` collection to the relevant **Entity**. Likewise, when persisting each new **Entity**, it could write the relevant data to the specific parts of the `accounts`  collection.

As you can see, with data mapping as standard part of a repository, we give ourselves the flexibility we need to deal with many different challenges which might come our way in the future.

Okay, but how and where should we actually do this? One way is to write two "mapper functions" in each of our repositories. The first mapper converts a parsed **Entity** into data which can be inserted into whatever persistence technology we're using, in whatever shape it expects. The second mapper takes data from whatever persistence technology we're using and reconstructs a parsed **Entity** from it.

## Additional Resources

[Martin Fowler: Repository (1 minute read)](https://martinfowler.com/eaaCatalog/repository.html)

## The Practical Bit

*Note: each section of the workshop builds upon the previous one. You can check your solutions against the code found in the next section.*

In the following tasks, we're going to store our **Entities** in memory. This is for two reasons:

- It keeps us from getting lost in the specifics of persistence technologies, allowing us to focus more on the DDD concepts.
- It highlights a nice benefit of using the repository pattern, namely that it allows us to quickly prototype and iterate on features in development, without having to touch any persistence infrastructure. At some point in the future, when our feature is ready to ship, we can introduce a real database, update our repository and we're good to go.

### Part 1: Complete the Post Repository (Responsibility 1)

Let's focus on the first repository responsibility:

> Provide a simple interface for fetching and persisting **Entities**

1. In **contexts/posts/infra/repositories/postRepository.ts**, complete the `postRepository` so that other code can save new/updated `Post` **Entities** and fetch existing `Post` **Entities** by their ID.
2. In **contexts/posts/infra/repositories/postRepository.spec.ts**, complete the test suite to make sure the repository saves and loads valid `Post` **Entities** as expected.

### Part 2: Complete the Post Comment Repository (Responsibility 2)

Let's add the second repository responsibility on top of the first:

> Parse **Entities** before writing to persistence and after reconstructing from persistence

1. In **contexts/posts/infra/repositories/postCommentRepository.ts**, complete the `postCommentRepository` as in **Part 1**.
2. In **contexts/posts/infra/repositories/postCommentRepository.ts**, call `parsePostComment` in all repository methods (tip: do this at the beginning of the `save` method and at the end of the `getById` method).
3. In **contexts/posts/infra/repositories/postCommentRepository.spec.ts**, complete the test suite to make sure the repository saves and loads valid `PostComment` **Entities** as expected.

### Part 3: Complete the Account Repository (Responsibility 3)

Let's add the third repository responsibility on top of the other two:

> *(if necessary)* Map persistence data to/from domain **Entities**

1. In **contexts/accounts/infra/repositories/accountRepository.ts**, complete the `accountRepository` as in **Part 2** (you'll likely have TypeScript errors - it's fine, we'll deal with those next).
2. In **contexts/accounts/infra/repositories/accountRepository.ts**, complete the two mapper functions, converting `Account` **Entities** into persistence data and vice versa. Call the relevant mapper in each of the repository's methods (tip: call `toAccountData` in the `save` method and `toAccount` in the `getBy...` methods).
3. In **contexts/posts/infra/repositories/accountRepository.spec.ts**, complete the test suite to make sure the repository saves and loads valid `Account` **Entities** as expected.

Notice that the test suite for this repository doesn't do anything conceptually different compared to the `postCommentRepository` test suite, even though it requires mappers to function as expected. This is because the `accountRepository` is encapsulating all of that complexity effectively, hiding it from the calling code as we would expect. 

## Questions Worth Pondering

- What are the trade-offs of using the repository pattern? Are the trade-offs worth it?
- How would a SQL database compare with a NoSQL database for persisting **Entities** (especially complex **Aggregates**)?
- What value do we get from writing repository tests? Do we get any value at all?
- Let’s say we decide to use an in-memory repository for both local development and automated testing, and a cloud-based database repository in staging and production, how could we ensure the in-memory repository exhibits the exact same behaviour as the real repository?
