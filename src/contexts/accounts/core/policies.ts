import { subscribeToEvent } from "../../../shared/infra/pubSub";

export const setUpAccountPolicies = () => {
  subscribeToEvent<UpdateMe>({
    type: "UPDATE_ME",
    handlers: {
      UPDATE_ME: async (eventPayload) => {
        // TODO: complete me
      },
    },
  });
};
