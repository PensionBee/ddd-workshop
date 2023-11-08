/**
 * PROBLEM 1: Change the types in the following code from 'any' to something more specific.
 *
 * Hint: Search for 'TS basic types'
 */

const id: any = 1;
const email: any = "user@test.com";
const isVerified: any = true;
const favouriteTopics: any = ["World Politics", "Sports", "The Environment"];

/**
 * PROBLEM 2: Change the types in the following code from 'any' to something more specific.
 *
 * Hint: Search for 'TS object types'
 * Hint: Search for 'TS unions'
 */

type User = any;

const user1: User = {
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
 * PROBLEM 3: Change the types in the following code from 'any' to something more specific.
 *
 * Hint: Search for 'TS optional values' or 'TS optional object values'
 * Hint: Search for 'TS literal types'
 */

type Post = any;
const post1: Post = {
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
 * PROBLEM 4: Change the types in the following code from 'any' to something more specific.
 *
 * Hint: Search for 'TS typing empty array'
 * Hint: Search for 'TS promise types'
 */

const allPosts = [post1, post2];

function getPostsByUserId(userId: any): any {
  return allPosts.filter((post) => post.userId === userId);
}

// Example usage
const userPosts = getPostsByUserId(1);

async function getPostById(id: any): any {
  if (typeof id === "string") {
    return allPosts.find((post) => post.id === parseInt(id));
  }
  return allPosts.find((post) => post.id === id);
}

// Example usage
const postByNumberId = getPostById(1);
const postByStringId = getPostById("1");

/**
 * PROBLEM 5: Change the types in the following code from 'any' to something more specific.
 *
 * Assume 'processAPIRequest' can handle any data as long as it's an object.
 *
 * Hint: Search for 'TS unknown objects'
 */

type UnknownData = any;

function processAPIRequest(data: UnknownData): any {
  return `API request processed with data: ${JSON.stringify(data)}`;
}

// Example usage
processAPIRequest({
  foo: "foo",
  bar: "bar",
});

/**
 * PROBLEM 6: Change the types in the following code from 'any' to something more specific.
 *
 * Hint: Search for 'TS ReturnType utility' (Note that you can see all the built-in utility types here: https://www.typescriptlang.org/docs/handbook/utility-types.html)
 * Hint: Search for 'TS typeof'
 */

/**
 * Note that we haven't specified a return type for the 'followUser' function below.
 * The TS compiler is smart - it can actually infer types in a lot of cases so we don't have to manually define them.
 *
 * Hovering over the 'followUser' function below should show the following:
 *   function followUser(followerId: any, userToFollowId: any): "FAIL/USER_BLOCKED" | "SUCCESS/USER_FOLLOWED"
 *
 * Here the TS compiler figured out that this function can only ever return "FAIL/USER_BLOCKED" or "SUCCESS/USER_FOLLOWED"
 */

type FollowUserPossibleOutcomes = any; // Hovering over 'FollowUserPossibleOutcomes' should show "FAIL/USER_BLOCKED" | "SUCCESS/USER_FOLLOWED"

const usersData = [
  { userId: "user-1", followers: [], blockedUsers: [] },
  { userId: "user-2", followers: [], blockedUsers: ["user-1"] },
];

function followUser(followerId: any, userToFollowId: any) {
  const toFollowUser = usersData.find((user) => user.userId === userToFollowId);
  if (toFollowUser?.blockedUsers.includes(followerId)) {
    return "FAIL/USER_BLOCKED";
  }

  // This is where we'd normally update the user's followers and persist the change (skipping here since the implementation isn't important)

  return "SUCCESS/USER_FOLLOWED";
}

// Example usage
followUser("user-1", "user-2"); // user with ID 'user-1' wants to follow user with ID 'user-2'

/**
 * BONUS PROBLEM
 *
 * -----------------------------------------------------------------------------------------------------
 *
 * This part introduces 'generics', which goes beyond Typescript basics...
 *
 * Generics can take a little time to wrap your head around but they're an extremely powerful tool for
 * building libraries or shared utilities where you don't know what specific types are going to be used
 * ahead of time.
 *
 * You won't need to write anything with generics in the rest of the workshop but some
 * utility functions we'll use in later sections will use generics under the hood, so this is here
 * for completeness in case you're interested in exploring those functions more when you reach them.
 *
 * -----------------------------------------------------------------------------------------------------
 *
 * Write a utility type that takes any type as an argument and returns a union of that type with null and undefined, i.e. SomeType ---> SomeType | null | undefined
 *
 * Hint: Search for 'TS generics'
 * Hint: Search for 'TS custom utility types with generics'
 */

type Nullish<T> = any;

// Example usage
type NullishUser = Nullish<User>; // Hovering over 'NullishUser' should show 'User | null | undefined'
type NullishPost = Nullish<Post>; // Hovering over 'NullishPost' should show 'Post | null | undefined'

// Export to make TS happy
export {};
