# L&DDD - Values, Entities & Parsers

## Context

In Domain Driven Design, 'values and 'entities' are core concepts used to represent 'things' that exists in your domain.

DDD communities advocate for thinking about 'domain models' separately from persistence concerns (HOW stuff is stored in the database). Taking this approach, we can think primarily about how best to represent the 'things' in our domain in the way that's most useful for the business' use cases, without having to think too much about how they're going to be stored.

This might feel a little strange if you're used to thinking primarily about how to store data in a database, but a little practice will show that it can provide much more flexibility in your systems, especially more complex ones.

***Note: We can't ignore the database entirely. Our system is still going to have to persist and reconstruct entities somehow... This will be covered in the 'Repository Pattern' section***.

## Pre-Reading/Watching (Optional)

- [Domain-Driven Design: Entities, Value Objects, and How To Distinguish Them (5 minutes read)]([https://...](https://blog.jannikwempe.com/domain-driven-design-entities-value-objects))
- [Entities & Value Objects (2.5 minute video)](https://www.youtube.com/watch?v=r8q5DD9rd3M)

## The Practical Bit

- In ***src/contexts/posts/core/entities/post.ts***:
  - Use `zod` ([1](#references),[2](#references)) to create a *schema* which defines what a `Post` is.
  - Use `zod` ([3](#references)) to infer the `Post` type. Export this type for use in other parts of our system.
  - Create a function called `parsePost` which takes in some raw data (unknown object/record type), parses it using `zod` ([4](#references)) and returns a valided `Post` if the data conforms to the post schema. Export this function for use in other parts of our system.
- In ***src/contexts/posts/core/entities/postComment.ts***:
  - Repeat the above steps for a `PostComment`.
- Finally, in ***src/contexts/accounts/core/entities/account.ts***:
  - Update the `Account` entity to contain a list of other accounts that an account follows

## Questions Worth Pondering

1. Why are `PostComments` NOT part of the `Post` entity? Could/should it be done differently?
2. Why ARE `Accounts` that an `Account` follows part of the the `Account` entity? Could/should it be done differently?

## Further Reading

- [?](https://...)

## References

1. [Zod Primitives](https://github.com/colinhacks/zod#primitives)
2. [Zod Objects](https://github.com/colinhacks/zod#objects)
3. [Zod Type Inference](https://github.com/colinhacks/zod#type-inference)
4. [Zod Parsing](https://github.com/colinhacks/zod#basic-usage)
