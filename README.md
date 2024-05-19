# Policies

[Back to the workshop overview](https://github.com/PensionBee/ddd-workshop#ddd-workshop-overview)

## Context

We now have the foundational building blocks to start moving into event-driven territory. Event-driven systems are exactly what you're imaginging right now! An **Event** occurs and, as a result, something happens. It's as simple as that (not to say that event-driven systems are simple - they generally carry a lot of technical complexity - but the principle is simple).

"But we don't have anything like that" you might say. And you'd be dead wrong if you did. The CEO shouts your name just as you're about to take a sip of coffee (it goes all down your white tee, of course).

> "That's my mum just off the phone telling me she thought my dinner last night looked great!", they yell.
>
> "Oh, what did you make?", you ask politely.
>
> "Lasagne, but that's not the point. The point is that I blocked her on Tuesday but she's still seeing my stuff."
>
> "Ohh, right. Whoops. Sorry..."

We've failed to account for the requirement that blocking an account should automatically remove that follower from your account. Let's rectify that. But not in the code, that'd be jumping the gun a little. Let's head back over to our EventStorming diagram to sanity check that what we're doing makes sense in the wider context. We might discover various different ways to approach this problem and we can do that 'cheaply' on our diagram.

Here's how it might look after adding in the new requirement:

![EventStorming Policies](./assets/eventstorming-policies.png)

Three things to note:

1. We have a new **Command** with two possible **Events** resulting from it
2. We've connected the `Account Blocked` **Event** to the `Remove Follower` **Command** with an arrow (use whatever color and style you like).
3. `Remove Follower` has no **Actor** associated with it. Since this is an automated process, no one has to explicitly take any actions.

Point 2 is what's known as a **Policy**. It's business logic in the form "if this then that" or "when this happens do that". In our case we have:

> When `Account Blocked` then `Remove Follower`

Easy peelers, right? Now we just have to turn it into code...

### Publish / Subscribe

Let's lean on a long standing pattern, the "Publish / Subscribe" pattern. The concept is pretty simple. Subscribers subscribe to **Events** they care about on a message bus. When an **Event** a subscriber cares about is published on the bus, the subscriber is notified and runs whatever code it needs to run.

Two functions, `publishEvent` and `subscribeToEvent` have been added in **src/shared/infra/pubSub.ts** to make it easy to use this pattern. It uses Node's built-in `EventEmitter` under the hood to hook things up. Go check it out if you're interested.

An additional step has also been added to each command handler. This step calls `publishEvent(event)` to push the **Event** returned from the deriver onto the "message bus".

## Additional Resources

- TODO: Add some resources

## The Practical Bit

Let's start out by adding our new command handler and the associated **Events**.

1. In **src/contexts/accounts/core/commandHandlers/removeFollower.handler.ts**, complete the command handler.
2. In **src/contexts/accounts/core/commandHandlers/removeFollower.handler.spec.ts**, complete the test suite.

Next, we need to set up the policy.

3. In **src/contexts/accounts/core/policies.ts**, update the three "update me" placeholders in the `subscribeToEvent` function call by **a)** passing in the `Account Blocked` **Event** type as the "type argument" in the angled brackets, **b)** modifying the `type` value to be the type (name) of the **Event** we're subscribing to, and **c)** updating the policy name to be representative of the action we're taking off the back of the account being blocked.
4. Next, complete the the event handler function by calling the `removeFollower` command handler we just set up. Note that we can access the payload of the **Event** we're subscribing to in order to achieve this.

That's it, we're pretty much done. Now all we'd need to do is call `setUpAccountPolicies` as part of this backend service's "bootstrap" code and our policy would be up and running as expected.

In fact, go ahead and add `setUpAccountPolicies()` near the top of **src/contexts/accounts/core/commandHandlers/blockAccount.handler.spec.ts** and run that test suite. You should see something in the terminal similar to this:

> REMOVE_FOLLOWER handler successfully handled BLOCK_ACCOUNT event

We now have enough knowledge to start building much more complex event-driven systems. This comes with a bunch of challenges in it's own right but that's simply the trade-off against being able to write highly atomic, testable command handlers (which one day might live in different microservices).

Remember though, you can explore a whole lot more in a much shorter time on an EventStorming diagram than you can in code. This holds true for event-driven systems as it does for simple systems with standalone functionality. Use it to your advantage.
