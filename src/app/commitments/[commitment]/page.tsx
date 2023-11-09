import { isHex } from "viem";
import { getBlockNumber } from "viem/actions";
import { getChallengeConfig } from "@/getChallengeConfig";
import { getCommitment } from "@/getCommitment";
import { client } from "@/viemClient";
import { notFound } from "next/navigation";
import { CommitmentPageContents } from "@/app/CommitmentPageContents";

// Force Next.js to always re-render this, otherwise it will cache the fetch for the latest block number, making it quickly stale and affecting the defaults set up deeper in the component tree.
export const dynamic = "force-dynamic";

type Props = {
  params: {
    commitment: string;
  };
};

export default async function CommitmentPage({ params }: Props) {
  const commitment = isHex(params.commitment)
    ? await getCommitment(params.commitment)
    : null;
  if (!commitment) notFound();

  const [latestBlockNumber, challengeConfig] = await Promise.all([
    getBlockNumber(client, { cacheTime: 0 }),
    getChallengeConfig(client),
  ]);

  return (
    <CommitmentPageContents
      latestBlockNumber={latestBlockNumber}
      challengeConfig={challengeConfig}
      commitment={commitment}
    />
  );
}
