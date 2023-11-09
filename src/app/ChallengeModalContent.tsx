import { holesky } from "wagmi/chains";
import {
  secondsPerBlock,
  challengeContract,
  challengeContractAbi,
  InputCommitment,
  learnMoreUrl,
} from "@/common";
import { ChallengeConfig } from "@/getChallengeConfig";
import { ConnectedWriteButton } from "@/ui/ConnectedWriteButton";
import { LabeledBox } from "@/ui/LabeledBox";
import { ModalContent } from "@/ui/ModalContent";
import { TimeBox } from "@/ui/TimeBox";
import { BlockIcon } from "@/ui/icons/BlockIcon";
import { ClockIcon } from "@/ui/icons/ClockIcon";
import { bigIntMax } from "@latticexyz/common/utils";
import Link from "next/link";
import { formatEther } from "viem";

type Props = {
  blockNumber: bigint;
  challengeConfig: ChallengeConfig;
  commitment: InputCommitment;
};

export function ChallengeModalContent({
  blockNumber,
  challengeConfig,
  commitment,
}: Props) {
  const blocksElapsed = blockNumber - commitment.blockNumber;
  const blocksLeft = bigIntMax(
    0n,
    challengeConfig.challengeWindowBlocks - blocksElapsed
  );

  return (
    <ModalContent
      title="Challenge"
      description="If data is not retrievable, challenge the the commitment to force the data provider to make the data available, or the network considers the input no longer valid."
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
        <LabeledBox label="Challenge window">
          <div className="flex-grow border border-white/10 px-3 py-1.5">
            <TimeBox
              icon={<ClockIcon />}
              // TODO: move this math into helpers
              label={`${Math.floor(
                (Number(blocksLeft) * secondsPerBlock) / 60 / 60
              )} hours`}
              timestamp={
                Math.floor(Date.now() / 1000) +
                Number(blocksLeft) * secondsPerBlock
              }
            />
          </div>
        </LabeledBox>
      </div>
      <LabeledBox label="Required bond">
        {/* TODO: is this meant to be a `readonly` input field? */}
        <div className="p-4 bg-white/10 flex items-center justify-between">
          <span className="text-white font-mono uppercase text-lg leading-none">
            {formatEther(challengeConfig.bondSize)}
          </span>
          <span className="font-mono uppercase text-sm leading-none">ETH</span>
        </div>
      </LabeledBox>
      <p className="text-sm">
        If data is not available for this input commitment, your bond is
        returned. If the data is proved available, your bond is burned.
      </p>
      <ConnectedWriteButton
        className="text-base"
        label="Challenge"
        write={{
          chainId: holesky.id,
          address: challengeContract,
          abi: challengeContractAbi,
          functionName: "challenge",
          args: [commitment.blockNumber, commitment.inputHash],
          value: challengeConfig.bondSize,
        }}
      />
      <div className="flex gap-2 items-center">
        <div className="font-mono uppercase text-sm">
          Not sure what this is?
        </div>
        <div className="flex-grow bg-white/10 h-px"></div>
        <div className="font-mono uppercase text-sm">
          <a
            href={learnMoreUrl}
            className="text-red-500 transition hover:brightness-150"
            target="_blank"
          >
            Learn more
          </a>
        </div>
      </div>
    </ModalContent>
  );
}
