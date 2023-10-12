import type { account } from "@prisma/client";

import {
  Account,
  parseAccount,
} from "#/contexts/accounts/core/entities/account";
import prisma from "#/shared/infra/prisma";

const PrismaAccount = prisma["account"];

const convertToAccount = (prismaAccount: account): Account =>
  parseAccount({
    id: prismaAccount.id,
    email: prismaAccount.email,
    username: prismaAccount.username,
    password: prismaAccount.password,
  });

const convertToPersistenceData = (account: Account): account =>
  parseAccount(account) && {
    id: account.id,
    email: account.email,
    username: account.username,
    password: account.password,
  };

export const accountRepository = {
  create: async (account: Account): Promise<void> => {
    const data = convertToPersistenceData(account);
    await PrismaAccount.create({ data });
  },
  update: async (account: Account): Promise<void> => {
    const data = convertToPersistenceData(account);
    await PrismaAccount.update({
      where: { id: data.id },
      data,
    });
  },
  getById: async (id: string) =>
    PrismaAccount.findUnique({
      where: {
        id,
      },
    }).then((data) => data && convertToAccount(data)),
  getByEmail: async (email: string) =>
    PrismaAccount.findUnique({
      where: {
        email,
      },
    }).then((data) => data && convertToAccount(data)),
  getByUsername: async (username: string) =>
    PrismaAccount.findUnique({
      where: {
        username,
      },
    }).then((data) => data && convertToAccount(data)),
};
