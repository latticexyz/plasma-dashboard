import {
  InputCommitment,
  ChallengeStatus,
  challengeContractAbi,
  challengeContract,
} from "@/common";
import { TerminalIcon } from "@/ui/icons/TerminalIcon";
import { ChallengeConfig } from "@/getChallengeConfig";
import { redstoneDevnetL1 } from "@/chains/redstoneDevnetL1";
import { ConnectedWriteButton } from "@/ui/ConnectedWriteButton";
import { Modal } from "@/ui/Modal";
import { ChallengeModalContent } from "./ChallengeModalContent";
import { ModalContent } from "@/ui/ModalContent";

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

  if (status === ChallengeStatus.Challenged) {
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
        <ModalContent
          title="Resolve"
          description="Prove that you have the data for a challenged block to make sure the transactions included in the block are kept as part of the network state."
        >
          <div className="text-sm">
            <ConnectedWriteButton
              write={{
                chainId: redstoneDevnetL1.id,
                address: challengeContract,
                abi: challengeContractAbi,
                functionName: "resolve",
                // TODO: get input data from somewhere
                args: [commitment.blockNumber, "0x"],
              }}
              label="Resolve"
            />
          </div>
        </ModalContent>
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
                chainId: redstoneDevnetL1.id,
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
