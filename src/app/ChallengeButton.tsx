import { usePrepareContractWrite, useContractWrite } from "wagmi";
import {
  InputCommitment,
  challengeContract,
  challengeContractAbi,
} from "@/common";
import { redstoneDevnetL1 } from "@/chains/redstoneDevnetL1";
import { PendingIcon } from "@/icons/PendingIcon";

type Props = {
  commitment: InputCommitment;
};

// TODO: migrate to consistent button with support for pending state

export function ChallengeButton({ commitment }: Props) {
  // TODO: check for chain, offer to switch
  // TODO: attach (`bondSize` - balance) value once `challenge` method supports payable
  const {
    config,
    isLoading: isPrepareLoading,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    chainId: redstoneDevnetL1.id,
    address: challengeContract,
    abi: challengeContractAbi,
    functionName: "challenge",
    args: [commitment.blockNumber, commitment.inputHash],
  });
  const { write, isLoading: isWriteLoading } = useContractWrite(config);
  const isPending = isPrepareLoading || isWriteLoading;
  // TODO: show errors (e.g. bond balance too low, out of window)
  return (
    <button
      type="button"
      disabled={isPending || isPrepareError}
      onClick={write}
      className="bg-black text-white p-4 disabled:opacity-50"
    >
      {isPending ? <PendingIcon /> : <>Challenge</>}
    </button>
  );
}
