import { PostComment } from "../../core/entities/postComment";

// In-memory data store
// --------------------

const postComments: Record<PostComment["id"], PostComment> = {};

// Repository
// ----------

export const postCommentRepository = {
  save: async () => {
    // TODO: COMPLETE ME!
  },
  getById: async () => {
    // TODO: COMPLETE ME!
  },
};
