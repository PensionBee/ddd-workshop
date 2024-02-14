# EventStorming

[Back to the workshop overview](https://github.com/PensionBee/ddd-workshop#ddd-workshop-overview)

*NB: This section of the workshop blurs the lines a little between Big Picture EventStorming and Design Level EventStorming, which works fine for our purpose but may not be the best idea in certain real-world situations. Therefore, it's recommended that you carry out some additional research into the different types of EventStorming before adopting the following as a definitive guide.*

## Context

EventStorming is a powerful workshop approach which helps groups of engineers and non-engineers to:

- **Reach a shared understanding of a problem space**, which reduces knowledge silos, corrects inaccurate assumptions/understanding and enables high value discussions.
- **Develop a "Ubiquitous Language"**, which streamlines communication between everyone involved in the software development lifecycle, such as product managers, software engineers, designers, domain experts and other business stakeholders.
- **Create useful models of reality**, which can be efficiently converted into equally useful software
- **Identify "Bounded Contexts"**, which can be used to facilitate independent, empowered, cross-functional teams, as well as build scalable, decoupled software systems.

...and all that before we've written a single line of code!

A key element of EventStorming is that we, as a team, focus on identifying the "events" that make up a business process or group of connected business processes. We then build around these events to create useful representations of the problem space that will eventually become software.

For example, in an E-commerce business, we might want to explore and model the end-to-end customer shopping experience in order to streamline our systems. Some of the events we might identify are:

- `Product Added to Basket`
- `Shipping Address Added`
- `Payment Taken`
- `Order Created`
- `Order Shipped`
- `Order Delivered`

This section of the workshop will focus on 6 elements, which are part of, or heavily inspired by, currently accepted EventStorming approaches:

1. Events
2. Commands
3. Actors
4. Entities
5. Business Rules
6. Bounded Contexts

## The Practical Bit

Ideally, this activity would be done in a group, either with a large section of wall and some sticky notes, or digitally using virtual stickies/blocks/elements in your favourite whiteboarding tool.

Our goal here is to understand how the 6 elements above fit together to create something that we can turn into working software. For this purpose, we'll use our CEO's initial requirements as the focus for our EventStorming session. THis is a little different from EventStorming in a real scenario, which is likely to be much more explorative than this. Here's a reminder of what those initial requirements were:

> 1. People need to be able to register with their email address and a password.
> 2. Users should be able to write short posts, possibly including images, which we’re going to display on the app's home page.
> 3. They also need to be able to follow accounts they like. But not accounts that have already blocked them.
> 4. Ohh, and comments. Being able to comment on a post is important too.

### Part 1: Events

Let's add some events to our canvas (only the golden path ones for now):

- As individuals, identify relevant events from the above requirements and dump **Event** stickies anywhere on the canvas. Make sure they're all in past tense, e.g. `Product Added to Basket`, `Passport Verified` and `House Purchased`.
- Visualise the canvas as a timeline from left to right then work as a team to arrange the events in timeline order (feel free to put events above and below each other where there's no obvious time dependence between them).
- Remove duplicate events then start discussing the timeline as an entire group or in smaller groups or pairs. Focus on areas of the timeline where there's a lot of conflict in perspectives. These are known as "hotspots". If possible, try to also reach some kind of shared language that the majority of people agree on. For example, don't use `Report Created` *and* `Statement Created` to describe the exact same thing - work together to figure out if it's a report or a statement, then pick one as a team and stick with it going forward.

Once you're "happy enough" with the events on the timeline, move onto part 2. EventStorming is an iterative process so you can come back and update events at any point.

### Part 2: Commands

Events capture things that have already happened in the system - commands capture intent to change the system. For example, a `Passport Verified` event would be a reasonable event resulting from a `Verify Passport` command.

Let's add some commands to our canvas:

- Working through the timeline, add a corresponding **Command** sticky on the left of each **Event** sticky.

Now each section of the diagram reads like so:

> **Command X** results in **Event X**.

*'X' is just a placeholder here - it doesn't represent anything specific.*

Commands might seem a little redundant at this stage but they'll make our diagrams much clearer as we add more elements in the future, such as events capturing business rule violations (see part 5 below) or *Policies* (which we'll get into in a later section of the workshop).

### Part 3: Actors

An actor is anyone who issues commands to our systems (often through a user interface). For example, a `Customer` (using a mobile app), a `Warehouse Operative` (using a physical console in a warehouse) or a `Sales Rep` (using an internal CRM) could all be actors in our domains.

Let's add some actors to our canvas:

- Working through the timeline, add a corresponding **Actor** sticky underneath each **Command** sticky.

Now each section of the diagram reads like so:

> **Actor X** issues **Command X**, resulting in **Event X**.

### Part 4: Entities

An entity is anything in our domain which has a lifecycle and can be modelled with a unique ID. From the E-commerce example, a `Customer`, `Basket`, `Order`, `Payment` and `Shipment` are all examples of entities in the various domains. For example, a `Payment` entity with ID `payment-123` could have a `status` attribute which can change from `pending` to either `succeeded` or `failed` throughout it's lifecycle.

Generally, there's a strong relationship between entities and commands/events. Specifically, each entity will usually have 1 or more commands associated with it. Conversely, each command primarily affects one type of entity. For example, a `Basket` entity might have the following commands associated with it: `Add Product to Basket`, `Remove Product from Basket` and `Empty Basket`. Each of these commands are intentions to modify a basket entity in some way.

Let's add some entities to our canvas:

- Working through the timeline, add the corresponding **Entity** sticky above each **Command** sticky.

Now each section of the diagram reads like so:

> **Actor X** issues **Command X**, which affects **Entity X**, resulting in **Event X**.

### Part 5: Business Rules

Now that we've got our golden path scenarios sorted, we can start incorporating business rules and additional failure events or success events.

Back to our E-commerce example, we might have a business rule specifying that `a maximum of 5 items can be shipped in one order`. Given this business rule, the `Add Product to Basket` command now has two possible events associated with it: `Product Added to Basket` and `Add Product to Basket Failed / Product Limit Reached`. Commands can have many possible events associated with them, depending on the complexity of the domain.

There a are a couple of ways to capture business rules and business rule violations:

1. Add explicit **Business Rule** stickies between a **Command** sticky and it's corresponding **Event** stickies. Then add additional **Event** stickies to capture violations of these business rules.
2. Capture business rules entirely through clearly named **Event** stickies, like in the above example: `Add Product to Basket Failed / Product Limit Reached`. One potential issue with this approach is that you may need to capture the specifics of a business rule. We could name the event using `5 Product Limit Reached` but that's not likely to scale well, especially if basket product limits change frequently.

Let's go with the **second** method for now and add some business rule violation **Event** stickies to our canvas:

- Working through the timeline, come up with some realistic business rules for each **Command** sticky and capture violations of those business rules with additional **Event** stickies.

**In a real-wold scenario, business rules will likely arise through conversation with domain experts, often as part of EventStorming sessions. You might also have some ideas about potential business rules in a domain that haven't been made explicit. In such scenarios, you can try to find a domain expert with concrete knowledge of the domain, who confirm or correct your suspicions/knowledge.**

Now each section of the diagram reads like so:

> **Actor X** issues **Command X**, which affects **Entity X**, resulting in either **Event X**, **Event Y** or **Event Z**.

### Part 6: Bounded Contexts

In DDD, a Bounded Context is a very important concept. [Martin Fowler's Bounded Context overview](https://martinfowler.com/bliki/BoundedContext.html) (2 minute read) does a great job of illustrating what it is conceptually - go check it out.

There are some specific techniques that can be used to identify bounded contexts from EventStorming canvases. Here are two basic ones:

1. Use your instincts (remember to work as a team) to draw boxes around areas that "feel" closely related to each other, e.g. draw a box around everything related to `Accounts`, a separate box around everything to do with `Shipping`, and so on. This method is a little crude but, in some scenarios (usually when simpler domains are involved), it can be a very reasonable approach.
2. Look at entities in isolation and visually group related ones together - context boundaries often become clear as a result.

Let's use the **second** approach to choose (it is a choice after all) our context boundaries.

1. Copy all of the **Entity** stickies over to a new section of the canvas, removing duplicates.
2. Move related **Entity** stickies near each other.
3. (optional) Copy **Command** stickies over to the new area of the canvas and move them next to their corresponding **Entity** stickies. This step makes it really clear to see which commands are supported by which entities. This can help identifying relationships between different entities in a domain.
4. Draw boxes around groups of related entities and give meaningful names to each box. Each box should be relatively independent of each other (coupling is inevitably going to exist - all we can do is try to manage that coupling).
5. That's it - bounded contexts identified! Now we can port these bounded contexts over to the timeline. This might result in the same bounded context appearing multiple times on the timeline, which is completely fine.

Although this process is more of an art than a science, there are a couple of traps you might fall into (neither of which is likely to scale well):

1. Creating a few, very large bounded contexts which encapsulates many entities
2. Creating lots of tiny bounded contexts which each encapsulate very few entities

The sweet spot is context dependent but likely somewhere in-between these extremes.

### Solutions

"Solutions" to the above exercises (there isn't just one solution) can be found [here](https://github.com/PensionBee/ddd-workshop/tree/eventstorming-solutions).

## Additional Resources

- [eventstorming.com](https://www.eventstorming.com/resources/)
- [Event Storming Journal](https://www.eventstormingjournal.com/)
