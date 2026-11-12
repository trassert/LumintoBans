import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

declare global {
  var prisma: PrismaClient | undefined;
}

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  const adapter = new PrismaMariaDb(url);
  return new PrismaClient({ adapter });
}

// Lazily create the client so module import (e.g. during next build page-data
// collection) does not fail when DATABASE_URL is unavailable. The client is
// only instantiated on first property access, i.e. when a query actually runs.
function getClient(): PrismaClient {
  if (!globalThis.prisma) {
    globalThis.prisma = createClient();
  }
  return globalThis.prisma;
}

export const db = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getClient();
    const value = Reflect.get(client, prop, client);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
