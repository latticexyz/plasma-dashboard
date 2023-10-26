import {
  CommitmentsFilter,
  getLatestCommitments,
} from "@/getLatestCommitments";
import { Commitment } from "./Commitment";
import { getBlockNumber } from "viem/actions";
import { client } from "@/viemClient";
import { getChallengeConfig } from "@/getChallengeConfig";
import { CommitmentsFilterForm } from "./CommitmentsFilterForm";
import { ChallengeStatus } from "@/common";
import { Address } from "viem";
import { useMemo } from "react";

type Props = {
  // TODO: figure out if Next provides this type for us
  searchParams: Record<string, string>;
};

export default async function HomePage({ searchParams }: Props) {
  const filter: CommitmentsFilter = {};

  // TODO: parse with zod?

  const fromBlock = searchParams.fromBlock;
  if (typeof fromBlock === "string" && /^\d+$/.test(fromBlock)) {
    filter.fromBlock = BigInt(fromBlock);
  }

  const toBlock = searchParams.toBlock;
  if (typeof toBlock === "string" && /^\d+$/.test(toBlock)) {
    filter.toBlock = BigInt(toBlock);
  }

  // TODO: figure out how we want to poll for new commitments and how to bring in the new ones
  const [commitments, latestBlockNumber, challengeConfig] = await Promise.all([
    getLatestCommitments(filter),
    getBlockNumber(client),
    getChallengeConfig(client),
  ]);

  return (
    <div className="flex flex-col mx-auto max-w-screen-lg py-16 gap-10">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <h1 className="font-mono text-xl text-white uppercase">
            Challenge Explorer
          </h1>
          <p className="text-white/60">
            Browse & inspect data availability challenges on Redstone.
          </p>
        </div>
        <button
          type="button"
          className="bg-red-500 text-white font-mono uppercase px-4 py-3"
        >
          Learn more
        </button>
      </div>
      <div className="flex flex-col gap-5">
        <CommitmentsFilterForm latestBlockNumber={latestBlockNumber} />
        <div className="border-y border-white/20 divide-y divide-white/20">
          {commitments.map((commitment) => (
            <Commitment
              key={commitment.txHash}
              latestBlockNumber={latestBlockNumber}
              challengeConfig={challengeConfig}
              commitment={commitment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
