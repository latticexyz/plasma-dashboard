import * as schema from "../../drizzle/typedSchema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();

const client = postgres("postgres://postgres:adminadmin@0.0.0.0:5432/db");
export const database = drizzle(client, { schema });
