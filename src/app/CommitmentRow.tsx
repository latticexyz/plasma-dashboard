"use client";

import Link from "next/link";
import { useBlockNumber } from "wagmi";
import { InputCommitment } from "@/common";
import { ChallengeConfig } from "@/getChallengeConfig";
import { CommitmentBlock } from "./CommitmentBlock";
import { holesky } from "@/chains/holesky";
import { getChallengeStatus } from "@/getChallengeStatus";
import { ChallengeDetailCells } from "./ChallengeDetailCells";
import { ChallengeStatusCell } from "./ChallengeStatusCell";
import { CommitmentAddresses } from "./CommitmentAddresses";
import { CommitmentButton } from "./CommitmentButton";
import { TertiaryButtonLink } from "@/ui/TertiaryButtonLink";
import { ArrowRightIcon } from "@/ui/icons/ArrowRightIcon";

type Props = {
  latestBlockNumber: bigint;
  challengeConfig: ChallengeConfig;
  commitment: InputCommitment;
};

export function CommitmentRow({
  latestBlockNumber,
  challengeConfig,
  commitment,
}: Props) {
  const blockNumber =
    useBlockNumber({ chainId: holesky.id, watch: true }).data ??
    latestBlockNumber;
  const challenge = commitment.latestChallenge;
  const status = getChallengeStatus(challenge, challengeConfig, blockNumber);

  return (
    <div className="grid grid-cols-6 gap-5 p-3 items-center">
      <div className="px-3 py-2 bg-white/10">
        <CommitmentBlock commitment={commitment} />
      </div>
      <ChallengeStatusCell status={status} />
      <ChallengeDetailCells
        blockNumber={blockNumber}
        challengeConfig={challengeConfig}
        commitment={commitment}
      />
      <CommitmentAddresses commitment={commitment} />
      <div className="flex-shrink-0 flex items-center justify-end gap-2">
        <CommitmentButton
          blockNumber={blockNumber}
          challengeConfig={challengeConfig}
          commitment={commitment}
          status={status}
        />
        {/* TODO: passHref isn't working */}
        <Link passHref href={`/commitments/${commitment.inputHash}`}>
          <TertiaryButtonLink icon={<ArrowRightIcon />} />
        </Link>
      </div>
    </div>
  );
}
