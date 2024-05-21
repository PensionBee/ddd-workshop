import { configurePolicy } from "../../../shared/core/policies";
import { handleRemoveFollower } from "./commandHandlers/removeFollower.handler";
import { AccountBlockedEvent } from "./events/account.events";

export const configureAccountPolicies = () => {
  configurePolicy<AccountBlockedEvent>({
    event: "ACCOUNT_BLOCKED",
    actions: {
      REMOVE_FOLLOWER: async (eventPayload) => {
        const { blockerId: accountId, blockeeId: followerId } = eventPayload;

        handleRemoveFollower({
          accountId,
          followerId,
        });
      },
    },
  });
};
