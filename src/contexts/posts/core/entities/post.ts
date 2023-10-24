import { z } from "zod";

export type Post = z.infer<typeof postSchema>;

const postSchema = z.object();

export const parsePost = () => {};
