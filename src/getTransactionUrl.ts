import { Hex } from "viem";
import { holesky } from "./chains/holesky";

export function getTransactionUrl(hash: Hex): string {
  return `${holesky.blockExplorers.default.url}/tx/${hash}`;
}
