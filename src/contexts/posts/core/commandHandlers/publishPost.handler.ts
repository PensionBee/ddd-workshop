import { z } from "zod";

import { publishEvent } from "../../../../shared/infra/pubSub";
import { type Account } from "../../../accounts/core/entities/account";
import { accountRepository } from "../../../accounts/infra/repositories/accountRepository";
import { postRepository } from "../../infra/repositories/postRepository";
import { postSchema } from "../entities/post";
import { type PostPublishedEvent } from "../events/post.events";

// Types
// -----

type Data = z.infer<typeof commandDataSchema>;
type State = {
  author: Account;
};
type Event = PostPublishedEvent;

// Command data schema
// -------------------

const commandDataSchema = postSchema.pick({
  authorId: true,
  title: true,
  content: true,
  imageUrl: true,
});

// Deriver
// -------

const deriveEvent = (data: Data, state: State): Event => {
  const { title, content, imageUrl } = data;
  const { author } = state;

  return {
    type: "POST_PUBLISHED",
    payload: {
      id: `post-${Math.random()}`, // Use something like UUID or NanoID in a real app
      authorId: author.id,
      title,
      content,
      imageUrl,
    },
  };
};

// Command handler
// ---------------

export const handlePublishPost = async (commandData: Data): Promise<Event> => {
  // Step 1: Parse command data

  const data = commandDataSchema.parse(commandData);

  // Step 2: Fetch state

  const author = await accountRepository.getById(data.authorId);

  if (!author) {
    throw new Error("Author not found");
  }

  const state: State = {
    author,
  };

  // Step 3: Derive an event

  const event = deriveEvent(data, state);

  // Step 4: Update state

  switch (event.type) {
    case "POST_PUBLISHED":
      postRepository.save(event.payload);
      break;
  }

  // Step 5: Publish and return the event

  publishEvent(event);

  return event;
};
