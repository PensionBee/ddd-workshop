import { type Event } from "../common/events";
import { eventEmitter } from "../infra/pubSub";

const policies: Record<Uppercase<string>, Uppercase<string>[]> = {};

export const configurePolicy = <TEvent extends Event>(args: {
  event: TEvent["type"];
  actions: Record<
    Uppercase<string>,
    (eventPayload: TEvent["payload"]) => Promise<void>
  >;
}) => {
  const { event, actions } = args;

  Object.entries(actions).forEach(([actionName, actionFn]) => {
    // Add action name to policies list
    if (event in policies) {
      policies[event].push(actionName as Uppercase<string>);
    } else {
      policies[event as Uppercase<string>] = [actionName as Uppercase<string>];
    }

    // Set up action wrapper
    const handleEvent = async (eventPayload: TEvent["payload"]) => {
      try {
        await actionFn(eventPayload);
        console.log(
          `${actionName} action executed successfully in response to ${event} event`
        );
      } catch (e) {
        console.log(
          `${actionName} action failed to execute in response to ${event} event. Error details: ${JSON.stringify(
            e
          )}`
        );
      }
    };

    eventEmitter.on(event, handleEvent);
  });
};

export const logPoliciesOverview = () => {
  const overview =
    "-".repeat(75) +
    "\n" +
    Object.entries(policies)
      .map(
        ([event, actions]) =>
          `${event} event has been configured to trigger...\n` +
          actions.map((action) => `    ${action}`).join("\n")
      )
      .join("\n") +
    "\n" +
    "-".repeat(75) +
    "\n";

  console.log(overview);
};
