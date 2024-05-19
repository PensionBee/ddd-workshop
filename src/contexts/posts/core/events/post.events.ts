import { type Post } from "../entities/post";

// Success events
// --------------

export type PostPublishedEvent = {
  type: "POST_PUBLISHED";
  payload: {
    id: Post["id"];
    // TODO: complete me
  };
};
