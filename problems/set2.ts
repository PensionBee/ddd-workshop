import { Post, User, post1, user1 } from "./set1";

/**
 * Part 1: Write a utility type that converts a specific entity type into an array of that entity type
 *
 * Hint: Search for 'TS generics'
 * Hint: Search for 'TS custom utility types with generics'
 */

type EntityArray<...> = ...;

type ArrayOfUsers = EntityArray<User>; // Hovering over 'ArrayOfUsers' should show User[], i.e. an array where all values inside are Users
type ArrayOfPosts = EntityArray<Post>; // Hovering over 'ArrayOfPosts' should show Post[], i.e. an array where all values inside are Posts

/**
 * Part 2: Change the types in the following code from 'any' to a more specific object type, utilising generics where useful.
 * 
 * The function 'modifyEntity' takes two arguments:
 * 
 * entity: either a User or a Post
 * modifyFn: a function which takes an entity, adds some data and returns the modified entity
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
 * Part 3: Write a utility type, using generics, mapped types and conditional types, which transforms string array type into a union of a string array and a string, i.e. string[] ---> string[] | string.
 *
 * Hint: Search for 'TS mapped types'
 * Hint: Search for 'TS conditional types'
 */

type TransformStringArraysInObjectToIncludeStringsToo<...> = ...;

type UserWhereFavouriteTopicsCanBeAString = TransformStringArraysInObjectToIncludeStringsToo<User>; // Hovering over 'UserWhereFavouriteTopicsCanBeAString' should show a User type where 'favouriteTopics: string[] | string'

export { };
