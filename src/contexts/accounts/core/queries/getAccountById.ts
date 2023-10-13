import { z } from "zod";

import { accountRepository } from "~/contexts/accounts/infra/repositories/accountRepository";
import { createQueryHandler } from "~/shared/core/queries/queryHandling";
import { createQueryDataParser } from "~/shared/core/queries/queryParsing";

type Data = z.infer<typeof dataSchema>;

export const dataSchema = z.object({
  accountId: z.string().uuid(),
});
const parseData = createQueryDataParser(dataSchema);

const getOutput = async (data: Data) => {
  const { accountId } = data;

  const account = await accountRepository.getById(accountId);

  return { account };
};

export const getAccountById = createQueryHandler({
  parseData,
  getOutput,
});
