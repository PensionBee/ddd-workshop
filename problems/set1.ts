/**
 * Part 1: Change the types in the following code from 'any' to something more specific.
 *
 * Hint: Search for 'TS basic types'
 */

const id: any = 1;
const email: any = "user@test.com";
const isVerified: any = true;
const favouriteTopics: any = ["World Politics", "Sports", "The Environment"];

/**
 * Part 2: Change the types in the following code from 'any' to something more specific.
 *
 * Hint: Search for 'TS object types'
 * Hint: Search for 'TS unions'
 */

export type User = any;
export const user1: User = {
  id: 1,
  email: "user1@test.com",
  backupEmail: null,
  isVerified: true,
  favouriteTopics: ["World Politics", "Sports", "The Environment"],
};
const user2: User = {
  id: 2,
  email: "user2@test.com",
  backupEmail: "user2Backup@test.com",
  isVerified: false,
  favouriteTopics: [],
};

/**
 * Part 3: Change the types in the following code from 'any' to something more specific.
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
 * Part 4: Change the types in the following code from 'any' to something more specific.
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
  return allPosts.find((post) => post.id === id);
};

const postByNumberId = getPostById(1);
const postByStringId = getPostById("1");

/**
 * Part 5: Change the types in the following code from 'any' to something more specific.
 *
 * Assume the 'processAPIRequest' can handle any data as long as it's an object.
 *
 * Hint: Search for 'TS unknown objects'
 */

type UnknownData = any;

const processAPIRequest = (data: UnknownData): any => {
  return `API request processed with data: ${JSON.stringify(data)}`;
};

processAPIRequest({
  foo: "foo",
  bar: "bar",
});

/**
 * Part 6: Change the types in the following code from 'any' to something more specific.
 *
 * Hint: Search for 'TS ReturnType utility'. Maybe also have a wee look at the other utilities available while you're there...
 * Hint: Search for 'TS typeof'
 */

const pretendImADatabaseTableOfUsers = [
  { userId: "abc123", followers: [], blockedUsers: [] },
  { userId: "def456", followers: [], blockedUsers: ["abc123"] },
];

/**
 * Note that we haven't specified a return type for this function.
 * The TS compiler is smart - it can infer types in a lot of cases so we don't have to manually define them...
 *
 * Hovering over the 'followUser' variable below should show:
 *   const followUser: (followerId: any, userToFollowId: any) => "FAIL/USER_BLOCKED" | "SUCCESS/USER_FOLLOWED"
 * The TS compiler already figured out that this function can only ever return "FAIL/USER_BLOCKED" or "SUCCESS/USER_FOLLOWED"
 */
const followUser = (followerId: any, userToFollowId: any) => {
  const toFollowUser = pretendImADatabaseTableOfUsers.find(
    (user) => user.userId === userToFollowId
  );
  if (toFollowUser?.blockedUsers.includes(followerId)) {
    return "FAIL/USER_BLOCKED";
  }

  // This is where we'd normally update the user's followers in the database (skipping here since the implementation isn't important)

  return "SUCCESS/USER_FOLLOWED";
};

followUser("abc123", "def456"); // user with ID 'abc123' wants to follow user with ID 'def456'

type FollowUserPossibleOutcomes = any; // Hovering over 'FollowUserPossibleOutcomes' should show "FAIL/USER_BLOCKED" | "SUCCESS/USER_FOLLOWED"

// Export to make TS happy
export {};
