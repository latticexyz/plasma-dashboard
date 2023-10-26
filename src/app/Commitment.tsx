import { InputCommitment } from "@/common";
import { ChallengeConfig } from "@/getChallengeConfig";
import { CommitmentBlock } from "./CommitmentBlock";
import { CommitmentCells } from "./CommitmentCells";

type Props = {
  latestBlockNumber: bigint;
  challengeConfig: ChallengeConfig;
  commitment: InputCommitment;
};

export function Commitment({
  latestBlockNumber,
  challengeConfig,
  commitment,
}: Props) {
  return (
    <div className="grid grid-cols-6 gap-5 p-3">
      <CommitmentBlock commitment={commitment} />
      <CommitmentCells
        latestBlockNumber={latestBlockNumber}
        commitment={commitment}
        challengeConfig={challengeConfig}
      />
    </div>
  );
}
