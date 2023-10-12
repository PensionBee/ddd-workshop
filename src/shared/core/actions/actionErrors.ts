import { z } from "zod";

import { BaseError } from "#/shared/common/errors";

export class ActionDataInvalidError extends BaseError {
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

export class InvalidStateError extends BaseError {
  constructor(
    debugDetails: string,
    clientMessage = "Oops! Something went wrong. Please try again later."
  ) {
    super({
      debugDetails,
      clientMessage,
      severity: "error",
    });
  }
}
