import { Post } from "~/contexts/posts/core/entities/post";

// In-memory data store
// --------------------

const posts: Record<Post["id"], Post> = {};

// Repository
// ----------

export const postRepository = {
  save: async () => {
    // TODO: COMPLETE ME!
  },
  getById: async () => {
    // TODO: COMPLETE ME!
  },
};
