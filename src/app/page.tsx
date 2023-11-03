import {
  CommitmentsFilter,
  getLatestCommitments,
} from "@/getLatestCommitments";
import { getBlockNumber } from "viem/actions";
import { client } from "@/viemClient";
import { getChallengeConfig } from "@/getChallengeConfig";
import { Commitments } from "./Commitments";

// Force Next.js to always re-render this, otherwise it will cache the fetch for the latest block number, making it quickly stale and affecting the defaults set up deeper in the component tree.
export const dynamic = "force-dynamic";

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
    getBlockNumber(client, { cacheTime: 0 }),
    getChallengeConfig(client),
  ]);

  return (
    <div className="flex flex-col gap-10">
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
      <Commitments
        latestBlockNumber={latestBlockNumber}
        challengeConfig={challengeConfig}
        commitments={commitments}
      />
    </div>
  );
}
