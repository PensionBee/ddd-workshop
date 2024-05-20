import { type Post } from "../entities/post";

// Success events
// --------------

export type PostPublishedEvent = {
  type: "POST_PUBLISHED";
  payload: {
    id: Post["id"];
    authorId: Post["authorId"];
    title: Post["title"];
    content: Post["content"];
    imageUrl: Post["imageUrl"];
  };
};
