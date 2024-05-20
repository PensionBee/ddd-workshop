import { z } from "zod";

import { publishEvent } from "../../../../shared/infra/pubSub";
import { type Account } from "../../../accounts/core/entities/account";
import { accountRepository } from "../../../accounts/infra/repositories/accountRepository";
import { postCommentRepository } from "../../infra/repositories/postCommentRepository";
import { postRepository } from "../../infra/repositories/postRepository";
import { type Post } from "../entities/post";
import { postCommentSchema } from "../entities/postComment";
import {
  type CommentAddedToPostEvent,
  type CommentNotAddedToPostEvent,
} from "../events/postComment.events";

// Types
// -----

type Data = z.infer<typeof commandDataSchema>;
type State = {
  post: Post;
  commentor: Account;
  postAuthor: Account | null;
};
type Event = CommentAddedToPostEvent | CommentNotAddedToPostEvent;

// Command data schema
// -------------------

const commandDataSchema = postCommentSchema.pick({
  authorId: true,
  postId: true,
  title: true,
  content: true,
});

// Deriver
// -------

const deriveEvent = (data: Data, state: State): Event => {
  const { content } = data;
  const { commentor, post, postAuthor } = state;

  if (postAuthor?.blockedAccounts.includes(commentor.id)) {
    return {
      type: "COMMENT_NOT_ADDED_TO_POST/ACCOUNT_BLOCKED",
      payload: {
        postId: post.id,
        blockingAccountId: postAuthor.id,
        blockedAccountId: commentor.id,
      },
    };
  }

  return {
    type: "COMMENT_ADDED_TO_POST",
    payload: {
      id: Math.random().toString(), // Use something like UUID or NanoID in a real app
      postId: post.id,
      authorId: commentor.id,
      content,
    },
  };
};

// Command handler
// ---------------

export const handleCommentOnPost = async (
  commandData: Data
): Promise<Event> => {
  // Step 1: Parse incoming Command data
  // -----------------------------------

  const data = commandDataSchema.parse(commandData);

  // Step 2: Fetch relevant 'state' (previously persisted Entities necessary to process the Command)
  // -----------------------------------------------------------------------------------------------
  const post = await postRepository.getById(data.postId);
  if (!post) {
    throw new Error("Post not found");
  }

  const postAuthor = await accountRepository.getById(post.authorId);

  const commentor = await accountRepository.getById(data.authorId);
  if (!commentor) {
    throw new Error("Account not found");
  }

  const state: State = {
    post,
    postAuthor,
    commentor,
  };

  // Step 3: 'Derive an event' (given Command data and fetched state)
  // ----------------------------------------------------------------

  const event = deriveEvent(data, state);

  // Step 4: Update the state of the system (for success Events)
  // -----------------------------------------------------------

  switch (event.type) {
    case "COMMENT_ADDED_TO_POST":
      postCommentRepository.save(event.payload);
      break;
  }

  // Step 5: Publish the Event
  // -------------------------

  publishEvent(event);

  return event;
};
