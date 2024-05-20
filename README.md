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

You’re apprehended by the CEO at the coffee machine, just as you’re on the verge of figuring out how the damn thing works...

> Right, here’s what we're going to need from you ASAP:
>
> 1. People need to be able to register an account with their email address and a password.
> 2. Users should be able to write short posts, possibly including images, which we’re going to display on the app's home page.
> 3. They also need to be able to follow accounts they like.
> 4. Ohh, and comments. Being able to comment on a post is important too.
>
> Alright then, chop chop, let’s get to it.

You return to your desk (coffeeless). But you're excited. You feel it's time to try out this "Domain-Driven Design" thing you've heard so much about...

## Workshop Overview

[01: TypeScript foundations](https://github.com/PensionBee/ddd-workshop/tree/01-typescript)

[02: EventStorming](https://github.com/PensionBee/ddd-workshop/tree/02-eventstorming)

[03: Entities](https://github.com/PensionBee/ddd-workshop/tree/03-entities)

[04: Repositories](https://github.com/PensionBee/ddd-workshop/tree/04-repositories)

[05: Command handlers](https://github.com/PensionBee/ddd-workshop/tree/05-command-handlers)

[06: Policies](https://github.com/PensionBee/ddd-workshop/tree/06-policies)

[Final](https://github.com/PensionBee/ddd-workshop/tree/final)
