import EventEmitter from "node:events";

type Event = {
  type: Uppercase<string>;
  payload: Record<string, unknown>;
};

const eventEmitter = new EventEmitter();

export const publishEvent = <TEvent extends Event>(event: TEvent) => {
  eventEmitter.emit(event.type, event.payload);

  console.log(
    `${event.type} event published with payload ${JSON.stringify(
      event.payload
    )}`
  );
};

export const subscribeToEvent =
  <TEvent extends Event>() =>
  (args: {
    type: TEvent["type"];
    handlers: Record<
      Uppercase<string>,
      (eventPayload: TEvent["payload"]) => Promise<void>
    >;
  }) => {
    const { type: eventType, handlers } = args;

    Object.entries(handlers).forEach(([handlerName, handler]) => {
      const handleEvent = async (eventPayload: TEvent["payload"]) => {
        try {
          await handler(eventPayload);
          console.log(
            `${handlerName} handler successfully handled ${eventType} event`
          );
        } catch (e) {
          console.log(
            `${handlerName} handler failed to handle ${eventType} event with error: ${e}`
          );
        }
      };

      eventEmitter.on(eventType, handleEvent);
    });
  };
