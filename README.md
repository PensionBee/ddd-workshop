# Command Handlers & Derivers

[Back to the workshop overview](https://github.com/PensionBee/ddd-workshop#ddd-workshop-overview)

## Context

In the [EventStorming](https://github.com/PensionBee/ddd-workshop/tree/eventstorming) section of the workshop, we used **Events**, **Commands** and **Entities** to design a solution for the problems our business is currently focused on.

![EventStorming Diagram](./images/event-storming-solution.png)

In this section, we're going translate this solution into code...

### Commands... With Payloads

When we were **EventStorming**, we described **Commands** as an intent to change the state of our system. Let's complete the picture here and acknowledge that most **Commands** will also require a payload (a fancy word for data) to be meaningful. For example:

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

A **Command Handler** is simply a function or method which processes a specific **Command**. **Command Handlers** primarily operate on a single **Entity**, resulting in an **Event** (or an error, or a no-op, which we'll see below).

For this section of the workshop we'll define a **Command Handler** as a function which performs the following 4 steps:

1. Validate the **Command Data**
2. Use the **Command Data** to fetch any **Entities** from persistence required to make the change in our system - going forward, let's refer to everything fetched from the existing system as **State** for convenience
3. Using the **Command Data** and **State**, derive an **Outcome** (an **Event**, an error or a no-op)
4. If the **Outcome** is an **Event**, update the state of the system

As an alternative visualisation of this process, check out the following example function:

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

Before we get to that though, let's talk about **Derivers**...

### Derivers

Of the 4 steps highlighted above, the one that ***really*** matters is step 3 - the 'derive outcome' step. In this step, we want to enforce all the business rules that apply to a given **Command**, such as `Invoices cannot be paid with the first 5 days of being issued`. This is where a large part of the *essential complexity* in our code comes from (as opposed to *accidental complexity*) so it can be useful to centralise it as an independent function - a **Deriver** function.

In general, **Derivers** simply take **Data** and **State** as arguments and return an **Outcome**.

Before we move on, let's quickly touch on the format of an **Outcome**, which might help clarify this concept. To keep things consistent, let's assume our **Deriver** will return an **Outcome** matching the following structure:

```ts
type Outcome = {
  type: Uppercase<string> | `ERROR/${Uppercase<string>}` | `NO_OP/${Uppercase<string>}`,
  payload: Record<string, unknown>
}
```

An **Event Outcome** might look like this:

```ts
type EventOutcome = {
  type: 'INVOICE_SETTLED',
  payload: {
    invoiceId: string,
    invoiceStatus: 'SETTLED'
  } // Event Outcome payloads contain all relevant information about the state change in our system
}
```

An error **Outcome** might look like this:

```ts
type ErrorOutcome = {
  type: 'ERROR/CANNOT_SETTLE_INVOICE',
  payload: {
    invoiceId: string,
    reason: 'Invoices cannot be paid with the first 5 days of being issued'
  } // Error Outcome payloads contain relevant information related to the error
}
```

An no-op **Outcome** might look like this:

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
  - Use the repositories we built previously to fetch the **State** we need to properly process this command.

### Part 3: Deriving an Outcome

- In **src/contexts/posts/core/commands/createPost.handler.ts**:
  - Update the argument types in the `deriveOutcome` function to match the **Data** and **State** we need in order to derive an **Outcome**.
  - Create and return the necessary **Outcome(s)** for this **Command**, using the format defined above. *Hint: Since the payload for an **Event Outcome** is intended to capture the state change in the system, we need to generate IDs as part of the payload for any new **Entities** we create.*

### Part 4: Updating State

- In **src/contexts/posts/core/commands/createPost.handler.ts**:
  - Complete the switch statement in the `handleCreatePost` function, creating/modifying and persisting **Entities** via **Repositories** for any **Event Outcomes**.
  - Return the **Outcome** from the handler so it can be used in our tests and by calling code in later sections of the workshop.

### Part 5: Testing **Command Handlers**

In general, writing great tests is a challenge for many developers and teams. However, we've just made it a lot easier by creating a standalone function, `handleCreatePost`, which independent of any API concerns and fully encapsulates a single, logical, scoped change within our system, including all the business rules we should be testing.

- In **src/contexts/posts/core/commands/createPost.handler.spec.ts**:
  - Write tests using the 'Arrange - Act - Assert' testing approach:
    - Arrange: Set up the initial **State** (if any) required for the test using the available **Repositories**.
    - Act: Trigger `handleCreatePost` with some relevant data.
    - Assert:
      - Check that the **Command Handler** outcome is as expected.
      - Check that **Entities** were correctly persisted or not persisted, depending on the test.

That's it! Theoretically, at this point, we could get rid of our `parsePost` tests and `postsRepository` tests and still have high confidence that the core functionality of our system works.

Actually, let's be empowered and go ahead and do it since we hardly ever get to delete tests in real projects...

- Delete **src/contexts/accounts/core/entities/account.spec.ts** and **src/contexts/posts/core/entities/post.spec.ts**

*Caveat: There are (probably a lot of) times when you want the confidence you get from having these extra, low-level tests. The thing to take away from this is that some tests ARE more valuable than others and focusing on the high value ones is a better use of your time than the low value ones.*

### Part 6: Repeat

This can be a lot to take in so let's go through the process again, this time with the `Create Post Comment` **Command**. We're going to revisit these a few more times in later sections of the workshop so it's worth becoming familiar with how they work.

- In **src/contexts/posts/core/commands/CommentOnPost.handler.ts**:
  - Repeat steps 1 to 4 above, this time starting with step 3.
- In **src/contexts/posts/core/commands/CommentOnPost.handler.spec.ts**:
  - Repeat step 5 above.

### Part 7: Repeat w/ TDD

We've saved the best for last - incorporating Test-Driven Development (TDD) into our workflow. Let's flip the process on it's head and write our tests before we write the code, this time for the `Follow Account` command.

- In **src/contexts/accounts/core/commands/followAccount.handler.spec.ts**:
  - Repeat step 5. (You'll get a bunch of errors and test failures at this point)
- In **src/contexts/accounts/core/commands/followAccount.handler.ts**:
  - Repeat steps 1 to 4 above.

## Questions Worth Pondering

- ?
