import { createClient, http } from "viem";

const NEXT_PUBLIC_RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
if (!NEXT_PUBLIC_RPC_URL)
  throw new Error("Missing NEXT_PUBLIC_RPC_URL env variable");

export const client = createClient({
  transport: http(NEXT_PUBLIC_RPC_URL),
  pollingInterval: 4000,
});
