import { Post, parsePost } from "~/contexts/posts/core/entities/post";

// In-memory data store
// --------------------

const posts: Record<Post["id"], Post> = {};

// Repository
// ----------

export const postRepository = {
  save: async (post: Post) => {
    const parsedPost = parsePost(post); // Ensure post is valid before persisting
    posts[parsedPost.id] = parsedPost; // Persist post
  },
  getById: async (id: Post["id"]) => {
    const post = posts[id]; // Fetch post from persistence (may be undefined)
    return post ? parsePost(post) : null; // Ensure post is valid before returning
  },
};
