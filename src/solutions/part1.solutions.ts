/**
 * Part 1
 */

const id: number = 1;
const email: string = "user@test.com";
const isVerified: boolean = true;
const favouriteFood: string[] = ["Mia", "Lloyd", "Pickles"];
const carBrand: null = null;

/**
 * Part 2
 */

export type User = {
  id: number;
  email: string;
  isVerified: boolean;
  favouriteFood: string[];
  carBrand: string | null;
};

export const user1: User = {
  id,
  email,
  isVerified,
  favouriteFood,
  carBrand: null,
};

const user2: User = {
  id: 2,
  email: "user2@test.com",
  isVerified: false,
  favouriteFood: ["Bacon"],
  carBrand: "BMW",
};

/**
 * Part 3
 */

export type Post = {
  id: number;
  userId: number;
  status: "DRAFT" | "PUBLISHED";
  title: string;
  content?: string;
  imageUrl?: string;
};

export const post1: Post = {
  id: 1,
  userId: 1,
  status: "DRAFT",
  title: "Going on holiday with my Bae",
  content: "It's our 62nd wedding anniversary and we're off to Benidorm",
};

const post2: Post = {
  id: 2,
  userId: 1,
  status: "PUBLISHED",
  title: "Just ate a chicken - was yum.",
  imageUrl: "https://my-pics.com/the-chicken-i-just-ate.png",
};

/**
 * Part 4
 */

const allPosts = [post1, post2];

function getPostsByUserId(userId: number): Post[] {
  return allPosts.filter((post) => post.userId === userId);
}

const userPosts = getPostsByUserId(1);

const getPostById = async (id: number | string): Promise<Post | undefined> => {
  if (typeof id === "string") {
    return allPosts.find((post) => post.id === parseInt(id));
  }
  return allPosts.find((post) => post.id === id);
};

const postByNumberId = getPostById(2);
const postByStringId = getPostById("2");

/**
 * Part 5
 */

type UnknownData = Record<string, unknown>;

const processAPIRequest = (data: UnknownData): string => {
  return "Hey";
};

/**
 * Part 6
 */

type DataWithExpectedValue = {
  userId?: string;
  [key: string]: unknown;
};

const processAPIRequestWithUserId = (data: DataWithExpectedValue): string => {
  if (!data.userId) {
    return "Expected a User ID";
  }
  return `Hey ${data.userId}`;
};

const maybeProcessAPIRequestWithUserId = (
  data: DataWithExpectedValue
): string | undefined => {
  if (!data.userId) {
    console.log("Expected a User ID");
    return;
  }
  return `Hey ${data.userId}`;
};

export {};
