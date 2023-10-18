# DDD Workshop

## Context

It's your first day at `SocialBuzz`, the next big social media app. Promise.

The company has big plans to revolutionise this space but first they've got to get on the radar, which means they need an MVP out the door ASAP.

The CEO apprehends you at the coffee machine, just as you're on the verge of figuring out how it work...

> "Right, here's what we're going to need from you pronto:
>
> 1. The usual account stuff - people can register with their email address and a password and then they can log in and log out of the the system.
> 2. Users should be able to write short posts, possibly including images, that are going to be visible on the main 'Feed' page.
> 3. Folk also need to be able to follow accounts they like.
> 4. Ohh, being able to comment on a post is important too.
>
> That's about it for now but I've got load of ideas that'll keep you on your toes so make sure you build something that scales well. Alright, chop chop, let's get to it."

You head back to your desk (coffeeless) and have a chat with your manager, Jess. She's got some pretty nifty ideas about how to build this thing so it'll scale to 100 billion users and code changes can be made in "like, no time". She also keeps overenthusiastically saying "DeeDeeDee", whatever that is. Anyway, she offers to help get you up to speed and guide you through the process...

## Workshop Overview

### Prerequisites

1. (READY FOR REVIEW) [Typescript](https://github.com/PensionBee/ddd-workshop/tree/typescript) >>> [Solutions](https://github.com/PensionBee/ddd-workshop/tree/typescript-solutions)
2. (READY FOR REVIEW) [Test Driven Development (TDD)](https://github.com/PensionBee/ddd-workshop/tree/tdd) >>> [Solutions](https://github.com/PensionBee/ddd-workshop/tree/tdd-solutions)

### Modelling the Problem

1. (READY FOR REVIEW) [Event Storming](https://github.com/PensionBee/ddd-workshop/tree/event-storming) >>> [Solutions](https://github.com/PensionBee/ddd-workshop/tree/event-storming-solutions)

### Building out the Backend

1. (READY FOR REVIEW) [Values, Entities & Parsers](https://github.com/PensionBee/ddd-workshop/tree/values-entities-and-parsers)
2. (READY FOR REVIEW) [Repositories & Persistence](https://github.com/PensionBee/ddd-workshop/tree/repositories-and-persistence)
3. (READY FOR REVIEW) [Command Handlers & Derivers](https://github.com/PensionBee/ddd-workshop/tree/command-handlers-and-derivers)
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
