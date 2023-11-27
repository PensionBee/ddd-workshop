# Command Handlers & Derivers

[Back to the workshop overview](https://github.com/PensionBee/ddd-workshop#ddd-workshop-overview)

## Context

In the [EventStorming](https://github.com/PensionBee/ddd-workshop/tree/eventstorming) section of the workshop, we used events, commands and entities to design a solution for the problems our business is currently focused on...

![EventStorming Timeline with Bounded Contexts](./images/eventstorming-timeline-with-bounded-contexts.png)

In this section, we're going translate our command and event blocks into code...

### Command Payloads

When we were EventStorming, we described commands as an intent to change the state of our system. Let's complete the picture here and acknowledge that most commands will also require a payload (a fancy word for data) to be meaningful. For example:

```ts
// An arbitrary representation of a command

type SettleInvoiceCommand = {
  type: "SETTLE_INVOICE",
  payload: {
    invoiceId: string,
    paymentDetails: string
  }
}
```

### Command Handlers

A command handler is simply a function or method which carries out the work associated with a command. command handlers primarily operate on a single entity, resulting in an event (if everything goes according to plan).

For this section of the workshop we'll define a command handler as a function which carries out the following 4 steps:

1. Validate the command data
2. Use the command data to fetch entities required to make the change from persistence (going forward, let's refer to everything fetched via a repository as 'state')
3. Using the command data and state, derive an 'outcome'
4. Depending on the outcome, update the state of the system

Note that an outcome can be one of 3 things:

- An event (processing the command was successful - these are the orange blocks on our EventStorming diagram)
- An error (processing the command was unsuccessful)
- A No-Op (processing the command was ??? - nothing needs to change about our system)

As an alternative visualisation of the above 4 step process, let's check out the following pseudocode:

```ts
const handleSettleInvoice = (unvalidatedData: Record<string, unknown>) => {
  const data = ... // Do some validation on unvalidatedData

  const state = ... // Fetch necessary entities via repositories. In this case we'll likely fetch the specific 'Invoice' entity but we might need others too

  const outcome = ... // Check some business rules and generate an event outcome, error outcome or no-op outcome

  // Update state on a successful/event outcome
  switch (outcome.type) {
    case 'INVOICE_SETTLED':
      // Update and persist our Invoice entity
  }
}
```

That's a lot to unpack but it will make more sense once you've gone through 'The Practical Bit' below.

Before we get to that though, let's talk about derivers...

### Derivers

Of the 4 steps highlighted above, the one that ***really*** matters is step 3 - the 'derive outcome' step. In this step, we want to enforce all the business rules that apply to a given command, such as `Invoices cannot be paid with the first 5 days of being issued`. This is where a large part of the *essential complexity* in our code comes from (as opposed to *accidental complexity*) so it can be useful to centralise it as an independent function - a deriver function.

In general, derivers simply take data and state as arguments and return an outcome.

Before we move on, let's cover the format of an outcome, which might help clarify this concept. To keep things consistent, let's assume our deriver will return an outcome matching the following structure:

```ts
type Outcome = {
  type: Uppercase<string> | `ERROR/${Uppercase<string>}` | `NO_OP/${Uppercase<string>}`,
  payload: Record<string, unknown>
}
```

An event outcome might look like this:

```ts
type EventOutcome = {
  type: 'INVOICE_SETTLED',
  payload: {
    invoiceId: string,
    invoiceStatus: 'SETTLED'
  } // Event Outcome payloads contain all relevant information about the state change in our system
}
```

An error outcome might look like this:

```ts
type ErrorOutcome = {
  type: 'ERROR/CANNOT_SETTLE_INVOICE',
  payload: {
    invoiceId: string,
    reason: 'Invoices cannot be paid with the first 5 days of being issued'
  } // Error Outcome payloads contain relevant information related to the error
}
```

An no-op outcome might look like this:

```ts
type NoOpOutcome = {
  type: 'NO_OP/INVOICE_ALREADY_PAID',
  payload: {
    invoiceId: string,
  } // No-Op Outcome payloads contain basic information related to the no-op
}
```

## Resources

Feel free to check these out now or after completing 'The Practical Bit' below.

- [Functional Domain Driven Design: Simplified (15 minute read)](https://antman-does-software.com/functional-domain-driven-design-simplified)
- [Functional Event Sourcing Decider (15 minute read)](https://thinkbeforecoding.com/post/2021/12/17/functional-event-sourcing-decider) (this one get's pretty gnarly in the second half)

## The Practical Bit

*Note: each section of the workshop builds upon the previous one. You can check your solutions against the code found in the following section.*

### Part 1: Validating Data

- In **src/contexts/posts/core/commands/createPost.handler**:
  - Complete the zod schema assigned to the `dataSchema` variable - think about what data is necessary for posting a comment. *Hint: it will likely be similar to the `postSchema` we defined previously.*
  - In the `handleCreatePost` function, validate the incoming data using the schema and assign the result to the `data` variable.

### Part 2: Fetching State

- In **src/contexts/posts/core/commands/createPost.handler**:
  - Use the repositories we built previously to fetch the state we need to properly process this command.

### Part 3: Deriving an Outcome

- In **src/contexts/posts/core/commands/createPost.handler.ts**:
  - Update the argument types in the `deriveOutcome` function to match the data and state we need in order to derive an outcome.
  - Create and return the necessary outcome(s) for this command, using the format defined above. *Hint: Since the payload for an event outcome is intended to capture the state change in the system, we need to generate IDs as part of the payload for any new entities we create.*

### Part 4: Updating State

- In **src/contexts/posts/core/commands/createPost.handler.ts**:
  - Complete the switch statement in the `handleCreatePost` function, creating/modifying and persisting entities via repositories for any event outcomes.
  - Return the outcome from the handler so it can be used in our tests and by calling code in later sections of the workshop.

### Part 5: Testing command handlers

In general, writing great tests is a challenge for many developers and teams. However, we've just made it a lot easier by creating a standalone function, `handleCreatePost`, which independent of any API concerns and fully encapsulates a single, logical, scoped change within our system, including all the business rules we should be testing.

- In **src/contexts/posts/core/commands/createPost.handler.spec.ts**:
  - Write tests using the 'Arrange - Act - Assert' testing approach:
    - Arrange: Set up the initial state (if any) required for the test using the available repositories.
    - Act: Trigger `handleCreatePost` with some relevant data.
    - Assert:
      - Check that the command handler outcome is as expected.
      - Check that entities were correctly persisted or not persisted, depending on the test.

That's it! Theoretically, at this point, we could get rid of our `parsePost` tests and `postsRepository` tests and still have high confidence that the core functionality of our system works.

Actually, let's be empowered and go ahead and do it since we hardly ever get to delete tests in real projects...

- Delete **src/contexts/accounts/core/entities/account.spec.ts** and **src/contexts/posts/core/entities/post.spec.ts**

*Caveat: There are (probably a lot of) times when you want the confidence you get from having these extra, low-level tests. The thing to take away from this is that some tests ARE more valuable than others and focusing on the high value ones is a better use of your time than the low value ones.*

### Part 6: Repeat

This can be a lot to take in so let's go through the process again, this time with the `Create Post Comment` command. We're going to revisit these a few more times in later sections of the workshop so it's worth becoming familiar with how they work.

- In **src/contexts/posts/core/commands/CommentOnPost.handler.ts**:
  - Repeat steps 1 to 4, this time starting with step 3.
- In **src/contexts/posts/core/commands/CommentOnPost.handler.spec.ts**:
  - Repeat step 5.

### Part 7: Repeat w/ TDD

Let's incorporate Test-Driven Development (TDD) into our workflow, by flipping the process on it's head and writing our tests before we write the code. This time we'll focus on the `Follow Account` command.

- In **src/contexts/accounts/core/commands/followAccount.handler.spec.ts**:
  - Repeat step 5. (Your tests should all be failing because we haven't written the code yet)
- In **src/contexts/accounts/core/commands/followAccount.handler.ts**:
  - Repeat steps 1 to 4.

## Questions Worth Pondering

- ?
