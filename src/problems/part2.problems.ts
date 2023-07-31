// THIS PROBLEM SET FOCUSES ON GENERICS, MAPPED TYPES, CONDITIONAL TYPES AND OTHER ADVANCED TS CONCEPTS

import { Post, User, post1, user1 } from "./part1.problems";

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
 * entity: either a User or a Post (imports are allowed)
 * modifyFn: a function which takes an entity, adds some data and returns the modified entity
 *
 * Hint: Search for 'TS ?'
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
 * Part 3: Write a utility type, using generics, which changes all empty strings in an entity to null types
 *
 * Hint: Search for 'TS mapped types'
 * Hint: Search for 'TS conditional types'
 */

type EntityWithNullInsteadOfEmptyString<...> = ...;

type EntityWithNoCarBrand = EntityWithNullInsteadOfEmptyString<{
  id: 1,
  email: "user1@test.com",
  isVerified: true,
  favouriteFood: ["Ice Cream"],
  carBrand: '',
}>; // Hovering over 'EntityWithNoCarBrand' should show a User type containing 'carBrand: null'

export {};
