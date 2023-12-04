# EventStorming

[Back to the workshop overview](https://github.com/PensionBee/ddd-workshop#ddd-workshop-overview)

## Context

EventStorming is a powerful workshop format which helps us to:

- **Reach a shared understanding of the problem/solution space** which helps to reduce knowledge silos.
- **Develop a shared language** that we can use to communicate effectively with the rest of the team, domain experts and business stakeholders.
- **Design effective solutions to complex business problems quickly** which can save us a lot of valuable time in the future.
- **Identify Bounded Contexts** that we can use to build scalable software systems.
- **Create living documentation** that we can iterate on as our understanding of a business domain improves or as business requirements change.

...And all that before we've written a single line of code!

A key idea in EventStorming is that we, as a team, preferably with business stakeholders and domain experts, focus primarily on modelling the **Events** that happen as part of a business process we're interested in.

For example, in an E-commerce business, we might want to explore and model the end-to-end customer shopping experience in order to build an initial prototype. Some of the events we might identify are:

- `Product Added to Basket`
- `Shipping Address Added`
- `Payment Taken`
- `Order Created`
- `Order Shipped`
- `Order Delivered`

This section of the workshop will focus on 5 EventStorming elements:

- Events
- Commands
- Actors
- Entities (or Aggregates)
- Context Boundaries

## Resources

Feel free to check out these resources before or after tackling 'The Practical Bit' below.

- [eventstorming.com](https://www.eventstorming.com/resources/) (Careful! This resource is a rabbit hole)

## The Practical Bit

*Note: Example solutions to this section can be found [here](https://github.com/PensionBee/ddd-workshop/tree/eventstorming-solutions)*

*Note: you can do this activity with a sheet of paper and some sticky notes, or digitally using any whiteboarding tool.*

Let's revisit our CEO's initial requirements as the focus for our EventStorming session. Here's a reminder of those requirements:

> 1. People need to be able to register with their email address and a password.
> 2. Users should be able to write short posts, possibly including images, which we’re going to display on the ‘Feed’ page of our app.
> 3. Folk also need to be able to follow accounts they like.
> 4. Ohh, and comments. Being able to comment on a post is important too.

### Part 1: Storm the Events

*Note: it's not unreasonable for a large part of an EventStorming session to be spent focusing on getting the events right, which will increase chances of reaping all the benefits outlined above. However, EventStorming is a non-linear, iterative process and we can modify events (or any other elements on our diagram) at any point during a session, given there's a consensus for the change.*

Let's add some events to our canvas:

1. Identify the important events in the above requirements and dump **Event** stickies/elements anywhere on the canvas. Make sure they are all in past tense, e.g. `Product Added to Basket`, `Passport Verified` or `House Purchased`.
2. Visualise the canvas as a timeline from left to right then arrange the events in timeline order. Remove obvious duplicates and discuss events which are similar or conflicting. Try to agree on shared language that you're all happy using going forward; don't use **Report** *and* **Statement** to describe the exact same thing - pick one and stick with it.

### Part 2: Adding Commands

While an event captures something that has already changed in the system, a command captures an intent (by someone or something) to change the system. For example, it's likely a `Passport Verified` event would be the direct result of a `Verify Passport` command.

Let's add some commands to our canvas:

1. Working from left to right, add the corresponding **Command** sticky/element on the left of each **Event** sticky/element.

Now each section of the diagram reads like this:

> **Command X** results in **Event X**.

(Note that 'X' is just a placeholder - it doesn't represent anything specific)

Commands might seem a little useless at this stage but they make our diagrams much clearer as we add more elements, especially *policies* which we'll get to in a later section of the workshop. They'll also help us out when we start writing code by making it explicit what functionality we need to build.

### Part 3: Adding Actors

An actor is anyone who issues commands to our systems (usually through a user interface). For example, a `Customer` (using a public web app), a `Warehouse Operative` (using a physical console in a warehouse) or a `Sales Rep` (using a Customer Relationship Management (CRM) tool) could all be actors in our business domains.

Let's add some actors to our canvas:

1. Working from left to right, add the corresponding **Actor** sticky/element underneath each **Command** sticky/element.

Now each section of the diagram reads like this:

> **Actor X** issues **Command X** resulting in **Event X**.

### Part 4: Adding Domain Entities

Many EventStorming examples in the wild incorporate an **Aggregate** sticky/element. However, let's ignore the concept of an aggregate for now and instead focus on the concept of an 'entity', which is very similar but less abstract.

An entity is anything in our domain which can be modelled with an ID and has a 'lifecyle', i.e. it's attributes/state can change over time without changing it's identity. In the E-commerce example above, `Basket`, `Order`, `Payment` and `Shipment` are all examples of entities that we might identify in our business. For example, the `status` attribute of a `Payment` entity with ID `payment-123` could change from `pending` to either `succeeded` or `failed` - it's attributes/state have changed but it's still conceptually the same payment.

Generally, there's a strong relationship between entities and commands. Specifically, Each entity will have 1 or more commands associated with it. Conversely, each command acts on one kind of entity. For example, a `Basket` entity might have the following commands associated with it: `Add Product to Basket`, `Remove Product from Basket` and `Empty Basket`.

Let's add some entities to our canvas:

1. Working from left to right, add the corresponding **Entity** sticky/element above each **Command** sticky/element.

Now each section of the diagram reads like this:

> **Actor X** issues **Command X** which affects **Entity X** resulting in **Event X**.

### Part 5: Identifying Context Boundaries

In DDD, a Bounded Context (BC) is a very important concept (althought it is a little bit abstract). [Martin Fowler's Bounded Context overview](https://martinfowler.com/bliki/BoundedContext.html) (2 minute read) does a great job of illustrating what it is - go check it out...

There are a few different techniques that can be used to identify bounded contexts using an EventStorming diagram. Here's two of them:

1. Use your instincts (remember to work as a team) to draw lines/circles/boxes around areas that feel closely related to each other, e.g. draw a line around everything related to `Accounts`, a separate line around everything to do with `Shipping`, and so on. This method is a little crude but, in some scenarios (usually when smaller diagrams are involved), it can be a very reasonable approach.
2. Visually group related entities (with or without their behaviours) together. Context boundaries often become clear as a result. (this is easier on virtual EventStorming diagrams since it requires duplicating elements)

Let's use the **second** approach to try and identify/choose (it is a choice after all) our context boundaries.

1. Copy all of the **Entity** stickies/elements over to a new section of the canvas, removing duplicates.
2. Move related **Entity** stickies/elements near each other.
3. (optional) Copy **Command**/**Event** stickies/elements over to the new area of the canvas and move them next to their corresponding **Entity** stickies/elements. This optional step makes it really clear to see which commands are supported by the different business entities and what the possible events (outcomes) are.
4. Draw lines/circles/boxes around groups of related entities and give meaningful names to each.
5. That's it - bounded contexts identified! You can now 'port' these bounded contexts back to the original timeline. This *might* result in the same bounded context appearing multiple times on the timeline, which is completey fine.

Althought this process is halfway between an art and a science, there are two traps you might fall into (neither of which scales well):

1. Creating one large bounded context which encapsulates all entities/behaviours
2. Creating lots of tiny bounded contexts which each encapsulate very few entities/behaviours

The sweet spot is somewhere in between...
