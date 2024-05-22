/**
 * ---------
 * PROBLEM 1
 * ---------
 *
 * Change 'any' to more specific types which are representative of the assigned values.
 *
 * Hint: Search for 'TS basic types'
 */

const id: any = 1;
const email: any = "user@test.com";
const isVerified: any = true;
const favouriteTopics: any = ["World Politics", "Sports", "The Environment"];

/**
 * ---------
 * PROBLEM 2
 * ---------
 *
 * Change 'any' to a more specific type which can be used for both users.
 *
 * Hint: Search for 'TS object types'
 * Hint: Search for 'TS unions'
 */

type User = any;

const user1: User = {
  id: 1,
  email: "user1@example.com",
  backupEmail: null,
  isVerified: true,
  favouriteTopics: ["World Politics", "Sports", "The Environment"],
};

const user2: User = {
  id: 2,
  email: "user2@example.com",
  backupEmail: "user2backup@example.com",
  isVerified: false,
  favouriteTopics: [],
};

/**
 * ---------
 * PROBLEM 3
 * ---------
 *
 * Change 'any' to a more specific type which can be used for both posts.
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
 * ---------
 * PROBLEM 4
 * ---------
 *
 * Change 'any' to more specific types which work with the below examples.
 *
 * Hint: Search for 'TS typing empty arrays'
 * Hint: Search for 'TS promise types'
 */

const allPosts = [post1, post2];

function getPostsByUserId(userId: any): any {
  return allPosts.filter((post) => post.userId === userId);
}

async function getPostById(id: any): any {
  if (typeof id === "string") {
    return allPosts.find((post) => post.id === parseInt(id));
  }
  return allPosts.find((post) => post.id === id);
}

// USAGE
// -----

const userPosts = getPostsByUserId(1);
const postByNumberId = getPostById(1);
const postByStringId = getPostById("1");

/**
 * ---------
 * PROBLEM 5
 * ---------
 *
 * Change 'any' to a more specific type. Assume 'processAPIRequest' can handle any data as long as it's a JS object.
 *
 * Hint: Search for 'TS Record types'
 */

type UnknownData = any;

function processAPIRequest(data: UnknownData): string {
  return `API request processed with data: ${JSON.stringify(data)}`;
}

// USAGE
// -----

processAPIRequest({
  foo: "foo",
  bar: "bar",
});
processAPIRequest({
  baz: "baz",
});

/**
 * ---------
 * PROBLEM 6
 * ---------
 *
 * Change 'any' to a more specific type, 'inferring' the possible return types from the `followUser` function.
 *
 * Hint: Search for 'TS ReturnType utility' (Note that you can see all the built-in utility types here:
 *      https://www.typescriptlang.org/docs/handbook/utility-types.html)
 * Hint: Search for 'TS typeof'
 *
 * ----------------------------------------------------------------------------------------------------------------
 *
 * Note that we haven't specified a return type for the 'followUser' function below.
 * The TS compiler is smart - it can infer types in a lot of cases so we don't have to manually define them.
 *
 * If you hover over the 'followUser' function below, you should see something like this:
 *   function followUser(followerId: string, userToFollowId: string): "FAIL/USER_BLOCKED" | "SUCCESS/USER_FOLLOWED"
 *
 * Here the TS compiler figured out that this function only returns "FAIL/USER_BLOCKED" or "SUCCESS/USER_FOLLOWED"
 */

type FollowUserPossibleOutcomes = any; // Hovering over 'FollowUserPossibleOutcomes' should show "FAIL/USER_BLOCKED" | "SUCCESS/USER_FOLLOWED"

const usersData = [
  { userId: "user-1", followers: [], blockedUsers: [] },
  { userId: "user-2", followers: [], blockedUsers: ["user-1"] },
];

function followUser(followerId: string, userToFollowId: string) {
  const toFollowUser = usersData.find((user) => user.userId === userToFollowId);
  if (toFollowUser?.blockedUsers.includes(followerId)) {
    return "FAIL/USER_BLOCKED";
  }

  // Update the user's followers...

  return "SUCCESS/USER_FOLLOWED";
}

/**
 * -------------
 * BONUS PROBLEM
 * -------------
 *
 * This problem introduces 'generics', which goes beyond Typescript fundamentals...
 *
 * Generics can take a little time to wrap your head around but they're an extremely powerful tool for
 * building libraries or shared utilities where you don't know what the specific types are going to be
 * ahead of time.
 *
 * You won't need to write anything with generics throughout the workshop but there will be one or two
 * utility functions in later sections which will use generics under the hood. This is here for
 * completeness in case you're interested in exploring those functions more when you reach them.
 *
 * -----------------------------------------------------------------------------------------------------
 *
 * Change 'any' in `NullishUserOrPost` so that it takes a 'type argument' of type  `User` or `Post` (but
 * nothing else) and returns a union of that specific type with both null and undefined, i.e.
 *  - `User` ---> `User | null | undefined`
 *  - `Post` ---> `Post | null | undefined`
 *
 * Hint: Search for 'TS generics'
 * Hint: Search for 'TS generics extends'
 * Hint: Search for 'TS custom utility types with generics'
 */

type NullishUserOrPost<T extends any> = any;

// USAGE
// -----

type NullishUser = NullishUserOrPost<User>; // Hovering over 'NullishUser' should show 'User | null | undefined'
type NullishPost = NullishUserOrPost<Post>; // Hovering over 'NullishPost' should show 'Post | null | undefined'

// ERRORS
// ------

type Error1 = NullishUserOrPost<{ test: "test" }>; // This should show an error because {test: 'test'} is neither a User or Post
type Error2 = NullishUserOrPost<1>; // This should show an error because 1 is neither a User or Post
type Error3 = NullishUserOrPost<"test">; // This should show an error because 'test' is neither a User or Post
type Error4 = NullishUserOrPost<[1, 2, 3]>; // This should show an error because [1, 2, 3] is neither a User or Post
