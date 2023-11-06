import { Post, User, post1, user1 } from "./set1";

/**
 * Part 1: Write a utility type that takes an input type and returns a union of that type with null and undefined, i.e. SomeType ---> SomeType | null | undefined
 *
 * Hint: Search for 'TS generics'
 * Hint: Search for 'TS custom utility types with generics'
 */

type Nullish<...> = ...;

type NullishUser = Nullish<User>; // Hovering over 'NullishUser' should show 'User | null | undefined'
type NullishPost = Nullish<Post>; // Hovering over 'NullishPost' should show 'Post | null | undefined'

/**
 * Part 2: Change the types in the following code from 'any' to a more specific object type, utilising generics where useful.
 * 
 * The function 'modifyEntity' should take two arguments:
 *   entity: either a User or a Post
 *   modifyFn: a function which takes an entity, adds some data and returns the modified entity
 *
 * Hint: Search for 'TS as const'
 */

const modifyEntity = (
  entity: any,
  modifyFn: any
) => modifyFn(entity);

// Use case 1
function markUserAsPremium(user: any) {
  return {
    ...user,
    isPremiumUser: true,
  };
}
const premiumUser = modifyEntity(user1, markUserAsPremium);
type PremiumUser = typeof premiumUser; // Hovering over 'PremiumUser' should show a User type containing 'isPremiumUser: true'

// Use case 2
function markPostAsChildFriendly(post: any) {
  return {
    ...post,
    isChildFriendly: true,
  };
}
const childFriendlyPost = modifyEntity(post1, markPostAsChildFriendly);
type ChildFriendlyPost = typeof childFriendlyPost; // Hovering over 'ChildFriendlyPost' should show a Post type containing 'isChildFriendly: true'

/**
 * Part 3: Write a utility type which takes an object as an input and transforms any string array types in the object into a union of a string array and a string, i.e. string[] ---> string[] | string.
 *
 * Hint: Search for 'TS mapped types'
 * Hint: Search for 'TS conditional types'
 */

type TransformStringArraysInObjectToIncludeStringsToo<...> = ...;

type UserWhereFavouriteTopicsCanBeAString = TransformStringArraysInObjectToIncludeStringsToo<User>; // Hovering over 'UserWhereFavouriteTopicsCanBeAString' should show a User type where 'favouriteTopics: string[] | string'

// Export to make TS happy
export { };
