import * as schema from "@/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

if (!process.env.DATABASE_URL)
  throw new Error("Missing DATABASE_URL env variable");

const client = postgres(process.env.DATABASE_URL);
// TODO: figure out why drizzle doesn't like this client type, maybe version misalignment?
export const database = drizzle(client as any, { schema });
