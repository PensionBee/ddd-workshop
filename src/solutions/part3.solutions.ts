import { Post, User, user1, post1 } from "./part1.solutions";

/**
 * Part 1
 */

type EntityArray<T extends User | Post> = T[];

type ArrayOfUsers = EntityArray<User>;
type ArrayOfPosts = EntityArray<Post>;

/**
 * Part 2
 */

const modifyEntity = <
  TEntity extends User | Post,
  TModifiedEntity extends TEntity & Record<string, unknown>
>(
  entity: TEntity,
  modifyFn: (entity: TEntity) => TModifiedEntity
) => modifyFn(entity);

// Use case 1
function markUserAsPremium(user: User) {
  return {
    ...user,
    isPremiumUser: true,
  } as const;
}
const premiumUser = modifyEntity(user1, markUserAsPremium);
type PremiumUser = typeof premiumUser;

// Use case 2
function markPostAsChildFriendly(post: Post) {
  return {
    ...post,
    isChildFriendly: true,
  } as const;
}
const childFriendlyPost = modifyEntity(post1, markPostAsChildFriendly);
type ChildFriendlyPost = typeof childFriendlyPost;

/**
 * Part 3
 */

type EntityWithNullInsteadOfEmptyString<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K] extends "" ? null : T[K];
};

type EntityWithNoCarBrand = EntityWithNullInsteadOfEmptyString<{
  id: 1;
  email: "user1@test.com";
  isVerified: true;
  favouriteFood: ["Ice Cream"];
  carBrand: "";
}>;

export {};
