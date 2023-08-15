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

***Note: Branch names are in brackets***

### Prerequisites

1. Typescript (`typescript`)
2. TDD (`tdd`)

### Building the Backend

1. Values, Entities & Parsers (`values-entities-and-parsers`)
2. Persistence & Repositories (`persistence-and-repositories`)
3. Action Handlers & Derivers (`action-handlers-and-derivers`)
4. Query Handlers (`query-handlers`)
5. Creating the API Endpoints (`api-endpoints`)

### Building the Frontend

1. Building Shared Components (`shared-components`)
2. Building Pages (`feed-page`)
3. Hooking up the Backend (`hook-up-api`)

### Responding to New Business Requirements Part 1

1. Not Following Account = Can't Comment on Account Posts (`comment-restrictions`)
2. On a Basic Account = Max 5 Posts Per Day (`post-restrictions`)

### Supercharging the Backend

1. Modular Programming & Abstractions (`modular-programming`)
2. Dependency Inversion, Partial Application & Great Testing (`dependency-inversion`)
3. Event-Driven Architecture (`event-driven-helpers`)

### Responding to New Business Requirements Part 2

1. Created First Post = A Free Month of Premium (`free-month-of-premium`)
