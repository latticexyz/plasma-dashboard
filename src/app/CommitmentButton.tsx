import { holesky } from "wagmi/chains";
import {
  InputCommitment,
  ChallengeStatus,
  challengeContractAbi,
  challengeContract,
  secondsPerBlock,
} from "@/common";
import { TerminalIcon } from "@/ui/icons/TerminalIcon";
import { ChallengeConfig } from "@/getChallengeConfig";
import { ConnectedWriteButton } from "@/ui/ConnectedWriteButton";
import { Modal } from "@/ui/Modal";
import { ChallengeModalContent } from "./ChallengeModalContent";
import { ModalContent } from "@/ui/ModalContent";
import { ResolveModalContent } from "./ResolveModalContent";

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
            <span className="font-mono uppercase text-xs">Resolve</span>
          </button>
        }
      >
        <ResolveModalContent
          blockNumber={blockNumber}
          challengeConfig={challengeConfig}
          commitment={commitment}
          challenge={{
            blockNumber: commitment.blockNumber + 10n,
            blockTimestamp: commitment.blockTimestamp + 10 * secondsPerBlock,
            txHash: commitment.txHash,
            txFrom: commitment.txFrom,
            status: 1,
          }}
        />
      </Modal>
    );

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

  const challenge = commitment.challenges[0];
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
            <span className="font-mono uppercase text-xs">Withdraw</span>
          </button>
        }
      >
        <ModalContent
          title="Unblock bond"
          description="Since the data was not made available for this input commitment, or the challenge expired, your bond has now been made claimable."
        >
          <div className="text-sm">
            <ConnectedWriteButton
              write={{
                chainId: holesky.id,
                address: challengeContract,
                abi: challengeContractAbi,
                // TODO: replace with unlock
                functionName: "withdraw",
              }}
              label="Unlock bond"
            />
          </div>
        </ModalContent>
      </Modal>
    );
  }

  return null;
}
