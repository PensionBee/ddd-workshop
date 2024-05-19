import {
  parsePostComment,
  type PostComment,
} from "../../core/entities/postComment";

// Types
// -----

type PostCommentRepository = {
  save: (postComment: PostComment) => Promise<void>;
  getById: (id: PostComment["id"]) => Promise<PostComment | null>;
};

// In-memory data store
// --------------------

const postCommentsDataStore: Record<PostComment["id"], PostComment> = {};

// Repository
// ----------

export const postCommentRepository: PostCommentRepository = {
  save: async (postComment) => {
    const parsedPostComment = parsePostComment(postComment);
    postCommentsDataStore[parsedPostComment.id] = parsedPostComment;
  },
  getById: async (id) => {
    const postComment = postCommentsDataStore[id];
    return postComment ? parsePostComment(postComment) : null;
  },
};
