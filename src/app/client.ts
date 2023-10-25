import { createClient, http } from "viem";
import { env } from "../env";

export const client = createClient({
  transport: http(env.NEXT_PUBLIC_RPC_URL),
  pollingInterval: 1000,
});
