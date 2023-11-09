"use client";

import { InputCommitment, ChallengeStatus } from "@/common";
import { TerminalIcon } from "@/ui/icons/TerminalIcon";
import { ChallengeConfig } from "@/getChallengeConfig";
import { Modal } from "@/ui/Modal";
import { ChallengeModalContent } from "./ChallengeModalContent";
import { ResolveModalContent } from "./ResolveModalContent";
import { UnlockBondModalContent } from "./UnlockBondModalContent";
import { SecondaryButton } from "@/ui/SecondaryButton";

type Props = {
  blockNumber: bigint;
  challengeConfig: ChallengeConfig;
  commitment: InputCommitment;
  status: ChallengeStatus;
  className?: string;
};

export function CommitmentButton({
  blockNumber,
  challengeConfig,
  commitment,
  status,
  className,
}: Props) {
  if (status === ChallengeStatus.Unchallenged) {
    return (
      <Modal
        trigger={
          <SecondaryButton
            className={className}
            icon={<TerminalIcon />}
            label="Challenge"
          />
        }
      >
        <ChallengeModalContent
          blockNumber={blockNumber}
          challengeConfig={challengeConfig}
          commitment={commitment}
        />
      </Modal>
    );
  }

  const challenge = commitment.latestChallenge;
  // TODO: some state for challenged status but no challenge
  if (status === ChallengeStatus.Challenged && challenge) {
    return (
      <Modal
        trigger={
          <SecondaryButton
            className={className}
            icon={<TerminalIcon />}
            label="Resolve"
          />
        }
      >
        <ResolveModalContent
          blockNumber={blockNumber}
          challengeConfig={challengeConfig}
          commitment={commitment}
          challenge={challenge}
        />
      </Modal>
    );
  }

  if (status === ChallengeStatus.Expired) {
    return (
      <Modal
        trigger={
          <SecondaryButton
            className={className}
            icon={<TerminalIcon />}
            label="Unlock bond"
          />
        }
      >
        <UnlockBondModalContent commitment={commitment} />
      </Modal>
    );
  }

  return null;
}
