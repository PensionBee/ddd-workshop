# EventStorming

[Back to the workshop overview](https://github.com/PensionBee/ddd-workshop#ddd-workshop-overview)

## Context

EventStorming is a powerful workshop format which helps us to achieve the following before we write a single line of code:

- **Reach a shared understanding** of the problem/solution space, helping to reduce knowledge silos.
- **Create a shared language** that we can use to communicate effectively with the rest of the team, domain experts and business stakeholders.
- **Quickly design effective solutions** to complex business problems.
- **Identify Bounded Contexts** that we can use to build scalable software systems.
- **(Optionally) Create living documentation** that we can iterate on as our understanding of a business domain improves or as business requirements change (digitised EventStorming diagrams work best for this).

The key idea behind this approach is that we, as a team, preferably with business stakeholders and domain experts in the room, collaboratively model the events that make up business processes we're interested in.

For example, in an E-commerce business, we might explore and model the end-to-end customer shopping experience in order to build our first prototype. Some of the events we might identify are:

- `Product Added to Basket`
- `Shipping Address Added`
- `Payment Taken`
- `Order Created`
- `Order Shipped`
- `Order Delivered`

We can model a process using a single EventStorming diagram or, depending on the size and complexity of the process, break it down into smaller sub-processes, each with its own diagram.

This section will focus on 5 of the main EventStorming elements:

- Events
- Commands
- Actors
- Entities (you'll often see 'Aggregates' if you look at other resources but let's go with 'Entities' for now)
- Context Boundaries

## Resources

Feel free to check out these resources before or after tackling 'The Practical Bit' below.

- [eventstorming.com](https://www.eventstorming.com/resources/) (Careful! This resource is a rabbit hole)

## The Practical Bit

*Note: You can do this activity with a sheet of paper and some sticky notes, or digitally using any whiteboarding tool.*

Let's revisit our CEO's initial requirements as the focus for our EventStorming session. Here's a reminder of those requirements:

> 1. People need to be able to register with their email address and a password.
> 2. Users should be able to write short posts, possibly including images, which we’re going to display on the ‘Feed’ page of our app.
> 3. Folk also need to be able to follow accounts they like.
> 4. Ohh, and comments. Being able to comment on a post is important too.

### Part 1: Storm the Events

*Note: it's not unreasonable for a large part of an EventStorming session to be spent focusing on getting the **events** right, which will increase our chances of quickly designing an effective solution. Saying that, EventStorming is a non-linear, iterative process and we can modify **events** at any point during a session.*

1. Identify the important events in the above requirements and dump **Event** stickies/elements anywhere on the canvas. Make sure they are all in past tense, e.g. `Product Added to Basket` or `Passport Verified` or `House Purchased`.
2. Visualise the canvas as a timeline from left to right then arrange the events in timeline order. If working with other people, remove obvious duplicates and discuss events which are similar or conflicting. Try to agree on shared language that you're all happy using going forward; don't use **Report** *and* **Statement** to describe the same thing - pick one and stick with it.

### Part 2: Adding Commands

While events capture things that have changed in the system, commands capture intent (by someone or something) to change the system. For example, it's likely the `Passport Verified` event would be the direct result of a `Verify Passport` command.

1. Working across the canvas from left to right, add a relevant **Command** sticky/element on the left of each **Event** sticky/element.

Now each section of the diagram reads like this:
> **Command X** results in **Event X**.

(Note that 'X' is just a placeholder - it doesn't represent anything specific)

**Commands** might seem a bit useless at this stage but they'll make our diagrams much clearer as we add more elements later, especially *policies* which we'll get to in a later section of the workshop. They'll also help us out when we start writing code.

### Part 3: Adding Actors

An actor is anyone who issues commands to our systems (usually via a user interface of some kind). For example, a `Customer`, a `Warehouse Operative` and a `Sales Rep` could all be actors in our business.

1. Working from left to right, add a relevant **Actor** sticky/element underneath each **Command** sticky/element.

Now each section of the diagram reads like this:
> **Actor X** issues **Command X** resulting in **Event X**.

### Part 4: Adding Domain Entities

Many EventStorming examples in the wild incorporate an **Aggregate** sticky/element. However, let's ignore the concept of an aggregate for now and instead focus on the concept of an 'entity', which is very similar but less abstract.

An entity is anything in our domain which can be modelled with a ID attribute and goes through some kind of 'lifecyle' (it's attributes/state can change over time). In the E-commerce example above, `Basket`, `Order`, `Payment` and `Shipment` are all examples of entities that we might identify in our business. For example, the `status` attribute of a `Payment` entity with ID `payment-123` could change from `pending` to either `succeeded` or `failed` - it's state/sttributes have changed but it's still conceptually the same payment.

Generally, there's a strong relationship between entities and commands. Specifically, Each entity will have 1 or more commands associated with it. For example, the `Basket` entity might have the following commands associated with it: `Add Product to Basket`, `Remove Product from Basket` and `Empty Basket`.

1. Working from left to right, add a relevant **Entity** sticky/element above each **Command** sticky/element.

Now each section of the diagram reads like this:
> **Actor X** issues **Command X** which affects **Entity X** resulting in **Event X**.

### Part 5: Identifying Context Boundaries

In DDD, a Bounded Context (BC) is a very important concept (althought it's a little bit abstract). [Martin Fowler's Bounded Context overview](https://martinfowler.com/bliki/BoundedContext.html) (2 minute read) does a great job of illustrating what a BC is - go check it out...

There are a few different techniques that can be used to identify bounded contexts from EventStorming diagrams. Here are two of them:

1. Simply use your eyeballs and your instincts to draw lines/circles/boxes around areas that feel related to each other, e.g. draw a line around everything related to `Accounts`, a separate line around everything to do with `Shipping`, and so on. This method is a little crude but, in some scenarios (usually with smaller diagrams), it can be a reasonable approach.
2. Visually group related entities and their behaviours together. Context boundaries often become clear as a result. (this is easier on virtual EventStorming diagrams)

Let's use the second approach to try and identify/choose our context boundaries.

1. Make a copy of the EventStorming diagram.
2. Remove **Actor** stickies/elements (they just add clutter).
3. Remove duplicate **Entity** stickies/elements (but keep one), then group **Command**/**Event** stickies/elements next to their corresponding entities.
4. Move related **Entity** stickies/elements (plus corresponding **Command**/**Event** stickies/elements) near each other.
5. Draw lines/circles/boxes around groups of related entities.
6. Give meaningful names to the groups you've identified.
7. That's it - bounded contexts identified! Now you can 'port' those bounded contexts back to the original timeline. This *might* result in the same bounded context appearing multiple times, which is perfectly fine.

Althought this process is halfway between an art and a science, there are two traps you might fall into (neither of which scales well):

1. Creating one large bounded context which encapsulates all entities/behaviours
2. Creating lots of tiny bounded contexts which each encapsulate very few entities/behaviours

The sweet spot is somewhere in between...
