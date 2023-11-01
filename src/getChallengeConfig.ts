import { challengeContract, challengeContractAbi } from "@/common";
import { Client, getContract } from "viem";
import { memoize } from "@/memoize";
import { secondsPerBlock } from "./common";

export type ChallengeConfig = {
  challengeWindowBlocks: bigint;
  challengeWindowSeconds: number;
  resolveWindowBlocks: bigint;
  resolveWindowSeconds: number;
  bondSize: bigint;
};

export async function _getChallengeConfig(
  client: Client
): Promise<ChallengeConfig> {
  const contract = getContract({
    abi: challengeContractAbi,
    address: challengeContract,
    publicClient: client,
  });

  const [challengeWindowBlocks, resolveWindowBlocks, bondSize] =
    await Promise.all([
      contract.read.challengeWindow(),
      contract.read.resolveWindow(),
      contract.read.bondSize(),
    ]);

  return {
    challengeWindowBlocks,
    challengeWindowSeconds: Number(challengeWindowBlocks) * secondsPerBlock,
    resolveWindowBlocks,
    resolveWindowSeconds: Number(resolveWindowBlocks) * secondsPerBlock,
    bondSize,
  };
}

export const getChallengeConfig = memoize(_getChallengeConfig);
