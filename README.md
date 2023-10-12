# L&DDD - Repositories & Persistence

[Back to the training overview](https://github.com/PensionBee/l-and-ddd/tree/main#training-overview)

**Note: Solutions to the previous lesson have been implemented on this branch and serve as the starting point for this lesson - go check out the files you worked on previously to see what's there. Don't worry if the solutions here are different from what you ended up with - there are multiple ways to model the same problem and some solutions include deliberate decisions in order to support future lessions. As long as the approaches are conceptually similar then view that as a big ol' win!**

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

As touched upon in the previous lesson, DDD communities advocate for separating domain entities from persistence concerns. This allows each to evolve independently and enables us to create and modify entities however we want while using existing/legacy persistence schemas. We may also want to create rollup fields on an entity itself to make processing simpler in our code. For example, an Account entity may have 3 possible states: `Unverified`, `Verified` and `Deactivated`. However, maybe the database still has some accounts in legacy states such as `Pending`, `active` or `Closed`. In an ideal world, we'd run a data migration to map the legacy states to the current states. However, this removes some flexibility from our development workflow (it's likely a blocker so we'll need to divert resources to this task) and forces us to carry out that work now when it could reasonably be deferred. There might also be legitimate cases where we want to preserve historical data in our database, such as for compliance reasons. The core idea is the same in all cases though; we want to be flexible and move fast without our persistence decisions getting in the way.

The solution to these challenges is to utilise two `mappers` in our repositories. The first mapper converts a valid domain entity into data which can be inserted into whatever persistence technology we're using, in whatever shape it expects. Note that this could mean storing a single entity across 3 different database tables - there's no limit to what we can do here and there are definitely valid reasons for choosing an approach like this. This mapper is useful when persisting a new or updated domain entity. The second mapper takes raw data from whatever persistence technology we're using and reconstructs a valid domain entity from it. This mapper is useful when client code utilises one of the read-based repository methods to fetch an existing entity.

## Pre-Reading/Watching (Optional)

- [The Repository Pattern (n minutes read)](https://)
- [The Repository Pattern (n minute video)](https://)

## The Practical Bit

### Setting up the Persistence Access Layer

This project uses [Prisma](https://www.prisma.io) with a SQLite development database. Check out **prisma/schema.prisma** for details of the current DB schema. Also, head over to the [Prisma docs for info about writing schemas](https://www.prisma.io/docs/concepts/components/prisma-schema).

There's currently an Account model in the Prisma schema but we'll need to add more tables to support the other entities created in the previous lesson.

Before we get to that though, let's set up our database. First, copy **.env.example** into the same directory - rename this file to **.env**. Next, run `npm run prisma:push` (defined in the `scripts` section of **package.json**). This script will create our SQLite DB at **prisma/dev.db** and push our schema definition to it. Finally, it will generate a prisma client that we can import from the prisma library itself to use in our code for accessing the database. We're importing and initialising this client in **src/shared/infra/prisma.ts** - go check it out. The exported `prisma` instance is what provides us with everything we need to read from and write to the tables in our database. This is what we'll be using in our repositories.

- Let's update the database schema with a `posts` table... In **prisma/schema.prisma**, add the following chunk of code:

```prisma
model Post {
  id           String @unique
  post_title   String
  post_content String
  image_url    String

  @@index([id])
  @@map("posts")
}
```

Note that we're using `post_title`, `post_content` and `image_url` here, even though they don't match the value object names in our `Post` model. This is a simple example of (more on this in a bit).

- Next, create a `post_comments` table for storing `PostComment` entities (you have complete freedom here to define the model however you want)
- Finally, update the database and Prisma client by running `npm run prisma:sync`

### Setting up the Repositories

- Let's start off by creating a `postsRepository` in **contexts/posts/infra/repositories/postsRepository.ts**. Here's the basic structure you'll need to get started:

```ts
import { type Post as PrismaPost } from "@prisma/client"; // Prisma generates type definitions from our schema that we can use

import { Post } from "#/contexts/posts/core/entities/post"; // # is configured in tsconfig.json to map to the 'src/' directory
import prisma from "#/shared/infra/prisma"; // We can use this to access our tables via prisma.post.findOne(...), etc.

// Mappers
const toPost = (prismaPost: PrismaPost): Post => { ... }
const toPersistenceData = (post: Post): PrismaPost => { ... }

// Repository
export const postsRepository = {
  save: async (post: Post): Promise<void> => {...},
  getById: async (id: string) => {...}
};
```

- Next, let's make it really difficult to save bad data to the database or return corrupt entities to client code using our repository. In each of the mapper functions, call the `parsePost` function we defined in the previous lesson, make sure all posts passing through our repository are actually valid posts. If you need to, feel free to reference **src/contexts/accounts/infra/repositories/accountsRepository.ts**.
- Finally, create a `postCommentsRepository` in **contexts/posts/infra/repositories/postCommentsRepository.ts**

### Writing Tests

- TODO

## Further Reading

- [?](https://)
