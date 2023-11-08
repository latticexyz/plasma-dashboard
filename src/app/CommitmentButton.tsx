import { InputCommitment, ChallengeStatus } from "@/common";
import { TerminalIcon } from "@/ui/icons/TerminalIcon";
import { ChallengeConfig } from "@/getChallengeConfig";
import { Modal } from "@/ui/Modal";
import { ChallengeModalContent } from "./ChallengeModalContent";
import { ResolveModalContent } from "./ResolveModalContent";
import { UnlockBondModalContent } from "./UnlockBondModalContent";

type Props = {
  blockNumber: bigint;
  challengeConfig: ChallengeConfig;
  commitment: InputCommitment;
  status: ChallengeStatus;
};

export function CommitmentButton({
  blockNumber,
  challengeConfig,
  commitment,
  status,
}: Props) {
  if (status === ChallengeStatus.Unchallenged) {
    return (
      <Modal
        trigger={
          <button
            type="button"
            className="flex-grow flex items-center px-3 py-2 gap-2 bg-white text-black"
          >
            <TerminalIcon />
            <span className="font-mono uppercase text-xs">Challenge</span>
          </button>
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

  const challenge = commitment.challenge;
  // TODO: some state for challenged status but no challenge
  if (status === ChallengeStatus.Challenged && challenge) {
    return (
      <Modal
        trigger={
          <button
            type="button"
            className="flex-grow flex items-center px-3 py-2 gap-2 bg-white text-black"
          >
            <TerminalIcon />
            <span className="font-mono uppercase text-xs">Resolve</span>
          </button>
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
          <button
            type="button"
            className="flex-grow flex items-center px-3 py-2 gap-2 bg-white text-black"
          >
            <TerminalIcon />
            <span className="font-mono uppercase text-xs">Unlock bond</span>
          </button>
        }
      >
        <UnlockBondModalContent commitment={commitment} />
      </Modal>
    );
  }

  return null;
}
