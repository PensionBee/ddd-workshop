import { Post } from "~/contexts/posts/core/entities/post";

// Types
// -----

type PostRepository = {
  // TODO: complete me
};

// In-memory data store
// --------------------

const posts: Record<Post["id"], Post> = {};

// Repository
// ----------

export const postRepository: PostRepository = {
  save: async () => {
    // TODO: complete me
  },
  getById: async () => {
    // TODO: complete me
  },
};
