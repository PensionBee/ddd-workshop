import type { user } from "@prisma/client";

import prisma from "#shared/infra/prisma";
import { User, parseUser } from "#contexts/auth/core/entities/user";

const PrismaUser = prisma["user"];

const convertToUser = (prismaUser: user): User =>
  parseUser({
    id: prismaUser.id,
    email: prismaUser.email,
    password: prismaUser.password,
    firstName: prismaUser.first_name,
    lastName: prismaUser.last_name,
  });

const convertToPersistenceData = (user: User): user => ({
  id: user.id,
  email: user.email,
  password: user.password,
  first_name: user.firstName,
  last_name: user.lastName,
});

export const userRepository = {
  create: async (user: User): Promise<void> => {
    const data = convertToPersistenceData(parseUser(user));
    await PrismaUser.create({ data });
  },
  update: async (user: User): Promise<void> => {
    const data = convertToPersistenceData(parseUser(user));
    const { id } = data;
    await PrismaUser.update({
      where: { id },
      data,
    });
  },
  getById: async (id: string) =>
    PrismaUser.findUnique({
      where: {
        id,
      },
    }).then((data) => data && convertToUser(data)),
  getByEmail: async (email: string) =>
    PrismaUser.findUnique({
      where: {
        email,
      },
    }).then((data) => data && convertToUser(data)),
};
