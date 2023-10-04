import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();

// TODO: use zod / parseEnv util
if (!process.env.DB_URL) throw new Error("DB_URL environment variable not set");

const client = postgres(process.env.DB_URL);
export const database = drizzle(client, { schema });
