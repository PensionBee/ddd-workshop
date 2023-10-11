# L&DDD

## Context

It's your first day at `SocialBuzz`, the next big social media app (promise).

The company has big plans to revolutionise this space but first they've got to get on the radar, which means an MVP out the door ASAP, with the ability to respond to change quickly and support increasingly complex business requirements in the future.

The CEO apprehends you at the water cooler...

> "Right, here's what we're going to need ASAP:
>
> 1. New customers should be able to create a new account with an email, username and password. Plus the usual login, logout stuff too... What's that Agnes? Sarah already did that before she went on holiday? Nice! In that case...
> 2. Users should be able to post updates that are visible to everyone on the platform via some central feed.
> 3. They also need to be able to follow accounts they like. And the feed should have a filter so folk can pick between all posts or just posts for accounts they're following.
> 4. Ohh, comments are important too. Anyone can comment on any other post.
>
> That's about it I suppose so you can probably get cracking. Oh yeah, the design doesn't really matter too much at this point so go wild... Sarah already started using this "component library" thing though so might be worth using that."

## Training Overview

### Prerequisites

1. [Typescript](https://github.com/PensionBee/l-and-ddd/tree/typescript) / [Solutions](https://github.com/PensionBee/l-and-ddd/tree/typescript-solutions)
2. [Test Driven Development (TDD)](https://github.com/PensionBee/l-and-ddd/tree/tdd) / [Solutions](https://github.com/PensionBee/l-and-ddd/tree/tdd-solutions)

### Building out the Backend

1. [Values, Entities & Parsers](https://github.com/PensionBee/l-and-ddd/tree/values-entities-and-parsers)
2. [Repositories & Persistence](https://github.com/PensionBee/l-and-ddd/tree/repositories-and-persistence)
3. [Command Handlers & Derivers](https://github.com/PensionBee/l-and-ddd/tree/command-handlers-and-derivers)
4. [Query Handlers](https://github.com/PensionBee/l-and-ddd/tree/query-handlers)
5. [Creating the API Endpoints](https://github.com/PensionBee/l-and-ddd/tree/api-endpoints)

### Supercharging the Backend

1. [Standardising Command Handlers](https://github.com/PensionBee/l-and-ddd/tree/standardising-command-handlers)
2. [Dependency Inversion & Dependency Injection](https://github.com/PensionBee/l-and-ddd/tree/dependency-inversion-injection)

### Intra- & Inter-Context Communication

1. [Inter-Context Data Fetching](https://github.com/PensionBee/l-and-ddd/tree/inter-context-data-fetching) (Business Requirement: If basic account then max 5 posts per day)
2. [Supporting an Event-Driven Architecture](https://github.com/PensionBee/l-and-ddd/tree/event-driven-architecture-helpers)
3. [Domain Events for Intra-Context Communication](https://github.com/PensionBee/l-and-ddd/tree/comment-restrictions) (Business Requirement: If post has 5+ comments then mark post as 'hot')
4. [Integration Events for Inter-Context Communication](https://github.com/PensionBee/l-and-ddd/tree/free-month-of-premium)
Business Requirement: If first account post created then A Free Month of Premium

### Building out the Frontend

1. [Building Shared Components](https://github.com/PensionBee/l-and-ddd/tree/shared-components)
2. [Building the Feed Page](https://github.com/PensionBee/l-and-ddd/tree/feed-page)
3. [Hooking up the Backend](https://github.com/PensionBee/l-and-ddd/tree/hook-up-api)
