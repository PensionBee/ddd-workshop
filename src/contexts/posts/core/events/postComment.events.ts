import { type PostComment } from "../entities/postComment";

// Success events
// --------------

export type CommentAddedToPostEvent = {
  type: "COMMENT_ADDED_TO_POST";
  payload: {
    id: PostComment["id"];
    // TODO: complete me
  };
};

// Fail events
// -----------

// TODO: complete me
