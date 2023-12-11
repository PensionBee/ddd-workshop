import { z } from "zod";
import { createCommandHandler } from "~/shared/core/commandHandlers";

// Types
// -----

type Data = z.infer<typeof commandDataSchema>;
type State = {
  // TODO: COMPLETE ME!
};
type Outcome = {
  // TODO: COMPLETE ME!
};

// Partials
// --------

const commandDataSchema = z.object({
  // TODO: COMPLETE ME!
});
const parseData = (rawData: Data): Data => commandDataSchema.parse(rawData);

const fetchState = async (data: Data): Promise<State> => {
  // TODO: COMPLETE ME!
};

const deriveOutcome = (data: Data, state: State): Outcome => {
  // TODO: COMPLETE ME!
};

const updateState = async (state: State, outcome: Outcome): Promise<void> => {
  // TODO: COMPLETE ME!
};

// Command Handler
// ---------------

export const handleFollowAccount = createCommandHandler({
  parseData,
  fetchState,
  deriveOutcome,
  updateState,
});
