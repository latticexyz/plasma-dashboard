import { ChallengeStatus, InputCommitment } from "@/common";
import { ArrowRightIcon } from "@/ui/icons/ArrowRightIcon";
import Link from "next/link";
import { CommitmentButton } from "./CommitmentButton";
import { ChallengeConfig } from "@/getChallengeConfig";

type Props = {
  blockNumber: bigint;
  challengeConfig: ChallengeConfig;
  commitment: InputCommitment;
  status: ChallengeStatus;
};

export function CommitmentButtons({
  blockNumber,
  challengeConfig,
  commitment,
  status,
}: Props) {
  return (
    <div className="flex items-center justify-end">
      <div className="flex-grow flex gap-2 justify-end">
        <CommitmentButton
          blockNumber={blockNumber}
          challengeConfig={challengeConfig}
          commitment={commitment}
          status={status}
        />
        <Link
          href={`/commitments/${commitment.inputHash}`}
          className="flex-shrink-0 px-3 py-2 bg-white/20 text-white"
        >
          <ArrowRightIcon />
        </Link>
      </div>
    </div>
  );
}
