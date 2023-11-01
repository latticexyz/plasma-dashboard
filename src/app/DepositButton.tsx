import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { challengeContract, challengeContractAbi } from "@/common";
import { redstoneDevnetL1 } from "@/chains/redstoneDevnetL1";
import { PendingIcon } from "@/icons/PendingIcon";
import { ChallengeConfig } from "@/getChallengeConfig";
import { formatEther } from "viem";

type Props = {
  challengeConfig: ChallengeConfig;
};

// TODO: migrate to consistent button with support for pending state

export function DepositButton({ challengeConfig }: Props) {
  // TODO: check for chain, offer to switch
  const {
    config,
    isLoading: isPrepareLoading,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    chainId: redstoneDevnetL1.id,
    address: challengeContract,
    abi: challengeContractAbi,
    functionName: "deposit",
    value: challengeConfig.bondSize,
  });
  const { write, isLoading: isWriteLoading } = useContractWrite(config);
  const isPending = isPrepareLoading || isWriteLoading;
  // TODO: show errors (e.g. eth balance too low)
  return (
    <button
      type="button"
      disabled={isPending || isPrepareError}
      onClick={write}
      className="bg-black text-white p-4 disabled:opacity-50"
      title={`Deposit ${formatEther(challengeConfig.bondSize)} ETH`}
    >
      {isPending ? <PendingIcon /> : <>Deposit bond</>}
    </button>
  );
}
