# Command Handlers & Derivers

[Back to the workshop overview](https://github.com/PensionBee/ddd-workshop#ddd-workshop-overview)

## Context

In the [EventStorming](https://github.com/PensionBee/ddd-workshop/tree/eventstorming) section of the workshop, we used events, commands and entities to design a solution for the problems our business is currently focused on...

![EventStorming Timeline with Bounded Contexts](./images/eventstorming-timeline-with-bounded-contexts.png)

We've already modelled our entities as code in the [Values, Entities & Parsers](https://github.com/PensionBee/ddd-workshop/tree/values-entities-and-parsers) section and built a mechanism for fetching and persisting entities in the [Repositories & Persistence](https://github.com/PensionBee/ddd-workshop/tree/values-entities-and-parsers) section. In this section, we're going turn our command and event blocks into code...

### Command Payloads

We've already identifies commands as an intent to change the state of our system but let's complete the picture by acknowledging that most commands are only meaningful when there's some relevant data attached (often referred to as a 'payload'). For example:

```ts
type InitiateInvoicePaymentCommand = {
  type: "INITIATE_INVOICE_PAYMENT",
  payload: {
    invoiceId: string,
    amountUSD: number,
    paymentCurrency: "GBP" | "EUR" | "USD",
    paymentCardId: string
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
    invoice: await invoiceRepository.findById(data.invoiceId), // Returns an invoice or null
    paymentCard: await paymentCardRepository.findById(data.paymentCardId) // Returns a payment card or null
  }
  
  // Throw if state is invalid.
  if (!state.invoice) {
    throw new Error("Invoice not found")
  }
  if (!state.paymentCard) {
    throw new Error("Payment card not found")
  }

  // STEP 3: Use the command data and fetched state to 'derive an outcome'
  // 'deriveOutcome' contains all the business logic in one place - we'll dive into this below.
  const outcome = deriveOutcome(data, state)

  // STEP 4: For 'success outcomes', update the state of the system
  switch (outcome.type) {
    case 'INVOICE_PAYMENT_INITIATED':
      await invoiceRepository.save({
        ...state.invoice, // Spread the existing invoice
        status: outcome.payload.status, // Update the status using the outcome payload, e.g. "Awaiting Payment Completion"
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
  type: Uppercase<string>, // The specific outcome identifier
  payload: Record<string, unknown> // Important data related to the outcome
}
```

Here's an example of a success outcome:

```ts
type InvoicePaymentPendingEvent = {
  type: "INVOICE_PAYMENT_INITIATED",
  payload: {
    invoiceId: string,
    status: "Awaiting Payment Completion",
    amountUSD: number,
    paymentCurrency: "GBP" | "EUR" | "USD",
    paymentCardId: string
  }
}
```

Here's an example of an error outcome:

```ts
type InvoiceCoolOffError = {
  type: "INITIATE_INVOICE_PAYMENT_FAILED/INVOICE_IN_COOL_OFF_PERIOD",
  payload: {
    invoiceId: string,
    hoursUntilCoolOffPeriodEnds: number
  }
}
```

Here's an example of a no-op outcome:

```ts
type InvoiceAlreadyPaidNoOp = {
  type: "INITIATE_INVOICE_PAYMENT_NO_OP/INVOICE_ALREADY_PAID",
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
      type: "INITIATE_INVOICE_PAYMENT_NO_OP/INVOICE_ALREADY_PAID",
      payload: {
        invoiceId: state.invoice.id
      }
    }
  }

  const now = new Date()
  const hoursSinceIssued = getDifferenceInHours(state.invoice.issuedAt, now)
  if (hoursSinceIssued < 48) {
    return {
      type: "INITIATE_INVOICE_PAYMENT_FAILED/INVOICE_IN_COOL_OFF_PERIOD",
      payload: {
        invoiceId: state.invoice.id,
        hoursUntilCoolOffPeriodEnds: 48 - hoursSinceIssued
      }
    }
  }

  // Other business rule checks go here

  return {
    type: 'INVOICE_PAYMENT_INITIATED',
    payload: {
      invoiceId: state.invoice.id,
      status: "Awaiting Payment Completion",
      amountUSD: data.amountUSD,
      paymentCurrency: data.paymentCurrency
      paymentCardId: state.paymentCard.id
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

*For now, let's only focus on success outcomes to get used to the general pattern, i.e. assume `Post Created` is the only possible outcome.*

In **src/contexts/posts/core/commands/createPost.handler.ts**:

**Step 1: Validate the incoming command data:**

- Complete the `commandDataSchema` using zod.
  - *Hint: think about what data is necessary for creating a post.*
  - *Hint: It will likely be similar to the `postSchema` we defined previously. This won't always be the case though, especially when a command operates on an existing entity.*

**Step 2: Use the command data to fetch relevant system 'state':**

- Complete the `State` type, defining the entities, if any, which are required to process this command.
  - *Hint: Do we need to make sure the `Account` entity exists before we create a post?*
- Complete the `fetchState` function, using the repositories we built previously to fetch the state we need.

**Step 3: Use the command data and fetched state to 'derive an outcome':**

- Complete the `Outcome` type, defining the possible outcomes using the structure outlined above.
  - *Hint: Remember, for now, we only care about the `Post Created` outcome.*
- Complete the `deriveOutcome` function, generating and return the possible outcomes.
  - *Hint: Since the payload for a successful outcome needs to capture the state change in the system, we'll likely need to generate a IDs in our deriver when new entities are created (unless you force calling code to provide the ID as part of the command data). In a production system, you'd probably want to use something like UUIDs or Nano IDs to create IDs but feel free to use something like `Math.random()` for now.*

**Step 4: For 'success outcomes', update the state of the system:**

- Complete the `updateState` function - complete the switch statement, creating/modifying and persisting entities via repositories for any successful outcome.

Finally, let's write some tests for this command handler. This might seem a bit daunting at first but we've actually just made testing at a feature level pretty simple by creating a standalone function, which is independent of any infrastructure or API concerns and fully encapsulates a atomic change within our system, including all the relevant business rules for that change.

In **src/contexts/posts/core/commandHandlers/createPost.handler.spec.ts**, let's use the 'Arrange - Act - Assert' testing approach:

- (ARRANGE) Set up the initial state by adding an account to the in-memory account store via the `accountRepository.save` method.
- (ACT) Trigger `handleCreatePost` with the relevant command data
  - *Hint: the account ID should be the ID of the account we just created.*
- (ASSERT) Check that the command handler outcome type is `Post Created` and the payload is as expected
- (ASSERT) Check that a `Post` entity was correctly persisted
  - *Hint: You can use the `postRepository.getById` method*

### Part 2: Commenting on a Post

*Again, let's only focus on success outcomes to reinforce the pattern, i.e. assume `Comment Added to Post` is the only outcome.*

In **src/contexts/posts/core/commandHandlers/CommentOnPost.handler.ts**:

**Step 1: Validate the incoming command data:**

- Complete the `commandDataSchema` using zod.

**Step 2: Use the command data to fetch relevant system 'state':**

- Complete the `State` type.
- Complete the `fetchState` function.

**Step 3: Use the command data and fetched state to 'derive an outcome':**

- Complete the `Outcome` type.
- Complete the `deriveOutcome` function.

**Step 4: For 'success outcomes', update the state of the system:**

- Complete the `updateState` function

In **src/contexts/posts/core/commandHandlers/CommentOnPost.handler.spec.ts**, let's use the 'Arrange - Act - Assert' testing approach:

- (ARRANGE) Set up the initial state.
- (ACT) Trigger `handleCommentOnPost` with the relevant command data
- (ASSERT) Check that the command handler outcome type is as expected
- (ASSERT) Check that relevant entities were correctly persisted

### Part 3: Following an Account

Just as you're about to start writing the `Follow Account` handler, the CEO pulls you aside...

> Hey, I was just thinking that my mum might try to follow my account after we get the MVP out there. I love her and all but I just can't have her all up in my social media business, you know? Anyway, if we can stop accounts from following accounts that have blocked them, that would be great.

We also have an explicit business rule, `Account A can't follow Account B if Account B has blocked Account A`

In **src/contexts/accounts/core/entities/account.ts**:

- Add a `blockedAccounts` attribute.
  - *Hint: Feel free to use an array of account IDs rather than a dedicated `Blocked Account` entity. This way our design stays simple until we know we need the extra complexity.*

In **src/contexts/accounts/core/commands/followAccount.handler.ts**:

**Step 1: Validate the incoming command data:**

- Complete the `commandDataSchema` using zod.

**Step 2: Use the command data to fetch relevant system 'state':**

- Complete the `State` type.
- Complete the `fetchState` function.

**Step 3: Use the command data and fetched state to 'derive an outcome':**

- Complete the `Outcome` type.
- Complete the `deriveOutcome` function.

**Step 4: For 'success outcomes', update the state of the system:**

- Complete the `updateState` function

In **src/contexts/accounts/core/commandHandlers/followAccount.handler.spec.ts**, let's use the 'Arrange - Act - Assert' testing approach. For each test:

- (ARRANGE) Set up initial state relevant to the test.
- (ACT) Trigger `handleFollowAccount` with relevant command data
- (ASSERT) Check that the command handler outcome is as expected
- (ASSERT) Check that entities were correctly persisted or not persisted, depending on the test

## Questions Worth Pondering

- Which kind of tests (unit, integration, e2e, regression, acceptance, etc.) are command handler tests?
- What value do we get from writing command handler tests?
- What kind of things do we NOT want to test in command handler tests? Why?
