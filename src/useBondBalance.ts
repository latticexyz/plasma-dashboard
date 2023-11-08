import { useAccount, useContractRead } from "wagmi";
import { holesky } from "wagmi/chains";
import { challengeContract, challengeContractAbi } from "./common";

export function useBondBalance() {
  const { address } = useAccount();
  return useContractRead({
    enabled: !!address,
    watch: true,
    chainId: holesky.id,
    address: challengeContract,
    abi: challengeContractAbi,
    functionName: "balances",
    args: [address ?? "0x"],
  });
}
