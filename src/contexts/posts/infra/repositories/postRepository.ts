import { Post } from "~/contexts/posts/core/entities/post";

// In-memory data store
// --------------------

const posts: Record<Post["id"], Post> = {};

// Repository
// ----------

export const postRepository = {
  save: (post: Post) => {
    // TODO: COMPLETE ME!
  },
  getById: () => {
    // TODO: COMPLETE ME!
  },
};
