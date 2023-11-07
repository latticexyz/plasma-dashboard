import {
  InputCommitment,
  ChallengeStatus,
  challengeContractAbi,
  challengeContract,
} from "@/common";
import { TerminalIcon } from "@/ui/icons/TerminalIcon";
import { BondBalance } from "./BondBalance";
import { ChallengeConfig } from "@/getChallengeConfig";
import { redstoneDevnetL1 } from "@/chains/redstoneDevnetL1";
import { ConnectedWriteButton } from "@/ui/ConnectedWriteButton";
import { Modal } from "@/ui/Modal";

type Props = {
  challengeConfig: ChallengeConfig;
  commitment: InputCommitment;
  status: ChallengeStatus;
};

export function CommitmentButton({
  challengeConfig,
  commitment,
  status,
}: Props) {
  if (status === ChallengeStatus.Unchallenged) {
    return (
      <Modal
        title="Challenge"
        description="If data is not retrievable, challenge the the commitment to force the data provider to make the data available, or the network considers the input no longer valid."
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
        <div className="flex flex-col items-start gap-2 text-sm">
          <ConnectedWriteButton
            write={{
              chainId: redstoneDevnetL1.id,
              address: challengeContract,
              abi: challengeContractAbi,
              functionName: "challenge",
              args: [commitment.blockNumber, commitment.inputHash],
            }}
            label="Challenge"
          />
          <ConnectedWriteButton
            write={{
              chainId: redstoneDevnetL1.id,
              address: challengeContract,
              abi: challengeContractAbi,
              functionName: "deposit",
              value: challengeConfig.bondSize,
            }}
            label="Deposit bond"
          />
          <div>
            Bond balance: <BondBalance />
          </div>
        </div>
      </Modal>
    );
  }

  if (status === ChallengeStatus.Challenged) {
    return (
      <Modal
        title="Resolve"
        description="Prove that you have the data for a challenged block to make sure the transactions included in the block are kept as part of the network state."
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
      </Modal>
    );
  }

  if (status === ChallengeStatus.Expired) {
    return (
      <Modal
        title="Unblock bond"
        description="Since the data was not made available for this input commitment, or the challenge expired, your bond has now been made claimable."
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
      </Modal>
    );
  }

  return null;
}
