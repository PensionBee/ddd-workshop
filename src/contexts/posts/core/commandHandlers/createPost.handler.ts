import { z } from "zod";

// Types
// -----

type Data = z.infer<typeof commandDataSchema>;
type State = {
  // TODO: COMPLETE ME!
};
type Event = {
  type: "POST_CREATED";
  payload: {
    // TODO: COMPLETE ME!
  };
};
// TODO: ADD FAIL EVENTS

// Command data schema
// -------------------

const commandDataSchema = z.object({
  // TODO: COMPLETE ME!
});

// Deriver
// -------

const deriveEvent = (data: Data, state: State): Event => {
  // TODO: COMPLETE ME!
};

// Command handler
// ---------------

export const handleCreatePost = async (commandData: Data): Promise<Event> => {
  // Step 1: Parse/validate incoming command data
  // --------------------------------------------
  const data = commandDataSchema.parse(commandData);

  // Step 2: Fetch relevant system 'state' (existing entities necessary to process the command)
  // ------------------------------------------------------------------------------------------
  const state: State = {
    // TODO: COMPLETE ME!
  };

  // Step 3: 'Derive an event' (given command data and fetched state)
  // ----------------------------------------------------------------------
  const event = deriveEvent(data, state);

  // Step 4: Update the state of the system (for success events)
  // -------------------------------------------------------------
  switch (event.type) {
    case "POST_CREATED":
      // TODO: COMPLETE ME!
      break;
  }

  return event;
};
