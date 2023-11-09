import { getLatestCommitments } from "@/getLatestCommitments";
import { getBlockNumber } from "viem/actions";
import { client } from "@/viemClient";
import { getChallengeConfig } from "@/getChallengeConfig";
import { Commitments } from "./Commitments";
import { searchParamsToCommitmentsFilter } from "../searchParamsToCommitmentsFilter";
import Link from "next/link";
import { learnMoreUrl } from "@/common";
import { TertiaryButtonLink } from "@/ui/TertiaryButtonLink";

// Force Next.js to always re-render this, otherwise it will cache the fetch for the latest block number, making it quickly stale and affecting the defaults set up deeper in the component tree.
export const dynamic = "force-dynamic";

type Props = {
  // TODO: figure out if Next provides this type for us
  searchParams: Record<string, string>;
};

export default async function HomePage({ searchParams }: Props) {
  const [latestBlockNumber, challengeConfig] = await Promise.all([
    getBlockNumber(client, { cacheTime: 0 }),
    getChallengeConfig(client),
  ]);

  const filter = searchParamsToCommitmentsFilter(
    new URLSearchParams(searchParams),
    latestBlockNumber,
    challengeConfig
  );

  // TODO: figure out how we want to poll for new commitments and how to bring in the new ones
  const commitments = await getLatestCommitments(filter);

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
        <TertiaryButtonLink
          href={learnMoreUrl}
          label="Learn more"
          className="bg-red-500 text-base"
          target="_blank"
        />
      </div>
      <Commitments
        latestBlockNumber={latestBlockNumber}
        challengeConfig={challengeConfig}
        commitments={commitments}
        filter={filter}
      />
    </div>
  );
}
