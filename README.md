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

A command handler is a function which processes a specific command. There's no single definition of what a command handler is but, for this workshop, let's say that all command handlers must do the following:

1. Validate the incoming command data
2. Use the command data to fetch relevant system 'state', i.e. existing entities necessary to process the command
3. Use the command data and fetched state to 'derive an outcome'
4. For 'success outcomes', update the state of the system

Note that an 'outcome' can be one of 3 categories:

- An event (captures a successful change in the system)
- An error (a business rule error - not a technical error)
- A no-op (stands for "no operation" - nothing about the system needs to change)

You could also argue that all outcomes are just events (just not always successful ones) that fall into the following categories:

- A success event
- An error event
- A no-op event

Use whatever one helps you reason about the concept best.

Let's visualise this four step process with an example:

```ts
// A zod schema describing the expected command data
const commandDataSchema = z.object({
  ...
})

// A command handler which processes the 'pay invoice' command
const handlePayInvoice = async (commandData: Record<string, unknown>) => {
  // STEP 1: Validate the incoming command data
  const data = commandDataSchema.parse(commandData)

  // STEP 2: Use the command data to fetch relevant system 'state', i.e. existing entities necessary to process the command
  const state = {
    invoice: await invoiceRepository.findById(data.invoiceId),
  }

  // STEP 3: Use the command data and fetched state to 'derive an outcome'
  // 'deriveOutcome' contains all the business logic in one place - we'll dive into this below.
  const outcome = deriveOutcome(data, state)

  // STEP 4: For 'success outcomes', update the state of the system
  switch (outcome.type) {
    case 'INVOICE_PAYMENT_PENDING':
      await basketRepository.save({
        ...state.invoice, // The existing invoice
        status: outcome.payload.status, // Probably something like "Payment Pending"
      })
      break
  }

  return outcome
}
```

That's a lot to unpack but it will make more sense once you've gone through 'The Practical Bit' below.

Before we get to that though, let's dig into outcomes (events) and derivers a little more...

### Outcomes (Events)

Outcomes (events) capture information about state changes in our system as well as information about change attempts which failed or didn't actually require any system changes.

Let's generalise an outcome structure to be:

```ts
type Outcome = {
  type: Uppercase<string>, // Specific outcome identifier
  payload: Record<string, unknown> // Important data related to the outcome
}
```

Here's an example of a success outcome:

```ts
type InvoicePaymentPendingEvent = {
  type: "INVOICE_PAYMENT_PENDING",
  payload: {
    invoiceId: string,
    status: "Payment Pending",
    paymentAmount: number,
  }
}
```

Here's an example of an error outcome:

```ts
type InvoiceCoolOffError = {
  type: "PAY_INVOICE_FAILED/INVOICE_IN_COOL_OFF_PERIOD",
  payload: {
    invoiceId: string,
    hoursSinceIssued: number
  }
}
```

Here's an example of a no-op outcome:

```ts
type InvoiceAlreadyPaidNoOp = {
  type: "PAY_INVOICE_NO_OP/INVOICE_ALREADY_PAID",
  payload: {
    invoiceId: string,
  }
}
```

### Derivers

In step 3 of our command handling process, `Use the command data and fetched state to 'derive an outcome'`, we need to enforce all the business rules relevant to the command being handled, such as this one: `Invoices cannot be paid within a 'cool off' period; the first 48 hours after being issued`.

*Note: Business rules are where a large part of the *essential complexity* in software systems comes from, i.e. the stuff we can't easily simplify or improve (as opposed to *accidental complexity*, which you could argue is the same as technical debt).*

Derivers generally take data and state as arguments and return an outcome (an event, error or no-op). We can visualise this process like so:

![Deriver](./images/deriver.png)

Derivers can simply be functions which carry out a set of business logic checks one by one. If any check fails, the relevant error or no-op outcome is returned. If all checks pass, a success outcome is returned or additional business logic is checked to identify which of several success outcomes should be returned.

