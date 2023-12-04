# Command Handlers & Derivers

[Back to the workshop overview](https://github.com/PensionBee/ddd-workshop#ddd-workshop-overview)

## Context

In the [EventStorming](https://github.com/PensionBee/ddd-workshop/tree/eventstorming) section of the workshop, we used events, commands and entities to design a solution for the problems our business is currently focused on...

![EventStorming Timeline with Bounded Contexts](./images/eventstorming-timeline-with-bounded-contexts.png)

We've already modelled our entities as code in the [Values, Entities & Parsers](https://github.com/PensionBee/ddd-workshop/tree/values-entities-and-parsers) section and built a mechanism for fetching and persisting entities in the [Repositories & Persistence](https://github.com/PensionBee/ddd-workshop/tree/values-entities-and-parsers) section. In this section, we're going turn our command and event blocks into code...

### Command Payloads

We've already identifies commands as an intent to change the state of our system but let's complete the picture by acknowledging that most commands are only meaningful when there's some relevant data attached (often referred to as a 'payload'). For example:

```ts
type PayInvoiceCommand = {
  type: "PAY_INVOICE",
  payload: {
    invoiceId: string,
    paymentCurrency: "GBP" | "EUR" | "USD",
    amount: string,
    paymentDetails: {
      accountNumber: number,
      sortCode: number,
    }
  }
}
```

Without the payload, this command would be meaningless to our system.

### Command Handlers

A command handler is a function (or class if you're working in OOP-land) which processes a specific command. There are many ways we could generalise a command handler but for this workshop, let's say that all command handlers must do the following:

1. Validate the incoming command data
2. Use the command data to fetch relevant system 'state', i.e. existing entities and data necessary to process the command
3. Use the command data and fetched state to 'derive an outcome'
4. For 'success outcomes', update the state of the system

Note that an 'outcome' can be one of 3 categories:

- An event (captures a successful change in the system)
- An error (a business error - not a technical error)
- A no-op (stands for "no operation" - nothing about the system needs to change)

You could also argue that all outcomes are just events (just not always successful ones) that fall into the following categories:

- A success event
- An error event
- A no-op event

But that's getting into details and potential conflict territory prematurely...

Let's take a step back and visualise this four step process with an example:

```ts
// A zod schema describing the expected command data
const commandDataSchema = z.object({
  ...
})

// A command handler which processes the 'pay invoice' command
const handlePayInvoice = async (commandData: Record<string, unknown>) => {
  // STEP 1: Validate the incoming command data
  const data = commandDataSchema.parse(commandData)

  // STEP 2: Use the command data to fetch relevant system 'state', i.e. existing entities and data necessary to process the command
  const state = {
    invoice: await invoiceRepository.findById(data.invoiceId),
  }

  // STEP 3: Use the command data and fetched state to 'derive an outcome'
  const outcome = deriveOutcome(data, state) // 'deriveOutcome' captures all the business logic in one place

  // STEP 4: For 'success outcomes', update the state of the system
  switch (outcome.type) {
    case 'INVOICE_PAID': // A success outcome: The full invoice balance was paid off
      await basketRepository.save({
        ...state.invoice, // The existing invoice
        status: outcome.payload.status, // Probably something like "Paid"
        remainingBalance: outcome.payload.remainingBalance, // Likely zero
      })
      break
    case 'INVOICE_PARTIALLY_PAID': // A success outcome: Some of the outstanding invoice balance was paid off
      await basketRepository.save({
        ...state.invoice, // The existing invoice
        status: outcome.payload.status, // Probably something like "Partially Paid"
        remainingBalance: outcome.payload.remainingBalance, // Likely non-zero
      })
      break
  }

  return outcome
}
```

That's a lot to unpack but it will make more sense once you've gone through 'The Practical Bit' below.

Before we get to that though, let's dig into derivers a little more...

### Derivers

In step 3 above, `Use the command data and state to 'derive an outcome'`, we want to enforce all the business rules relevant for the specific command being handled, such as `Invoices cannot be paid within a 'cool off' period (the first 48 hours after being issued)`.

This is where a large part of the *essential complexity* in our code comes from, i.e. the stuff we can't easily simplify or improve (as opposed to *accidental complexity*, which is essentially technical debt), so it can be useful to extract it to an independent function and let it grow organically over time as business rules change.

As we seen above, derivers generally take data and state as arguments and return an outcome (an event, error or no-op). We can visualise this process like so:

![Deriver](./images/deriver.png)

Let's look at one approach to modelling / structuring outcomes generally:

```ts
type Outcome = {
  type: Uppercase<string> | `ERROR/${Uppercase<string>}` | `NO_OP/${Uppercase<string>}`,
  payload: Record<string, unknown>
}
```

Here's are two examples of event outcomes:

```ts
type InvoicePaidEvent = {
  type: "INVOICE_PAID",
  payload: {
    invoiceId: string,
    remainingBalanceUSD: 0,
    status: "Pai"'
  } // Important data related to the event is captured in the payload
}
```

```ts
type InvoicePartiallyPaidEvent = {
  type: "INVOICE_PARTIALLY_PAID",
  payload: {
    invoiceId: string,
    remainingBalanceUSD: 34,
    status: "Partially Pai"'
  }  // Important data related to the event is captured in the payload
}
```

An error outcome might look like this:

```ts
type InvoiceInCoolOffPeriodError = {
  type: "ERROR/INVOICE_IN_COOL_OFF_PERIOD",
  payload: {
    invoiceId: string,
    daysRemaining: number
  }  // Important data related to the error is captured in the payload
}
```

An no-op outcome might look like this:

```ts
type InvoiceAlreadyPaidNoOp = {
  type: "NO_OP/INVOICE_ALREADY_PAID",
  payload: {
    invoiceId: string,
  }  // Important data related to the no-op is captured in the payload
}
```

Derivers can simply be functions which carry out a set of business logic checks. If any check fails, the relevant error or no-op outcome is returned. If all checks pass, additional business logic can be checked to identify which event outcome should be returned. Here's an example deriver which we could use in the command handler code example above.

```ts
const derivePayInvoiceOutcome = (data, state) => {
  const { amount, currency } = data
  const { invoice } = state

  if (invoice.status === "Paid") {
    return {
      type: "NO_OP/INVOICE_ALREADY_PAID",
      payload: {
        ...
      }
    }
  }

  const now = new Date()
  const hoursSinceIssued = getDifferenceInHours(invoice.issuedAt, now)
  if (hoursSinceIssued < 48) {
    return {
      type: "ERROR/INVOICE_IN_COOL_OFF_PERIOD",
      payload: {
        ...
      }
    }
  }

  const amountInUSD = convertCurrencyToUSD(amount, currency)
  if (amountInUSD < invoice.remainingBalanceUSD) {
    return {
      type: 'INVOICE_PARTIALLY_PAID',
      payload: {
        ...
      }
    }
  }

  return {
      type: 'INVOICE_PAID',
      payload: {
        ...
      }
    }
}
```

## Resources

Feel free to check these out before or after completing 'The Practical Bit' below.

- [Functional Domain Driven Design: Simplified (15 minute read - well worth the time!)](https://antman-does-software.com/functional-domain-driven-design-simplified)
- [Functional Event Sourcing Decider (15 minute read - get's gnarlier the further you read)](https://thinkbeforecoding.com/post/2021/12/17/functional-event-sourcing-decider)

## The Practical Bit

*Note: each section of the workshop builds upon the previous one. You can check your solutions against the code found in the next section.*

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

- What's the value of writing tests at this level?
- How would you describe the tests written at this level (unit, integration, e2e, regression, acceptance)?
- How could we write tests at this level, without actually interacting with any external infrastructure (DBs, APIs, etc.)?
