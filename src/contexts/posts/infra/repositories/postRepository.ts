import { Post } from "~/contexts/posts/core/entities/post";

// Types
// -----

type PostRepository = {
  // TODO: COMPLETE ME!
  save: (post: any) => Promise<void>;
  getById: (id: any) => Promise<any>;
};

// In-memory store
// ---------------

const accounts: Post[] = [];

// Repository
// ----------

export const postRepository: PostRepository = {
  // TODO: COMPLETE ME!
};
