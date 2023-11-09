import { ChallengeStatus, InputCommitment } from "@/common";
import { ArrowRightIcon } from "@/ui/icons/ArrowRightIcon";
import Link from "next/link";
import { CommitmentButton } from "./CommitmentButton";
import { ChallengeConfig } from "@/getChallengeConfig";
import { Button } from "@/ui/Button";
import { TertiaryButtonLink } from "@/ui/TertiaryButtonLink";

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
        <Link href={`/commitments/${commitment.inputHash}`} passHref>
          <TertiaryButtonLink icon={<ArrowRightIcon />} />
        </Link>
      </div>
    </div>
  );
}
