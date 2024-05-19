import { type Post } from "../../core/entities/post";

// Types
// -----

type PostRepository = {
  // TODO: complete me
};

// In-memory data store
// --------------------

const postsDataStore: Record<Post["id"], Post> = {};

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
