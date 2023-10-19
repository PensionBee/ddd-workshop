/**
 * Part 1: Change the types in the following code from 'any' to a more specific type
 *
 * Hint: Search for 'TS basic types'
 */

const id: any = 1;
const email: any = "user@test.com";
const isVerified: any = true;
const favouriteFood: any = ["Pizza", "Hot Dogs", "Burgers"];
const carBrand: any = null;

/**
 * Part 2: Change the types in the following code from 'any' to a more specific object type
 *
 * Hint: Search for 'TS object types'
 * Hint: Search for 'TS unions'
 */

export type User = any;

export const user1: User = {
  id: 1,
  email: "user1@test.com",
  isVerified: true,
  favouriteFood: ["Ice Cream"],
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
 * Part 3: Change the types in the following code from 'any' to a more speficic type
 *
 * Hint: Search for 'TS optional values' or 'TS optional object values'
 * Hint: Search for 'TS literal types'
 */

export type Post = any;

export const post1: Post = {
  id: 1,
  userId: 1,
  status: "DRAFT", // Should only ever be "DRAFT" or "PUBLISHED"
  title: "Going on holiday with Bae",
  content: "It's our 62nd wedding anniversary and we're off to Benidorm",
};

const post2: Post = {
  id: 2,
  userId: 1,
  status: "PUBLISHED", // Should only ever be "DRAFT" or "PUBLISHED"
  title: "Just ate a chicken - was yum",
  imageUrl: "https://my-pics.com/the-chicken-i-just-ate.png",
};

/**
 * Part 4: Change the types in the following code from 'any' to a more specific types
 *
 * Hint: Search for 'TS typing empty array'
 * Hint: Search for 'TS promise types'
 */

const allPosts = [post1, post2];

function getPostsByUserId(userId: any): any {
  return allPosts.filter((post) => post.userId === userId);
}

const userPosts = getPostsByUserId(1);

const getPostById = async (id: any): any => {
  if (typeof id === "string") {
    return allPosts.find((post) => post.id === parseInt(id));
  }
  return allPosts.find((post) => post.id === id)[0];
};

const postByNumberId = getPostById(1);
const postByStringId = getPostById("1");

/**
 * Part 5: Change the types in the following code from 'any' to a more specific type. Assume data is always a JS object
 *
 * Hint: Search for 'TS unknown objects'
 */

type UnknownData = any;

const processRequest = (data: UnknownData): any => {
  return "Hey";
};

/**
 * Part 6: Change the types in the following code from 'any' to a more specific type
 *
 * Hint: Search for 'TS partially known object'
 */

type DataWithExpectedValue = any;

const processRequestWithUserId = (data: DataWithExpectedValue): any => {
  if (!data.userId) {
    return "Expected a User ID";
  }
  return `Hey ${data.userId}`;
};

const maybeProcessRequestWithUserId = (data: DataWithExpectedValue): any => {
  if (!data.userId) {
    console.log("Expected a User ID");
    return;
  }
  return `Hey ${data.userId}`;
};

/**
 * Part 7: Change the types in the following code from 'any' to a more specific type
 *
 * Hint: Search for 'TS ReturnType utility'... Maybe also have a look at the other utilities available in TS?
 * Hint: Search for 'TS typeof'
 */

const pretendImADatabaseOfUsers = [
  { userId: "abc123", followers: [], blockedUsers: [] },
  { userId: "def456", followers: [], blockedUsers: ["abc123"] },
];

const followUser = (followerId: any, toFollowId: any) => {
  const toFollowUser = pretendImADatabaseOfUsers.find(
    (user) => user.userId === toFollowId
  );
  if (toFollowUser?.blockedUsers.includes(followerId)) {
    return "FAIL/USER_BLOCKED";
  }

  // This is where we'd normally update the user's followers and then save the user back into the DB (skipping since not important here)

  return "SUCCESS/USER_FOLLOWED";
};

followUser("abc123", "def456");

type FollowUserPossibleOutcomes = any; // Hovering over 'FollowUserPossibleOutcomes' should show "FAIL/USER_BLOCKED" | "SUCCESS/USER_FOLLOWED"

export {};
