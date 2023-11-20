# DDD Workshop

## Context

It’s your first day at `SocialBuzz`, the next big social media app. Promise.

The company has big plans to revolutionise this space but first they’ve got to get on the radar, which means they need to get an MVP out the door ASAP.

You’re apprehended by the CEO you at the coffee machine, just as you’re on the verge of figuring out how the damn thing works...

> Right, here’s what I’m going to need from you pronto:
>
> 1. People need to be able to register with their email address and a password.
> 2. Users should be able to write short posts, possibly including images, which we’re going to display on the ‘Feed’ page of our app.
> 3. Folk also need to be able to follow accounts they like.
> 4. Ohh, and comments. Being able to comment on a post is important too.
>
> That’s about it for now but I’ve got loads of ideas that’ll keep you on your toes so make sure you build something that’s easy to change when I innevitably chuck some curveballs at you. Alright then, chop chop, let’s get to it.

You return to your desk (coffeeless) looking dazed and confused, worried about how you’re going to get started - how you’re going to show that you can do this well - when one of your colleagues turns to you and whispers three words: Domain. Driven. Design. Those 3 words lead you down a Google rabbit hole and, eventually, to the DDD Workshop…

## DDD Workshop Overview

### Part 1: Prerequisites

1. [Typescript (foundations)](https://github.com/PensionBee/ddd-workshop/tree/typescript): This workshop is written in Typescript (TS) but is secondary ompared with the core DDD content, i.e. you don't have to be particularly competent working with TS. However, it's useful to have a basic foundation in the language so you can make sense of any TS you do come across. ([SOLUTIONS](https://github.com/PensionBee/ddd-workshop/tree/typescript-solutions))

### Part 2: Modelling the Problem

1. [EventStorming](https://github.com/PensionBee/ddd-workshop/tree/eventstorming)

### Part 3: Building out the Backend

1. [Values, Entities, Aggregates & Parsers](https://github.com/PensionBee/ddd-workshop/tree/values-entities-aggregates-and-parsers)
2. [Repositories & Persistence](https://github.com/PensionBee/ddd-workshop/tree/repositories-and-persistence)
3. [Command Handlers & Derivers](https://github.com/PensionBee/ddd-workshop/tree/command-handlers-and-derivers)
4. (WIP) [Query Handlers](https://github.com/PensionBee/ddd-workshop/tree/query-handlers)
5. (WIP) [Adding API Endpoints](https://github.com/PensionBee/ddd-workshop/tree/adding-api-endpoints)

### Part 4: Supercharging the Backend

1. (WIP) [Standardising Command Handlers](https://github.com/PensionBee/ddd-workshop/tree/standardising-command-handlers)
2. (WIP) [Dependency Inversion & Dependency Injection](https://github.com/PensionBee/ddd-workshop/tree/dependency-inversion-injection)

### Part 5: Intra- & Inter-Context Communication (& Adapting to Changes in Business Rules)

1. (WIP) [Inter-Context Data Fetching](https://github.com/PensionBee/ddd-workshop/tree/inter-context-data-fetching) (Business Rule: If basic account then max 5 posts per day)
2. (WIP) [Domain Events for Intra-Context Communication](https://github.com/PensionBee/ddd-workshop/tree/domain-events) (Business Rule: If post has 5+ comments then mark post as 'hot')
3. (WIP) [Integration Events for Inter-Context Communication](https://github.com/PensionBee/ddd-workshop/tree/integration-events) (Business Rule: If first account post created then A Free Month of Premium)
