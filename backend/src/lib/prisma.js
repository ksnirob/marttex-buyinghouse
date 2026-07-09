import { PrismaClient } from "@prisma/client";

const client =
  globalThis.__prismaClient ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__prismaClient = client;
}

export const prisma =
  globalThis.__prisma ||
  client.$extends({
    result: {
      $allModels: {
        _id: {
          needs: { id: true },
          compute(record) {
            return record.id;
          },
        },
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}
