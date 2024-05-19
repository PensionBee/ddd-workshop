import { PostComment } from "../../core/entities/postComment";

// Types
// -----

type PostCommentRepository = {
  // TODO: complete me
};

// In-memory data store
// --------------------

const postComments: Record<PostComment["id"], PostComment> = {};

// Repository
// ----------

export const postCommentRepository: PostCommentRepository = {
  save: async () => {
    // TODO: complete me
  },
  getById: async () => {
    // TODO: complete me
  },
};