Here's an example deriver which we could use in the command handler code example above:

```ts
const derivePayInvoiceOutcome = (data, state) => {
  if (invoice.status === "Paid") {
    return {
      type: "PAY_INVOICE_NO_OP/INVOICE_ALREADY_PAID",
      payload: {
        invoiceId: state.invoice.id
      }
    }
  }

  const now = new Date()
  const hoursSinceIssued = getDifferenceInHours(state.invoice.issuedAt, now)
  if (hoursSinceIssued < 48) {
    return {
      type: "PAY_INVOICE_FAILED/INVOICE_IN_COOL_OFF_PERIOD",
      payload: {
        invoiceId: state.invoice.id,
        hoursSinceIssued
      }
    }
  }

  // Other business rule checks go here

  return {
    type: 'INVOICE_PAYMENT_PENDING',
    payload: {
      invoiceId: state.invoice.id,
      status: "Payment Pending",
      paymentAmount: state.data.paymentAmount
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

### Part 1: Creating a Post

In **src/contexts/posts/core/commands/createPost.handler**:

- Step 1: Validate the incoming command data:
  - Complete the `commandDataSchema` using zod - think about what data is necessary for posting a comment. *Hint: It will likely be similar to the `postSchema` we defined previously. This won't always be the case though.*
- Step 2: Use the command data to fetch relevant system 'state':
  - Update the `State` type - define the entities, if any, which are required to process this command.
  - Update the `fetchState` function - use the repositories we built previously to fetch the state we need to properly process this command.
- Step 3: Use the command data and fetched state to 'derive an outcome':
  - Update the `Outcome` type - define the possible outcomes using the structure outlined above.
  - Update the `deriveOutcome` function - create and return the necessary outcome(s) for this command, using the format defined above. *Hint: Since the payload for an event outcome is intended to capture the state change in the system, we need to generate IDs as part of the payload for any new entities we create. Feel free to use Math.random() or any other mechanism to achieve this, but remember our entity IDs have restrictions on what they start with.*
- Step 4: For 'success outcomes', update the state of the system:
  - Update the `updateState` function - complete the switch statement, creating/modifying and persisting entities via repositories for any successful outcome.

Finally, let's write some tests for this command handler. This might seem a bit daunting at first but we've actually just made testing at a feature level pretty simple by creating a standalone function, `handleCreatePost`, which is independent of any infrastructure or API concerns and fully encapsulates a single, logical, manageable change within our system, including all the business rules we should be testing.

- In **src/contexts/posts/core/commandHandlers/createPost.handler.spec.ts**:
  - Write tests using the 'Arrange - Act - Assert' testing approach:
    - Arrange: Set up the initial state (if any) required for the test using the in-memory repositories we built previously.
    - Act: Trigger `handleCreatePost` with the relevant command data.
    - Assert:
      - Check that the command handler outcome is as expected.
      - Check that entities were correctly persisted or not persisted, depending on the test.

### Part 2: Commenting on a Post

Repeat the above steps but for the `Comment on Post` command. You'll need to create the following files:

- **src/contexts/posts/core/commandHandlers/CommentOnPost.handler.ts**:
- **src/contexts/posts/core/commandHandlers/CommentOnPost.handler.spec.ts**:

### Part 3: Following an Account + Test-Driven Development (TDD)

Repeat the above steps but for the `Follow Account` command but this time let's incorporate Test-Driven Development (TDD) principles into our workflow, by flipping the process on it's head and writing our tests ***before*** we write the code. You'll need to create the following files:

- **src/contexts/posts/core/commandHandlers/followAccount.handler.spec.ts**:
- **src/contexts/posts/core/commandHandlers/followAccount.handler.ts**:

## Questions Worth Pondering

- Which kind of tests (unit, integration, e2e, regression, acceptance, etc.) are command handler tests?
- How can we write command handler tests efficiently?
- What value do we get from writing command handler tests?
