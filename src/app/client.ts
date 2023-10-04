import { createClient, http } from "viem";
import dotenv from "dotenv";
dotenv.config();

export const client = createClient({ transport: http(process.env.RPC_URL) });
