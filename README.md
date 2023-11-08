# DDD Workshop - EventStorming

[Back to the workshop overview](https://github.com/PensionBee/ddd-workshop#workshop-overview)

## Context

EventStorming is a workshop format which helps us to quickly design effective solutions before we write any code. The key idea behind this approach is that we, as a team, preferably with business stakeholders and domain experts in the room, collaboratively model the **events** that make up business processes we're interested in.

For example, in an E-commerce business, we might want to exploring and model the end-to-end customer shopping experience in order to build our first prototype. Some of the events we might identify are:

- `Product Added to Basket`
- `Shipping Address Added`
- `Payment Taken`
- `Order Created`
- `Order Shipped`
- `Order Delivered`

We can model a process using a single EventStorming diagram or, depending on the size and complexity of the process, break it down into smaller sub-processes, each with its own diagram.

When done well, EventStorming is a powerful tool that helps us to:

- **Reach a shared understanding** of the problem/solution space, helping to reduce knowledge silos.
- **Create a shared language** we can use to communicate effectively with the rest of our team, domain experts and business stakeholders.
- **Quickly design effective solutions** to complex business problems.
- **Identify Bounded Contexts** that we can use to build scalable software systems (more on this in a later section).
- **(Optionally) Create living documentation** that we can iterate on as our understanding of a business domain improves or as business requirements change (digitised EventStorming diagrams work best for this).

This section will focus on 5 key elements of EventStorming:

- Events
- Commands
- Actors
- Entities (you'll often see 'Aggregates' if you look at other resources but let's go with 'Entities' for now)
- Context Boundaries

## Resources

Feel free to check out these resources before or after tackling 'The Practical Bit' below.

- [eventstorming.com](https://www.eventstorming.com/resources/) (Careful! This resource is a rabbit hole)

## The Practical Bit

*Note: You can do this activity with a sheet of paper and some sticky notes, or digitally using a whiteboarding tool.*

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

1. Working from left to right through the canvas, add a **Command** sticky/element on the left of each **Event** sticky/element.

Now each section of the diagram reads like this:
> **Command X** results in **Event X**.

(Note that 'X' is just a placeholder - it doesn't represent anything specific)

**Commands** might seem worthless at this stage but they'll make our diagrams much clearer as we add more elements, especially *policies* (which we'll add in a later workshop section).

### Part 3: Adding Actors

An actor is anyone who issues commands to our systems (usually via some kind of user interface). For example, a `Customer`, a `Warehouse Operative` and a `Sales Rep` could all be actors in our business.

1. Working from left to right, for each **Command**/**Event** pair, add an **Actor** sticky/element underneath the **Command** sticky/element.

Now each section of the diagram reads like this:
> **Actor X** issues **Command X** resulting in **Event X**.

### Part 4: Adding Domain Entities

Many EventStorming examples out in the wild incorporate an **Aggregate** sticky/element. However, let's ignore the concept of an aggregate for now and instead focus on the concept of an 'entity'.

An entity is anything in our domain which can be modelled using a unique identifier (an ID) and also has a 'lifecyle' (it's attributes can change over time). In the E-commerce example above, `Basket`, `Order`, `Payment` and `Shipment` are examples of entities in our business, since they can all be modelled with a unique ID and their attributes can change over time while still being the same `Basket`, `Order`, etc.

As a concrete example, the `status` attribute of a `Payment` entity with the ID `payment-123` can change from `pending` to either `succeeded` or `failed` - it's the same payment in both cases but it evolves over time.

Generally, there's a strong relationship between entities and commands. Specifically, Each entity will have 1 or more commands associated with it. For example, the `Basket` entity could have the following commands associated with it: `Add Product to Basket`, `Remove Product from Basket` and `Empty Basket`.

1. Working from left to right, for each **Command**/**Event**/**Actor** group, add an **Entity** sticky/element above the **Command** sticky/element.

Now each section of the diagram reads like this:
> **Actor X** issues **Command X** which affects **Entity X** resulting in **Event X**.

### Part 5: Adding Context Boundaries

*In DDD, a bounded context is an important concept, if a little abstract. [Martin Fowler's Bounded Context overview](https://martinfowler.com/bliki/BoundedContext.html) (2 minute read) does a great job of illustrating what they are. Go check it out.*

*EventStorming diagrams are great for identifying bounded contexts because we have a high level overview of the entities and capabilities in our business processes, as well as how they relate to each other. There are some specific techniques for identifying bounded contexts but the easiest (if a little crude) is to simply draw lines around areas that instinctively feel related to each other, e.g. everything to do with `Accounts`, everything to do with `Shipping`, etc. This can be a great starting point for having the discussions necessary to design effective context boundaries.*

1. Looking at the EventStorming diagram as a whole, try to identify boundaries around groups of related entities / capabilities. Draw lines/circles/boxes around those areas and give them meaningful names. (note that the same bounded context can appear in several places along the timeline - it's not uncommon for business processes to move from one bounded context to another and then back again.)

To sanity check the bounded contexts you've identified/chosen, try these two thought experiments:

- Imagine each bounded context is owned by a different team and only the owning team can change anything about a bounded context (conceptually or in the code that will eventually represent that bounded context). Ask yourself if the current design would result in a lot of *unneccessary* cross-team meetings and bottlenecks.
- Imagine each bounded context as an independently deployed service which has to communicate with all other bounded contexts via API calls. Ask yourself if the current design would result in a lot of *unneccessary* cross-team meetings and bottlenecks.

There are two extremes when identifying/choosing bounded contexts:

- One large bounded context which encapsulates everything
- Many tiny bounded contexts which each encapsulate a very small number of entities/behaviours

The sweet spot is somewhere in the middle.

### Part 6: Group Entities into their Bounded Contexts

Let's go back to [Martin Fowler's Bounded Context overview](https://martinfowler.com/bliki/BoundedContext.html). The first diagram there shows two bounded contexts, each containg multiple entities with lines connecting them together. This is a great way of condensing all the information in our EventStorming diagram down into a simple overview of the core elements in a bounded context and the relationships between them.

1. Create a second diagram which contains only the context boundaries you created in the EventStorming diagram. This time, there should only be one of each.
2. Add each entity from the EventStorming diagram to the relevant bounded context
3. Draw lines connecting entities which have some kind of relationship with each other. If it helps, imagine how you would model foreign keys in a database between these Entities. Also, don't worry if any of the lines cross between bounded contexts - we'll resolve that in a later section

That's it! Now we've got a simple, clear diagram illustrating the context boundaries, entities and relationships in our business.
