import { holesky } from "wagmi/chains";
import {
  secondsPerBlock,
  challengeContract,
  challengeContractAbi,
  InputCommitment,
  Challenge,
} from "@/common";
import { ChallengeConfig } from "@/getChallengeConfig";
import { ConnectedWriteButton } from "@/ui/ConnectedWriteButton";
import { LabeledBox } from "@/ui/LabeledBox";
import { ModalContent } from "@/ui/ModalContent";
import { TimeBox } from "@/ui/TimeBox";
import { BlockIcon } from "@/ui/icons/BlockIcon";
import Link from "next/link";
import { formatEther } from "viem";
import { useContractRead } from "wagmi";

type Props = {
  commitment: InputCommitment;
};

export function UnlockBondModalContent({ commitment }: Props) {
  const challenge = useContractRead({
    watch: true,
    chainId: holesky.id,
    address: challengeContract,
    abi: challengeContractAbi,
    functionName: "challenges",
    args: [commitment.blockNumber, commitment.inputHash],
  });

  const [challenger, lockedBond, startBlock, resolvedBlock] =
    challenge.data ?? [];

  return (
    <ModalContent
      title="Unlock bond"
      description="Since the data was not made available for this input commitment, or the challenge expired, your bond has now been made claimable."
    >
      <div className="grid grid-cols-2 gap-4">
        <LabeledBox label="Block number">
          <div className="flex-grow border border-white/10 px-3 py-1.5">
            <TimeBox
              icon={<BlockIcon />}
              label={commitment.blockNumber.toString()}
              timestamp={commitment.blockTimestamp}
            />
          </div>
        </LabeledBox>
        <LabeledBox label="Submitted bond">
          <div className="flex-grow border border-white/10 px-3 py-1.5 flex items-center justify-between">
            <span className="text-white font-mono uppercase text-lg leading-none">
              {lockedBond ? formatEther(lockedBond) : "??"}
            </span>
            <span className="font-mono uppercase text-sm leading-none">
              ETH
            </span>
          </div>
        </LabeledBox>
      </div>
      <ConnectedWriteButton
        className="text-base"
        label="Unlock bond"
        write={{
          chainId: holesky.id,
          address: challengeContract,
          abi: challengeContractAbi,
          functionName: "unlockBond",
          args: [commitment.blockNumber, commitment.inputHash],
        }}
      />
      <div className="flex gap-2 items-center">
        <div className="font-mono uppercase text-sm">
          Not sure what this is?
        </div>
        <div className="flex-grow bg-white/10 h-px"></div>
        <div className="font-mono uppercase text-sm">
          {/* TODO */}
          <Link
            href="/"
            className="text-red-500 transition hover:brightness-150"
          >
            Learn more
          </Link>
        </div>
      </div>
    </ModalContent>
  );
}
