import { ChallengeStatus, InputCommitment } from "@/common";
import { ArrowRightIcon } from "@/icons/ArrowRightIcon";
import { TerminalIcon } from "@/icons/TerminalIcon";
import Link from "next/link";
import { ChallengeButton } from "./ChallengeButton";

type Props = {
  commitment: InputCommitment;
  status: ChallengeStatus;
};

export function CommitmentButtons({ commitment, status }: Props) {
  return (
    <div className="flex items-center justify-end">
      <div className="flex-grow flex gap-2 justify-end">
        <ChallengeButton commitment={commitment} status={status} />
        <Link
          href={`/commitments/${commitment.txHash}`}
          className="flex-shrink-0 px-3 py-2 bg-white/20 text-white"
        >
          <ArrowRightIcon />
        </Link>
      </div>
    </div>
  );
}
