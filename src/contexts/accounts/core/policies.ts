import { configurePolicy } from "../../../shared/core/policies";

export const configureAccountPolicies = () => {
  configurePolicy<UpdateMe>({
    event: "UPDATE_ME",
    actions: {
      UPDATE_ME: async (eventPayload) => {
        // TODO: complete me
      },
    },
  });
};
