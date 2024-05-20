import { type Account } from "../../../accounts/core/entities/account";
import { type PostComment } from "../entities/postComment";

// Success events
// --------------

export type CommentAddedToPostEvent = {
  type: "COMMENT_ADDED_TO_POST";
  payload: {
    id: PostComment["id"];
    postId: PostComment["postId"];
    authorId: PostComment["authorId"];
    content: PostComment["content"];
  };
};

// Fail events
// -----------

export type CommentNotAddedToPostEvent = {
  type: "COMMENT_NOT_ADDED_TO_POST/ACCOUNT_BLOCKED";
  payload: {
    postId: PostComment["postId"];
    blockingAccountId: Account["id"];
    blockedAccountId: Account["id"];
  };
};
