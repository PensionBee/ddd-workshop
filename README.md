# DDD Workshop

## Context

It's your first day at `SocialBuzz`, the next big social media app (promise).

The company has big plans to revolutionise this space but first they've got to get on the radar, which means an MVP out the door. ASAP. Preferably one that's easy to change as increasingly complex business requirements arise.

The CEO apprehends you at the water cooler...

> "Right, here's what we're gonna need from you ASAP:
>
> 1. The usual account stuff. Folk can register an account with their email and a password. Plus the usual login, logout stuff too.
> 2. Users should be able to write short posts that are going to be visible on the main 'Feed' page.
> 3. People also need to be able to follow accounts they like.
> 4. Ohh, comments are important too.
>
> That's about it I reckon so chop chop, let's get to it."

Huh, what? You just started this job 18 minutes ago and already they're expecting you to build the core functionality. Well I suppose this is what you signed up for...

Anyway, not to worry, Alex has your back. They started 1 day and 18 minutes ago and were hired as a "Server-Side Engineering Wizard". Apparently they've got some pretty nifty ideas about how to build this thing so it scales to 14 billion users and changes can be made instantaneously. They keep saying "DeeDeeDee", whatever that is - maybe something the younger generations say?. Anyway, it seems they're happy to get you up to speed so you can do all the work while they sit back with a cup or 5 of self-roasted specialty coffee...

## Workshop Overview

### Prerequisites

1. (READY FOR REVIEW) [Typescript](https://github.com/PensionBee/ddd-workshop/tree/typescript) >>> [Solutions](https://github.com/PensionBee/ddd-workshop/tree/typescript-solutions)
2. (READY FOR REVIEW) [Test Driven Development (TDD)](https://github.com/PensionBee/ddd-workshop/tree/tdd) >>> [Solutions](https://github.com/PensionBee/ddd-workshop/tree/tdd-solutions)

### Modelling the Problem

1. (WIP) [Event Storming](https://github.com/PensionBee/ddd-workshop/tree/event-storming)

### Building out the Backend

1. (READY FOR REVIEW) [Values, Entities & Parsers](https://github.com/PensionBee/ddd-workshop/tree/values-entities-and-parsers)
2. (READY FOR REVIEW) [Repositories & Persistence](https://github.com/PensionBee/ddd-workshop/tree/repositories-and-persistence)
3. (WIP) [Command Handlers & Derivers](https://github.com/PensionBee/ddd-workshop/tree/command-handlers-and-derivers)
4. (WIP) [Query Handlers](https://github.com/PensionBee/ddd-workshop/tree/query-handlers)
5. (WIP) [Adding API Endpoints](https://github.com/PensionBee/ddd-workshop/tree/adding-api-endpoints)

### Supercharging the Backend

1. (WIP) [Standardising Command Handlers](https://github.com/PensionBee/ddd-workshop/tree/standardising-command-handlers)
2. (WIP) [Dependency Inversion & Dependency Injection](https://github.com/PensionBee/ddd-workshop/tree/dependency-inversion-injection)

### Intra- & Inter-Context Communication (& Adapting to Changes in Business Rules)

1. (WIP) [Inter-Context Data Fetching](https://github.com/PensionBee/ddd-workshop/tree/inter-context-data-fetching) (Business Rule: If basic account then max 5 posts per day)
2. (WIP) [Event-Driven Architecture Utilities](https://github.com/PensionBee/ddd-workshop/tree/event-driven-architecture-utils)
3. (WIP) [Domain Events for Intra-Context Communication](https://github.com/PensionBee/ddd-workshop/tree/domain-events) (Business Rule: If post has 5+ comments then mark post as 'hot')
4. (WIP) [Integration Events for Inter-Context Communication](https://github.com/PensionBee/ddd-workshop/tree/integration-events) (Business Rule: If first account post created then A Free Month of Premium)
