import { Hex } from "viem";

export function getInputDataUrl(inputHash: Hex): string {
  return `https://17001-da.quarry.linfra.xyz/get/${inputHash}`;
}
