# Command Handlers & Derivers

[Back to the workshop overview](https://github.com/PensionBee/ddd-workshop#ddd-workshop-overview)

## Context

In the [EventStorming](https://github.com/PensionBee/ddd-workshop/tree/eventstorming) section of the workshop, we used events, commands and entities to design a solution for the problems our business is currently focused on...

![EventStorming Timeline with Bounded Contexts](./images/eventstorming-timeline-with-bounded-contexts.png)

We've already modelled our entities as code in the [Values, Entities & Parsers](https://github.com/PensionBee/ddd-workshop/tree/values-entities-and-parsers) section and built a mechanism for fetching and saving entities in the [Repositories & Persistence](https://github.com/PensionBee/ddd-workshop/tree/values-entities-and-parsers) section. In this section, we're going turn our command and event blocks into code via "Command Handlers".

### Command Payloads

We've already identified commands as an intent to change the state of our system but let's complete the picture by acknowledging that most commands are only meaningful when there's relevant data attached. For example:

```ts
type PayInvoiceCommand = {
  type: "PAY_INVOICE";
  data: {
    invoiceId: string;
    amountUSD: number;
    paymentCurrency: "GBP" | "EUR" | "USD";
    paymentCardId: string;
  };
};
```

Without this data (also known as a payload), the `PAY_INVOICE` command would be meaningless to our system.

### Command Handlers

A command handler is a function which processes one specific command (with its data). Command handlers are not a universal concept but for this workshop we're going to lean on the two articles referenced in the "Resources" section below. As a result, we're defining a command handler as a function which carries out the following steps:

1. Parse/validate incoming command data
2. Fetch relevant system 'state' (existing entities necessary to process the command)
3. 'Derive an event' (given command data and fetched state)
4. Update the state of the system (for success events)

NB: we're assuming 2 main categories of events:

- Success events (capture change in the system)
- Fail events (capture business rule violations; NOT technical errors)

Let's visualise this four step process with a JavaScript example:

```js
import z from "zod";

import { invoiceRepository } from "path/to/repositories/invoiceRepository.ts";
import { paymentCardRepository } from "path/to/repositories/paymentCardRepository.ts";
import { InvalidCommandStateError } from "path/to/errors.ts";


// COMMAND DATA SCHEMA
// -------------------

// Describes the expected command data (we're using zod here)
const commandDataSchema = z.object({
  invoiceId: z.string().startsWith("invoice-"), // e.g. 'invoice-abjskPG188Ddkd2'
  amountUSD: z.number().positive(),
  paymentCurrency: z.enum(["GBP", "EUR", "USD"]), // Must be one of these 3 values
  paymentCardId: z.string().startsWith("paymentCard-"), // e.g. 'paymentCard-18387stpPidDQ'
});

// DERIVER
// -------

const deriveEvent = (data, state) => {
  // We'll dive into this function a little later
};

// COMMAND HANDLER
// ---------------

// Processes the 'Pay Invoice' command
export const handlePayInvoice = async (commandData) => {
  // Step 1: Parse/validate incoming command data
  // --------------------------------------------
  const data = commandDataSchema.parse(commandData);

  // Step 2: Fetch relevant system 'state' (existing entities necessary to process the command)
  // ------------------------------------------------------------------------------------------
  const invoice = await invoiceRepository.findById(data.invoiceId); // Returns an invoice or null
  const paymentCard = await paymentCardRepository.findById(data.paymentCardId); // Returns a payment card or null

  // Throw an error if state doesn't meet basic requirements.
  if (!invoice) {
    throw new InvalidCommandStateError("Invoice not found");
  }
  if (!paymentCard) {
    throw new InvalidCommandStateError("Payment card not found");
  }

  const state = {
    invoice,
    paymentCard,
  };

  // Step 3: 'Derive an event' (given command data and fetched state)
  // ----------------------------------------------------------------------
  const event = deriveEvent(data, state); // We'll dive into this function a little later

  // Step 4: Update the state of the system (for success events)
  // -------------------------------------------------------------
  switch (event.type) {
    case "INVOICE_PAYMENT_INITIATED":
      await invoiceRepository.save({
        ...state.invoice,
        status: event.payload.status, // Update the status using the event payload, e.g. "Initiated"
      });
      break;
  }

  return event;
};
```

That's a lot to unpack but let's keep powering through for now. There's a more complete example a little further on.

### Events

Events capture information about state changes in our system or change attempts which failed due to business rule violations.

We can generalise an event like so:

```ts
type Event = {
  type: Uppercase<string>; // The 'name' of the event
  payload: Record<string, unknown>; // Essential data related to the event
};
```

This is what a success event might look like:

```ts
type InvoicePaymentInitiatedEvent = {
  type: "INVOICE_PAYMENT_INITIATED";
  payload: {
    invoiceId: string;
    status: "Initiated";
    amountUSD: number;
    paymentCurrency: "GBP" | "EUR" | "USD";
    paymentCardId: string;
  };
};
```

NB: We also have the option to couple event payloads to their corresponding entities, e.g. `invoiceId: Invoice['id']` or `amountUSD: Invoice['amount']`. Coupling isn't always a bad thing and that's true here where events are generally coupled to entities anyway. This approach just makes the relationship more explicit.

This is what a fail event might look like (here we're using a union to capture multiple possible fail events):

```ts
type InvoicePaymentFailedEvent =
  | {
      type: "INVOICE_PAYMENT_FAILED/INVOICE_ALREADY_PAID";
      payload: {
        invoiceId: string;
      };
    }
  | {
      type: "INVOICE_PAYMENT_FAILED/INVOICE_IN_COOL_OFF_PERIOD";
      payload: {
        invoiceId: string;
        hoursUntilCoolOffPeriodEnds: number;
      };
    };
```

### Derivers

Derivers are functions dedicated to handling the business rules governing our domain. For example: `Invoices cannot be paid within a 'cool off' period - currently the first 48 hours after being issued` (this is a fake business rule for illustration purposes only).

*NB: Business rules are where a large part of the *essential complexity* in software systems comes from, i.e. the stuff we can't easily simplify or improve because the world is inherently complex. This is in contrast to *accidental complexity* (i.e. tech debt), which arises from things like poor coding standards, insufficient QA, poor architecture patterns, a lack of problem/solution exploration or excessive time pressure.*

Derivers generally take data and state as arguments and return an event (a success event or a fail event). We can visualise this process like so:

![Deriver](./images/deriver.png)

Derivers are simple functions. They carry out business logic checks one by one and if any check fails, the relevant fail event is returned. If all checks pass, a success event is returned. Additional business logic checks may be required if there are several possible success event for a given command.

Here's an example deriver which we could call from the above command handler:

```js
import { getDifferenceInHours } from "path/to/timeUtils.ts";

const deriveEvent = (data, state) => {
  const { amountUSD, paymentCurrency } = data;
  const { invoice, paymentCard } = state;

  if (invoice.status === "Paid") {
    return {
      type: "INVOICE_PAYMENT_FAILED/INVOICE_ALREADY_PAID",
      payload: {
        invoiceId: invoice.id,
      },
    };
  }

  const now = new Date();
  const hoursSinceIssued = getDifferenceInHours(invoice.issuedAt, now);
  if (hoursSinceIssued < 48) {
    return {
      type: "INVOICE_PAYMENT_FAILED/INVOICE_IN_COOL_OFF_PERIOD",
      payload: {
        invoiceId: invoice.id,
        hoursUntilCoolOffPeriodEnds: 48 - hoursSinceIssued,
      },
    };
  }

  // Additional business rule checks go here...

  /**
   * NB: It's not unreasonable for a downstream process to be responsible for actually taking the payment.
   * As a result, we're using an "INVOICE_PAYMENT_INITIATED" success event here rather than an "INVOICE_PAID"
   * event. This leads us down the path towards event-driven systems, which we'll cover in a future session.
   */
  return {
    type: "INVOICE_PAYMENT_INITIATED",
    payload: {
      invoiceId: invoice.id,
      status: "Initiated",
      amountUSD: amountUSD,
      paymentCurrency: paymentCurrency,
      paymentCardId: paymentCard.id,
    },
  };
};

```

## TypeScriptification

Let's pull everything together into a single example using TypeScript:

```ts
import z from "zod";

import { type Invoice } from "path/to/entities/invoice.ts";
import { type PaymentCard } from "path/to/entities/paymentCard.ts";
import { invoiceRepository } from "path/to/repositories/invoiceRepository.ts";
import { paymentCardRepository } from "path/to/repositories/paymentCardRepository.ts";
import { InvalidCommandStateError } from "path/to/errors.ts";
import { getDifferenceInHours } from "path/to/timeUtils.ts";

// TYPES
// -----

type Data = z.infer<typeof commandDataSchema>;
type State = {
  invoice: Invoice;
  paymentCard: PaymentCard;
};
type Event =
  | {
      type: "INVOICE_PAYMENT_INITIATED";
      payload: {
        invoiceId: string;
        status: "Initiated";
        amountUSD: number;
        paymentCurrency: "GBP" | "EUR" | "USD";
        paymentCardId: string;
      };
    }
  | {
      type: "INVOICE_PAYMENT_FAILED/INVOICE_ALREADY_PAID";
      payload: {
        invoiceId: string;
      };
    }
  | {
      type: "INVOICE_PAYMENT_FAILED/INVOICE_IN_COOL_OFF_PERIOD";
      payload: {
        invoiceId: string;
        hoursUntilCoolOffPeriodEnds: number;
      };
    };

// COMMAND DATA SCHEMA
// -------------------

// Describes the expected command data (we're using zod here)
const commandDataSchema = z.object({
  invoiceId: z.string().startsWith("invoice-"), // e.g. 'invoice-abjskPG188Ddkd2'
  amountUSD: z.number().positive(),
  paymentCurrency: z.enum(["GBP", "EUR", "USD"]), // Must be one of these 3 values
  paymentCardId: z.string().startsWith("paymentCard-"), // e.g. 'paymentCard-18387stpPidDQ'
});

// DERIVER
// -------

const deriveEvent = (data: Data, state: State): Event => {
  const { amountUSD, paymentCurrency } = data;
  const { invoice, paymentCard } = state;

  if (invoice.status === "Paid") {
    return {
      type: "INVOICE_PAYMENT_FAILED/INVOICE_ALREADY_PAID",
      payload: {
        invoiceId: invoice.id,
      },
    };
  }

  const now = new Date();
  const hoursSinceIssued = getDifferenceInHours(invoice.issuedAt, now);
  if (hoursSinceIssued < 48) {
    return {
      type: "INVOICE_PAYMENT_FAILED/INVOICE_IN_COOL_OFF_PERIOD",
      payload: {
        invoiceId: invoice.id,
        hoursUntilCoolOffPeriodEnds: 48 - hoursSinceIssued,
      },
    };
  }

  return {
    type: "INVOICE_PAYMENT_INITIATED",
    payload: {
      invoiceId: invoice.id,
      status: "Initiated",
      amountUSD: amountUSD,
      paymentCurrency: paymentCurrency,
      paymentCardId: paymentCard.id,
    },
  };
};

// COMMAND HANDLER
// ---------------

// Processes the 'Pay Invoice' command
export const handlePayInvoice = async (commandData: Data): Promise<Event> => {
  // Step 1: Parse/validate incoming command data
  // --------------------------------------------
  const data = commandDataSchema.parse(commandData);

  // Step 2: Fetch relevant system 'state' (existing entities necessary to process the command)
  // ------------------------------------------------------------------------------------------
  const invoice = await invoiceRepository.findById(data.invoiceId); // Returns an invoice or null
  const paymentCard = await paymentCardRepository.findById(data.paymentCardId); // Returns a payment card or null

  // Throw an error if state doesn't meet basic requirements.
  if (!invoice) {
    throw new InvalidCommandStateError("Invoice not found");
  }
  if (!paymentCard) {
    throw new InvalidCommandStateError("Payment card not found");
  }

  const state: State = {
    invoice,
    paymentCard,
  };

  // Step 3: 'Derive an event' (given command data and fetched state)
  // ----------------------------------------------------------------------
  const event = deriveEvent(data, state); // We'll dive into this function a little later

  // Step 4: Update the state of the system (for success events)
  // -------------------------------------------------------------
  switch (event.type) {
    case "INVOICE_PAYMENT_INITIATED":
      await invoiceRepository.save({
        ...state.invoice,
        status: event.payload.status, // Update the status using the event payload, e.g. "Initiated"
      });
      break;
  }

  return event;
};
```

Feel free to come back to this example as often as you need.

## Resources

Feel free to check these out before or after completing 'The Practical Bit' below.

- [Functional Domain Driven Design: Simplified (15 minute read - well worth the time!)](https://antman-does-software.com/functional-domain-driven-design-simplified)
- [Functional Event Sourcing Decider (15 minute read - get's gnarlier the further you read)](https://thinkbeforecoding.com/post/2021/12/17/functional-event-sourcing-decider)

## The Practical Bit

*Note: each section of the workshop builds upon the previous one. You can check your solutions against the code found in the next section.*

### Part 1: Creating a Post

For now, let's only focus on success events to get used to the general pattern, i.e. assume `Post Created` is the only possible event.

In **src/contexts/posts/core/commands/createPost.handler.ts**:

**Step 1: Validate the incoming command data...**

- Complete the `commandDataSchema` using zod.
  - *Hint: think about what data is necessary for creating a post.*
  - *Hint: It will likely be similar to the `postSchema` we defined previously. This won't always be the case though, especially when a command operates on an existing entity.*

**Step 2: Use the command data to fetch relevant system 'state'...**

- Complete the `State` type, defining the entities, if any, which are required to process this command.
  - *Hint: Do we need to make sure the `Account` entity exists before we create a post? i.e. is that something we expect to exist before we even process business rules.*
- Complete the `fetchState` function, using the repositories we built previously to fetch the state we need.

**Step 3: Use the command data and fetched state to 'derive an event'...**

- Complete the `Event` type, defining the possible events using the structure outlined above.
  - *Hint: Remember, for now, we only care about the `Post Created` event.*
- Complete the `deriveEvent` function, generating and return the possible events.
  - *Hint: Since the payload for a successful event needs to capture the state change in the system, we'll likely need to generate a IDs in our deriver when new entities are created (unless you force calling code to provide the ID as part of the command data). In a production system, you'd probably want to use something like UUIDs or Nano IDs but feel free to use something like `Math.random()` for ease here.*

**Step 4: For success events, update the state of the system...**

- Complete the `updateState` function - add a switch statement (or use 'if' logic), creating/modifying and persisting entities via repositories for any successful event.

**Step 5: Adding Tests...**

Finally, let's write some tests for this command handler. This might seem a bit daunting at first but we've actually made testing at a feature level pretty simple by creating a standalone function, independent of infrastructure and API concerns, which fully encapsulates an atomic change within our system, including all the relevant business rules associated with that change.

The first test (for the success event) has already been written, using the 'Arrange - Act - Assert' testing approach, to illustrate how you might test command handlers. Let's add additional tests for each possible event (there should be one tests per event in our spec file).

In **src/contexts/posts/core/commandHandlers/createPost.handler.spec.ts**, for each event:

- (ARRANGE) Set up the initial state by adding an account to the in-memory account store via the `accountRepository.save` method.
- (ACT) Trigger `handleCreatePost` with the relevant command data.
  - *Hint: the account ID should be the ID of the account we just created.*
- (ASSERT) Check that the command handler event and payload is as expected.
- (ASSERT) Check that a `Post` entity was correctly persisted.
    *Hint: There should be a test for each event and in some tests we may need to assert that entities were NOT persisted.*

### Part 2: Commenting on a Post

In **src/contexts/posts/core/commandHandlers/CommentOnPost.handler.ts**, complete the command handler functions like we did in part 1 (Again, let's only focus on success events to reinforce the general pattern, i.e. assume `Comment Added to Post` is the only event.)

In **src/contexts/posts/core/commandHandlers/CommentOnPost.handler.spec.ts**, complete the command handler tests like we did in part 1.

### Part 3: Following an Account

Just as you're about to start writing the `Follow Account` handler, the CEO pulls you aside...

> Hey, I was just thinking that my mum might try to follow my account after we get the MVP out there. I love her and all but I just can't have her all up in my social media business, you know? Anyway, if we can stop accounts from following accounts that have blocked them, that would be great.

We now have a new business rule we need to handle: `If Account A has blocked Account B, then Account B should not be able to follow Account A`.

An additional business rule usually results in an additional event that our deriver needs to handle. If we wanted, we could capture this on our EventStorming diagram. For example:

![EventStorming Timeline with Account Blocking](./images/eventstorming-timeline-with-account-blocking.png)

We can ignore the `Block Account` section of the diagram for now and focus only the `Follow Account` section. To do this though, we'll need to modify our `Account` entity to capture 'account blocking' information.

*note that we could choose to model 'account blocking' information as a separate entity - something descriptive like a `Blocked Account` entity could work. For now though, let's just add that information to the `Account` entity directly, similarly to how we added 'account following' information earlier in the workshop.*

In **src/contexts/accounts/core/entities/account.ts**:

- Add a `blockedAccounts` attribute.
  - *Hint: Feel free to use an array of account IDs rather than a dedicated `Blocked Account` entity. This way our design stays simple until we know we need the extra complexity.*

In **src/contexts/accounts/core/commands/followAccount.handler.ts**, complete the command handler functions like we did in parts 1 and 2

In **src/contexts/accounts/core/commandHandlers/followAccount.handler.spec.ts**, complete the command handler tests like we did in parts 1 and 2.

### Part 4: Blocking an Account

In **src/contexts/accounts/core/commands/blockAccount.handler.ts**, complete the command handler functions like we did in parts 1, 2 and 3

In **src/contexts/accounts/core/commandHandlers/blockAccount.handler.spec.ts**, complete the command handler tests like we did in parts 1, 2 and 3.
