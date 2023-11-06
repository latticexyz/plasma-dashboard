import {
  InputCommitment,
  ChallengeStatus,
  challengeContractAbi,
  challengeContract,
} from "@/common";
import { TerminalIcon } from "@/ui/icons/TerminalIcon";
import { DialogButton } from "@/ui/DialogButton";
import { BondBalance } from "./BondBalance";
import { ChallengeConfig } from "@/getChallengeConfig";
import { redstoneDevnetL1 } from "@/chains/redstoneDevnetL1";
import { ConnectedWriteButton } from "@/ui/ConnectedWriteButton";

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
      <DialogButton
        className="flex-grow"
        label={
          <>
            <TerminalIcon />
            <span className="font-mono uppercase text-xs">Challenge</span>
          </>
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
      </DialogButton>
    );
  }

  if (status === ChallengeStatus.Challenged) {
    return (
      <DialogButton
        className="flex-grow"
        label={
          <>
            <TerminalIcon />
            <span className="font-mono uppercase text-xs">Resolve</span>
          </>
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
      </DialogButton>
    );
  }

  if (status === ChallengeStatus.Expiring) {
    return (
      <DialogButton
        className="flex-grow"
        label={
          <>
            <TerminalIcon />
            <span className="font-mono uppercase text-xs">Expire</span>
          </>
        }
      >
        <div className="text-sm">
          <ConnectedWriteButton
            write={{
              chainId: redstoneDevnetL1.id,
              address: challengeContract,
              abi: challengeContractAbi,
              functionName: "expire",
              args: [commitment.blockNumber, commitment.inputHash],
            }}
            label="Expire"
          />
        </div>
      </DialogButton>
    );
  }

  return null;
}
