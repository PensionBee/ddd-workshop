import { Post } from "~/contexts/posts/core/aggregates/post";

// Types
// -----

type PostRepository = {
  save: (post: Post) => Promise<void>;
  getById: (id: string) => Promise<Post | null>;
};

// In-memory persistence
// ---------------------

const posts: Post[] = [];

// Repository
// ----------

export const postRepository: PostRepository = {
  save: async (post) => {
    // Complete me - I should be able to create and update posts
  },
  getById: async (id) => {
    // Complete me
  },
};
