import EventEmitter from "node:events";

import { type Event } from "../common/events";

export const eventEmitter = new EventEmitter();

export const publishEvent = <TEvent extends Event>(event: TEvent) => {
  eventEmitter.emit(event.type, event.payload);

  console.log(
    `${event.type} published with payload ${JSON.stringify(event.payload)}`
  );
};
