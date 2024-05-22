/**
 * ---------
 * PROBLEM 1
 * ---------
 */

const id: number = 1;
const email: string = "user@test.com";
const isVerified: boolean = true;
const favouriteTopics: string[] = [
  "World Politics",
  "Sports",
  "The Environment",
];

/**
 * ---------
 * PROBLEM 2
 * ---------
 */

type User = {
  id: number;
  email: string;
  backupEmail: string | null;
  isVerified: boolean;
  favouriteTopics: string[];
};
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
 * ---------
 * PROBLEM 3
 * ---------
 */

type Post = {
  id: number;
  userId: number;
  status: "DRAFT" | "PUBLISHED";
  title: string;
  content?: string;
  imageUrl?: string;
};

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
 */

const allPosts = [post1, post2];

function getPostsByUserId(userId: number): Post[] {
  return allPosts.filter((post) => post.userId === userId);
}

async function getPostById(id: number | string): Promise<Post | undefined> {
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
 */

type UnknownData = Record<string, unknown>;

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
 */

type FollowUserPossibleOutcomes = ReturnType<typeof followUser>;

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

// Example usage
followUser("user-1", "user-2");

/**
 * -------------
 * BONUS PROBLEM
 * -------------
 */

type NullishUserOrPost<T extends User | Post> = T | null | undefined;

// USAGE
// -----

type NullishUser = NullishUserOrPost<User>;
type NullishPost = NullishUserOrPost<Post>;

// ERRORS
// ------

type Error1 = NullishUserOrPost<{ test: "test" }>;
type Error2 = NullishUserOrPost<1>;
type Error3 = NullishUserOrPost<"test">;
type Error4 = NullishUserOrPost<[1, 2, 3]>;
