import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// TODO: use zod / parseEnv util
if (!process.env.DATABASE_URL) throw new Error("Missing DB_URL env variable");

const client = postgres(process.env.DATABASE_URL);
export const database = drizzle(client, { schema });
