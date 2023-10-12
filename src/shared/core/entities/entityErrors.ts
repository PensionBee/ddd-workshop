import { z } from "zod";

import { BaseError } from "../../common/errors";

export class EntityInvalidError extends BaseError {
  constructor(zodError: z.ZodError) {
    super({
      debugDetails: `\n${zodError.issues
        .map((issue) => `- ${issue.path.join(".")} (${issue.message})`)
        .join("\n")}`,
      clientMessage: "Oops! Something went wrong. Please try again later.",
      severity: "error",
    });
  }
}
