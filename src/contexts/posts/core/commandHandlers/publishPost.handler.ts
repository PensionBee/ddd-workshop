import { z } from "zod";

import { type PostPublishedEvent } from "../events/post.events";

// Types
// -----

type Data = z.infer<typeof commandDataSchema>;
type State = {
  // TODO: complete me
};
type Event = PostPublishedEvent;

// Command data schema
// -------------------

const commandDataSchema = z.object({
  // TODO: complete me
});

// Deriver
// -------

const deriveEvent = (data: Data, state: State): Event => {
  // TODO: complete me
};

// Command handler
// ---------------

export const handlePublishPost = async (commandData: Data): Promise<Event> => {
  // Step 1: Parse incoming Command data
  // -----------------------------------

  const data = commandDataSchema.parse(commandData);

  // Step 2: Fetch relevant 'state' (previously persisted Entities necessary to process the Command)
  // -----------------------------------------------------------------------------------------------

  const state: State = {
    // TODO: complete me
  };

  // Step 3: 'Derive an event' (given Command data and fetched state)
  // ----------------------------------------------------------------

  const event = deriveEvent(data, state);

  // Step 4: Update the state of the system (for success Events)
  // -----------------------------------------------------------

  switch (event.type) {
    case "POST_PUBLISHED":
      // TODO: complete me
      break;
  }

  return event;
};
