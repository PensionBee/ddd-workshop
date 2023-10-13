# L&DDD

## Context

It's your first day at `SocialBuzz`, the next big social media app (promise), as a "Server-Side Engineering Wizard".

The company has big plans to revolutionise this space but first they've got to get on the radar, which means an MVP out the door. ASAP. And preferably one that makes it easy to respond to increasingly complex business requirements in the future.

The CEO apprehends you at the water cooler...

> "Right, here's what we're gonna need ASAP:
>
> 1. People should be able to create an account with their email, a username and a password. Plus the usual login, logout stuff too... What's that? Agnes already did that before he went on holiday? Smashing! In that case...
> 2. Users should be able to write short posts that'll be visible on some feed page.
> 3. Folk also need to be able to follow accounts they like.
> 4. Ohh, comments are important too. Anyone can comment on any other post.
>
> That's about it I reckon so chop chop, let's get to it."

## Training Overview

### Prerequisites

1. (READY FOR REVIEW) [Typescript](https://github.com/PensionBee/l-and-ddd/tree/typescript) / [Solutions](https://github.com/PensionBee/l-and-ddd/tree/typescript-solutions)
2. (READY FOR REVIEW) [Test Driven Development (TDD)](https://github.com/PensionBee/l-and-ddd/tree/tdd) / [Solutions](https://github.com/PensionBee/l-and-ddd/tree/tdd-solutions)

### Modelling the Problem

1. (WIP) [Event Storming](https://github.com/PensionBee/l-and-ddd/tree/values-entities-and-parsers)

### Building out the Backend

1. (READY FOR REVIEW) [Values, Entities & Parsers](https://github.com/PensionBee/l-and-ddd/tree/values-entities-and-parsers)
2. (READY FOR REVIEW) [Repositories & Persistence](https://github.com/PensionBee/l-and-ddd/tree/repositories-and-persistence)
3. (WIP) [Command Handlers & Derivers](https://github.com/PensionBee/l-and-ddd/tree/command-handlers-and-derivers)
4. (WIP) [Query Handlers](https://github.com/PensionBee/l-and-ddd/tree/query-handlers)
5. (WIP) [Creating the API Endpoints](https://github.com/PensionBee/l-and-ddd/tree/api-endpoints)

### Supercharging the Backend

1. (WIP) [Standardising Command Handlers](https://github.com/PensionBee/l-and-ddd/tree/standardising-command-handlers)
2. (WIP) [Dependency Inversion & Dependency Injection](https://github.com/PensionBee/l-and-ddd/tree/dependency-inversion-injection)

### Intra- & Inter-Context Communication (& Adapting to Changes in Business Rules)

1. (WIP) [Inter-Context Data Fetching](https://github.com/PensionBee/l-and-ddd/tree/inter-context-data-fetching) (Business Rule: If basic account then max 5 posts per day)
2. (WIP) [Event-Driven Architecture Utilities](https://github.com/PensionBee/l-and-ddd/tree/event-driven-architecture-utils)
3. (WIP) [Domain Events for Intra-Context Communication](https://github.com/PensionBee/l-and-ddd/tree/domain-events) (Business Rule: If post has 5+ comments then mark post as 'hot')
4. (WIP) [Integration Events for Inter-Context Communication](https://github.com/PensionBee/l-and-ddd/tree/integration-events) (Business Rule: If first account post created then A Free Month of Premium)
