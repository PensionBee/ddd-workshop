# DDD Workshop

Welcome to PensionBee's DDD Workshop! This training programme is designed to increasing confidence writing event-driven, DDD-centric code by bridging the gap between EventStorming and the downstream code one step at a time.

It's currently a work in progress but we expect it to be "complete" (we'll continue to tweak over time) in the coming weeks.

A couple of notes about the workshop:

- TypeScript is the language of choice (there's a `TypeScript Foundations` section at the beginning of the workshop for those who are unfamiliar with TS or need a refresher.)
- The content is heavily inspired by Anthony Manning-Franklin's [Functional Domain Driven Design: Simplified](https://antman-does-software.com/functional-domain-driven-design-simplified) article. Additional inspiration has been taken from Jeremie Chassaing's [Functional Event Sourcing Decider](https://thinkbeforecoding.com/post/2021/12/17/functional-event-sourcing-decider) article and Scott Wlaschin's [Domain Modeling Made Functional](https://pragprog.com/titles/swdddf/domain-modeling-made-functional/) book.
- Examples and exercises are somewhat specific to the way PensionBee have chosen to implement DDD tactical patterns. Our approach embraces general pragmatic software design principles which are applicable to Object-Oriented Programming (OOP), Functional Programming (FP) and anything in-between.

We genuinely hope you find this workshop as useful and fun as we've found it. Feel free to use it directly or fork it and modify it to suit your own needs.

Let's get to it...

## Context

It’s your first day at `SocialBuzz`, the next big social media app. Promise.

The company has big plans to revolutionise this space but first they’ve got to get on the radar, which means they need to get an MVP out the door ASAP.

You’re apprehended by the CEO you at the coffee machine, just as you’re on the verge of figuring out how the damn thing works...

> Right, here’s what I’m going to need from you pronto:
>
> 1. People need to be able to register with their email address and a password.
> 2. Users should be able to write short posts, possibly including images, which we’re going to display on the app's home page.
> 3. They also need to be able to follow accounts they like.
> 4. Ohh, and comments. Being able to comment on a post is important too.
>
> Alright then, chop chop, let’s get to it.

You return to your desk (coffeeless), feeling a little overwhelmed. As you calm your breathing, you remember that you recently discovered Domain-Driven Design, an approach to building great software which looked very promising. Time to put it to the test...

## Workshop Overview

### Prerequisites

- [TypeScript Foundations](https://github.com/PensionBee/ddd-workshop/tree/typescript)

### Part 1: Strategic Design

- [EventStorming](https://github.com/PensionBee/ddd-workshop/tree/eventstorming) ([example solutions](https://github.com/PensionBee/ddd-workshop/tree/eventstorming-solutions))

### Part 2: Foundational Tactical Patterns

- [Values, Entities & Parsers](https://github.com/PensionBee/ddd-workshop/tree/values-entities-and-parsers)
- [Repositories](https://github.com/PensionBee/ddd-workshop/tree/repositories-and-persistence)
- [Command Handlers & Derivers](https://github.com/PensionBee/ddd-workshop/tree/command-handlers-and-derivers)
- (WIP) Command-Event Chains
- (WIP) Query Handlers

### Part 3: Cross-Context Communication

- (WIP) Request-Response Communication
- (WIP) Pub/Sub Communication
