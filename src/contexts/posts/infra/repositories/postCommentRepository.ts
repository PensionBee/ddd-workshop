import { PostComment, parsePostComment } from "../../core/entities/postComment";

// In-memory data store
// --------------------

const postComments: Record<PostComment["id"], PostComment> = {};

// Repository
// ----------

export const postCommentRepository = {
  save: async (postComment: PostComment) => {
    const parsedPostComment = parsePostComment(postComment); // Ensure post comment is valid before persisting
    postComments[parsedPostComment.id] = parsedPostComment; // Persist post comment
  },
  getById: async (id: PostComment["id"]) => {
    const postComment = postComments[id]; // Fetch post comment from persistence (may be undefined)
    return postComment ? parsePostComment(postComment) : null; // Ensure post comment is valid before returning
  },
};
