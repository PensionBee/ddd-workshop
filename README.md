# EventStorming

[Back to the workshop overview](https://github.com/PensionBee/ddd-workshop#workshop-overview)

## Context

EventStorming is a powerful, collaborative tool which helps engineers and non-engineers to:

- **Reach a shared understanding of a problem space**
  - ...which reduces knowledge silos, corrects inaccurate assumptions/understanding and enables high value discussions.
- **Develop a "Ubiquitous Language"**
  - ...which streamlines communication between everyone involved in the software development lifecycle, including product managers, software engineers, designers, domain experts and business stakeholders.
- **Create useful models of reality**
  - ... which can be used as the foundation for writing high-quality software.
- **Identify "Bounded Contexts"**
  - ... which can be used to facilitate independent, empowered, cross-functional teams, as well as build scalable, decoupled software systems.

All that (and more) before we've written a single line of code! Ultimately, EventStorming is a very 'cheap' way to explore a problem space and design solutions to the challenges found there. Remember...

> 1 month of coding can save you 1 day of EventStorming

A key element of EventStorming is that we, as a team, focus on identifying the "things that happen" (**Events**) in a problem space or business process we're interested in exploring. We then build around these **Events** to create useful representations of the problem space that will eventually become software.

For example, in an E-commerce domain, we might want to explore and model the end-to-end customer shopping experience in order to streamline our systems. Some of the **Events** we might identify are:

- `Product Added to Basket`
- `Shipping Address Added`
- `Payment Taken`
- `Order Created`
- `Order Shipped`
- `Order Delivered`

This section of the workshop will focus on 5 elements:

1. Events
2. Commands
3. Actors
4. Entities
5. Bounded Contexts

## Additional Resources

- [eventstorming.com](https://www.eventstorming.com/resources/)
- [Event Storming Journal](https://www.eventstormingjournal.com/)

## The Practical Bit

Ideally, this activity would be done in a group, either with a large section of wall and some sticky notes, or digitally using virtual stickies/elements in your favourite whiteboarding tool.

Our goal here is to understand how the 5 elements above fit together to create something that we can turn into working software. For this purpose, we'll use our CEO's initial requirements as the focus for our EventStorming session. THis is a little different from EventStorming in a real scenario, which is likely to be much more explorative than this. Here's a reminder of what those initial requirements were:

> 1. People need to be able to register and account with their email address and a password.
> 2. Users should be able to write short posts, possibly including images, which we’re going to display on the app's home page.
> 3. They also need to be able to follow accounts they like. But not accounts that have already blocked them.
> 4. Ohh, and comments. Being able to comment on a post is important too.

### Part 1: "Golden Path" Events

Focusing on the "golden path" for now, let's start by adding **Events** to our canvas:

1. Have 1 person talk through the process out loud (i.e. the 4 requirements about).
2. As a group (but in silence while the process is being talked through), identify relevant things that happen and add them to the canvas along an imaginary timeline. Make sure **Events** are all in past tense, e.g. `Product Added to Basket`, `Passport Verified` and `House Purchased`.
3. Walk through the timeline and discuss what's there. Focus on areas where there's a lot of conflict in perspectives - these are known as "hotspots". Strive to find a shared language that the majority of people agree on. For example, don't use `Report Generate` *and* `Statement Generated` to describe the exact same thing - work together to figure out if it's a report or a statement, then pick one as a team and stick with it going forward. This is known as the *Ubiquitous Language* in DDD lingo.

Once you're "happy enough" with the **Events** on the timeline, move onto part 2. EventStorming is a somewhat iterative process so you can come back and update **Events** at any point.

### Part 2: Commands

While **Events** capture things that have already happened (facts that can't be changed), **Commands** capture an intent to change the system. For example, a `Passport Verified` **Event** would likely be the success **Event** of a `Verify Passport` **Command**. Pretty simple, right?

Let's add some **Commands** to our canvas:

- Working through the timeline, add a corresponding **Command** element on the left of each **Event** element.

Now each section of the diagram reads like so:

> **Command X** results in **Event X**.

*'X' is just a placeholder here - it doesn't represent anything specific.*

Commands might seem a little redundant at this stage but they'll make our diagrams much clearer as we add more elements, such as fail **Events** (see part 5 below) and *Policies* (which we'll cover another time).

Also, as we'll see in the "command handlers & derivers" section of the workshop, each command can be converted into a single function in our code, responsible for handling an "atomic change" in the system.

Bottom line, **Commands** are *really* useful. We like **Commands**.

### Part 3: Actors

An **Actor** is anyone who issues **Commands** to our system (usually through a user interface). For example, a `Customer` (using a mobile app), a `Warehouse Operative` (using a console in a warehouse) or a `Sales Rep` (using an internal CRM) could all be **Actors**.

Adding **Actors** helps us to focus on the users our software needs to support. This knowledge is *always* worth keeping in mind when designing software systems.

Let's add some **Actors** to our canvas:

- Working through the timeline, add a corresponding **Actor** element underneath each **Command** element.

Now each section of the diagram reads like so:

> **Actor X** issues **Command X**, resulting in **Event X**.

### Part 4: Entities

**Entities** represent the concepts which exist in our domain. From the E-commerce example, the relevant **Entities** at play might be: `Account`, `Basket`, `Order`, `Payment` and `Shipment`.

Entities are always unique (they will have an ID) and transition through some kind of lifecylce over time. For example, a `Payment` **Entity** with ID `payment-123` could have a `status` attribute which can change from `pending` to either `succeeded` or `failed` throughout it's lifecycle.

Generally there's a strong relationship between **Entities** and **Events**. Specifically, each **Event** should belong to a single type of **Entity**. For example, `User Registered` might belong to a `User` **Entity** or `Payment Succeeded` might belong to a `Payment` **Entity**.

Similarly, there's a strong relationship between **Entities** and **Commands**. Specifically, each type of **Entity** will likely have 1 or more **Commands** associated. For example, `Add Product to Basket`, `Remove Product from Basket` and `Empty Basket` might belong to a `Basket` **Entity**. Each of these **Commands** are intentions to modify the basket **Entity** in some way.

Let's add some **Entities** to our canvas:

- Working through the timeline, add the corresponding **Entity** element above each **Event** element.

Now each section of the diagram reads like so:

> **Actor X** issues **Command X**, resulting in **Event X**, which affects **Entity X**.

### Part 5: Fail Events (Business Rules)

Now that we've got our golden path scenarios sorted, we can start incorporating business rules and additional failure **Events**.

Back to our E-commerce example, we might have a business rule specifying that `a maximum of 5 items can be shipped in one order`. Given this business rule, the `Add Product to Basket` command now has two possible **Events** associated with it: `Product Added to Basket` and `Product Not Added To Basket / Product Limit Reached`. **Commands** often have several possible **Events** associated with them, depending on the complexity of the problem space.

Here, we're going to capture business rules entirely through clearly named events, like in the above example. One potential issue with this approach is that you may need to capture the specifics of a business rule. If this is needed, feel free to add notes/comments alongside the **Event** or add dedicated "business rule" elements between command and **Event** elements in whatever colour you want to use.

Let's and add some fail **Events** to our canvas:

- Working through the timeline, identify some some realistic business rules associated with each command and capture violations of those business rules with additional **Events**.

**In a real-wold scenario, business rules will likely arise through conversation with domain experts, often as part of EventStorming sessions. You might also have some ideas about potential business rules in a domain that haven't been made explicit. In such scenarios, find a domain expert with concrete knowledge of the domain who can confirm or correct your suspicions.**

Now each section of the diagram reads like so:

> **Actor X** issues **Command X**, resulting in either **Event X**, **Event Y** or **Event Z**, which could affect **Entity X**.

### Part 6: Bounded Contexts

In DDD, the **Bounded Context** is a very important concept. [Martin Fowler's Bounded Context overview](https://martinfowler.com/bliki/BoundedContext.html) (2 minute read) does a great job of illustrating what it is conceptually - go check it out.

Ultimately, **Bounded Contexts** are about breaking a large domain with smaller subdomains into explicit models with strong boundaries. Although it sounds simple, it can be challenging to get right in real-world scenarios, and can have profound negative implications on software scalability and maintainablity in the long-run if you get it really wrong.

Let's explore one technique for identifying Bounded Contexts, which focuses on the idea that the primary driver of a good context boundary is the **Entities** contained within it.

1. Copy all of the **Entities** over to a new section of the canvas, removing any duplicates.
2. (optional) Copy all of the **Commands** over to the new area of the canvas and align them underneath their corresponding **Entities**. This step makes it really clear which changes in the system correspond with which entitie, which can help to identify relationships between **Entities**.
3. Move strongly related **Entities** near each other.
4. Draw boxes around groups of related **Entities** and give meaningful names to each box. Each box should be relatively independent of each other (coupling is inevitably going to exist - all we can do is try to manage that coupling).
5. That's it - **Bounded Contexts** identified! Now we can port these **Bounded Contexts** back to the timeline. This will often result in the same **Bounded Context** appearing multiple times on the timeline, capturing different parts of the process.

Although chooding **Bounded Contexts** is an art as much as it is a science, there are a couple of traps you might fall into (neither of which is likely to scale well):

1. Creating one or very few large **Bounded Contexts** which encapsulate many **Entities**.
2. Creating lots of tiny **Bounded Contexts** which each encapsulate one or very few **Entities**.

The sweet spot is probably going to be somewhere in-between these extremes.

## All models are wrong

"All models are wrong, but some are useful" is a common statistics aphorism which applies here too.

There are many ways to model the same problem space but some are better than others. Choice of **Entities** and **Bounded Contexts** are probably the two largest factors differentiating a useful model from a non-useful one. But it takes time and practice to master the art of "domain modelling".

THe chances are you've managed to create a useful model of the problem space which will work for now, but it might start to crumble down the line as business requirements change or you realise you've missed an important concept. Embracing that models will likely need to adapt over time as you discover more about the domain will set you up for success much more than striving to find the "perfect" model ever will.

## Example Solutions

Example solutions, which we'll use for the coming sections of the workshop, can be found in **SOLUTIONS.md** on this branch.

## Next Up

That's us finished with the EventStorming section. Next up, [Entities](https://github.com/PensionBee/ddd-workshop/tree/03-entities)
