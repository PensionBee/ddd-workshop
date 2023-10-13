# L&DDD - Repositories & Persistence

[Back to the training overview](https://github.com/PensionBee/l-and-ddd/tree/main#training-overview)

## Context

### What is a repository?

A repository is a chunk of code with 2 main responsibilities:

1. Provide a simple interface for fetching and saving entities
2. Map persistence data to/from domain entities

Let's break those down...

#### Responsibility 1: Provide a simple interface for fetching and saving entities

When we need to create/use/modify entities in our software, we need to fetch them from persistence (if they already exist), do some processing then save them. We can do this in multiple ways, including writing raw SQL, directly accessing files on disc or directly using an ORM or Query Builder. However, with these methods, persistence specific code can leak into the core of our application. This isn't always a problem but over time core application code can become increasingly coupled to the persistence technology it relies on, making it difficult to refactor and easy to introduce bugs. A repository prevents this leakage by capturing all persistence access code in one place and provides a set of simple functions that core application code can use to fetch the entities it needs to process changes in the system, as well as save the entities it creates/updates. From the perspective of the application core, the repository could be an in memory store - it has no concept of persistence at all, it just know that repositories store domain entities.

In it's simplest form, a repository might look something like this:

```ts
type EntityXRepository = {
  save: (entity: EntityX): void,
  getById: (id: string): EntityX,
}
```

Or

```ts
type EntityXRepository = {
  create: (entity: EntityX): void,
  update: (entity: EntityX): void,
  getById: (id: string): EntityX,
  getBySomethingElse: (somethingElse: number): EntityX,
}
```

This can be sufficient in a lot of cases but there may be need for additional repository methods dependening on the business capabilities.

#### Responsibility 2: Map persistence data to/from domain entities

DDD communities generally advocate for separating domain entity models from persistence concerns. This allows each to evolve independently so create and modify entities however we want while using existing or legacy persistence schemas. For example, an Account entity may have 3 possible states: `Unverified`, `Verified` and `Deactivated`. However, maybe the database still has some accounts in legacy states such as `Pending`, `active` or `Closed`. In an ideal world, we'd run a data migration to map the legacy states to the current states. However, this removes some flexibility from our development workflow (it's likely a blocker so we'll need to divert resources to this task) and forces us to carry out that work now when it could reasonably be deferred. There are other reasons for doing this but the core idea is the same in all cases; we want to be able to focus on modelling our domain and move quickly without persistence concerns getting in the way.

So... What do we do about it?

The solution here is to utilise two `mappers` in our repositories. The first mapper converts a valid domain entity into data which can be inserted into whatever persistence technology we're using, in whatever shape it expects. The second mapper takes raw data from whatever persistence technology we're using and reconstructs a valid domain entity from it.

## Resources

Feel free to check these out now or after completing 'The Practical Bit' below.

- [The Repository Pattern (n minutes read)](https://)
- [The Repository Pattern (n minute video)](https://)

## The Practical Bit

*Note: each lesson builds upon the previous one. You can check your solutions against the code found in the following lesson.*

### Part 1: Setting up the Dtatabase and Database Access Layer

This project uses [Prisma](https://www.prisma.io) with a SQLite development database. Check out **prisma/schema.prisma** for details of the current DB schema. Also, head over to the [Prisma docs for info about writing schemas](https://www.prisma.io/docs/concepts/components/prisma-schema).

**Note: your editor likely has a prisma extension which may be useful for syntax highlighting, autoformatting, etc.**

There's currently an Account model/table defined in the Prisma schema but we'll need to add more models/tables to support the additional entities created in the previous lesson.

- First, copy **.env.example** into the same directory and rename it to **.env**. Next, run `npm run prisma:push`. This script will create our SQLite DB at **prisma/dev.db** and push our schema definition to it. Finally, it will generate a 'Prisma Client' that we can import from the prisma library itself so we can easily query the database. We're importing and initialising this client in **src/shared/infra/prisma.ts** - go check it out. The exported `prisma` instance is what provides us with everything we need to read from and write to the tables in our database.

- In **prisma/schema.prisma**, set up a `Post` model / `posts` table by adding the following chunk of code:

```prisma
model Post {
  id           String @unique
  post_title   String
  post_content String
  image        String
  author_id    String
  author       Account @relation(fields: [author_id], references: [id]) // Tells Prisma there's a relation between 'author_id' in the Post model and 'id' in the Account model

  @@index([id]) // Tells Prisma to index the ID column
  @@map("posts") // Tells Prisma to map the Post model to a DB table called 'posts'
}
```

*Note: you can also add `posts Post[]` to the `Account` model in the same file, which enables reverse relationship lookups (i.e. so we can fetch an account with all it's posts in a single query). Check out [the docs](https://www.prisma.io/docs/concepts/components/prisma-schema/relations) for more info on relations.*

Note that we're using `post_title`, `post_content`, `image` and `author_id` here, even though they don't perfectly match the value objects in our `Post` model. This is a simple, contrived example of how our persistence schema can differ from our domain entity schema, which we'll need to handle in our repository.

- In **prisma/schema.prisma**, set up a `PostComment` model / `post_comments` table for storing `PostComment` entities (you have complete freedom here to define the model any way you like)
- In **prisma/schema.prisma**, set up a `Follower` model / `followers` table which holds information about which accounts other accounts follow.
- Finally, push the changes to the SQLite database and update the Prisma Client by running `npm run prisma:push`

That's it, our database layer is good to go. If you hit any issues during this process, you can simply remove **prisma/dev.db** and run `npm run prisma:push` again.

### Part 2: Creating the Posts Repository

- In **contexts/posts/infra/repositories/postsRepository.ts**:
  - Ceate a `postsRepository` using this chunk of code as a starting point:

```ts
import { type Post as PrismaPost } from "@prisma/client"; // Prisma generates type definitions from our schema that we can use out of the box - pretty neat.

import { Post } from "~/contexts/posts/core/entities/post"; // '~' is configured in tsconfig.json to map to the 'src/' directory, reducing the need for deep relative imports
import prisma from "~/shared/infra/prisma"; // This is our Prisma Client instance - we can use this to access our DB tables via prisma.post.findOne(...), etc.

// Mappers
const toPost = (prismaPost: PrismaPost): Post => { ... }
const toPersistenceData = (post: Post): PrismaPost => { ... }

// Repository
export const postsRepository = {
  save: async (post: Post): Promise<void> => {...},
  getById: async (id: string) => {...}
};
```

Next, let's make it really difficult to save invalid entities to the database or return invalid entities to client code...

- In **contexts/posts/infra/repositories/postsRepository.ts**:
  - In each of the mapper functions, call the `parsePost` function we defined in the previous lesson, ensuring all posts passing in and out of our repository are valid. If you need to, feel free to reference **src/contexts/accounts/infra/repositories/accountsRepository.ts**.

### Part 3: Creating the Post Comments Repository

- In **contexts/posts/infra/repositories/postCommentsRepository.ts**:
  - Use the same approach as above to create a `postCommentsRepository`

### Part 4: Updating the Accounts Repository

This is where things get a little gnarly. Our `Account` entity includes a list of accounts that an account follows but that data is stored across two database tables: `accounts` and `followers`. This means we're going to have to fetch the relevant data from both tables and then map it to a single `Account` entity. The opposite also holds true - `Account` entities will need to be decomposed into two different sets of data before saving to the database.

- In **contexts/accounts/infra/repositories/accountsRepository.ts**:
  - Update the repository and mappers to handle account followers.

### Writing Tests

- TODO

## Conclusion

At first, the repository pattern might feel like a lot of overhead given we can just fetch data directly from a database/file. Also, why not just fetch the accounts an account follows separately from fetching the account itself? Good question and like every other architecture decision, there are trade-offs. With the repository pattern you can end up with a lot of complexity in the repository itself but what you gain is the ability to model entities in the most effective way, plus a single, logical place for the complexity to live. We can't always remove complexity but we can manage it. The end result? Simplicity and clarity in the code that matters, the application core, which we'll see in action in the next lesson.
