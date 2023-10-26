import { getLatestCommitments } from "@/getLatestCommitments";
import { Commitment } from "./Commitment";
import { getBlockNumber } from "viem/actions";
import { client } from "@/viemClient";
import { getChallengeConfig } from "@/getChallengeConfig";

export default async function HomePage() {
  const [commitments, latestBlockNumber, challengeConfig] = await Promise.all([
    getLatestCommitments(),
    getBlockNumber(client),
    getChallengeConfig(client),
  ]);
  return (
    <div className="flex flex-col mx-auto max-w-screen-lg py-16">
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
  );
}
