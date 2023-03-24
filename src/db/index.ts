import * as pg from "pg";
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;
export async function init() {
  prisma = new PrismaClient();
}

export function getDBClient(): PrismaClient {
  prisma.$connect();
  return prisma;
}
