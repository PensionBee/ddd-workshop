import { PostComment } from "../../core/entities/postComment";

// In-memory data store
// --------------------

const postComments: Record<PostComment["id"], PostComment> = {};

// Repository
// ----------

export const postCommentRepository = {
  save: () => {
    // TODO: COMPLETE ME!
  },
  getById: () => {
    // TODO: COMPLETE ME!
  },
};
