import { type Post } from "../../core/entities/post";

// Types
// -----

type PostRepository = {
  save: (post: Post) => Promise<void>;
  getById: (id: Post["id"]) => Promise<Post | null>;
};

// In-memory data store
// --------------------

const postsDataStore: Record<Post["id"], Post> = {};

// Repository
// ----------

export const postRepository: PostRepository = {
  save: async (post) => {
    postsDataStore[post.id] = post;
  },
  getById: async (id) => postsDataStore[id] ?? null,
};
