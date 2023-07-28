import { z } from "zod";

import { BaseError } from "#shared/common/errors";

export class QueryInputDataInvalidError extends BaseError {
  constructor(zodError: z.ZodError) {
    super({
      debugDetails: `\n${zodError.issues
        .map((issue) => `- ${issue.path.join(".")} (${issue.message})`)
        .join("\n")}`,
      clientMessage: `\n${zodError.issues
        .map((issue) => `- ${issue.path.join(".")} (${issue.message})`)
        .join("\n")}`,
      severity: "info",
    });
  }
}

export class QueryOutputDataInvalidError extends BaseError {
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
