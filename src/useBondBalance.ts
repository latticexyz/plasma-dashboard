import { useAccount, useContractRead } from "wagmi";
import { challengeContract, challengeContractAbi } from "./common";
import { redstoneDevnetL1 } from "./chains/redstoneDevnetL1";

export function useBondBalance() {
  const { address } = useAccount();
  return useContractRead({
    enabled: !!address,
    watch: true,
    chainId: redstoneDevnetL1.id,
    address: challengeContract,
    abi: challengeContractAbi,
    functionName: "balances",
    args: [address ?? "0x"],
  });
}
