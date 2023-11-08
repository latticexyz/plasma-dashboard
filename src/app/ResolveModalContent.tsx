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
import { ClockIcon } from "@/ui/icons/ClockIcon";
import { bigIntMax } from "@latticexyz/common/utils";
import Link from "next/link";
import { stringToHex } from "viem";
import { useMemo, useState } from "react";
import { usePromise } from "@/usePromise";
import { Button } from "@/ui/Button";

type Props = {
  blockNumber: bigint;
  challengeConfig: ChallengeConfig;
  commitment: InputCommitment;
  challenge: Challenge;
};

export function ResolveModalContent({
  blockNumber,
  challengeConfig,
  commitment,
  challenge,
}: Props) {
  const [dataUrl, setDataUrl] = useState(
    // TODO: move endpoint to env var?
    `https://17001-da.quarry.linfra.xyz/get/${commitment.inputHash}`
  );

  const dataResult = usePromise(
    useMemo(() => fetch(dataUrl).then((res) => res.text()), [dataUrl])
  );

  const blocksElapsed = blockNumber - challenge.blockNumber;
  const blocksLeft = bigIntMax(
    0n,
    challengeConfig.resolveWindowBlocks - blocksElapsed
  );

  return (
    <ModalContent
      title="Resolve"
      description="Prove that you have the data for a challenged block to make sure the transactions included in the block are kept as part of the network state."
    >
      <div className="grid grid-cols-2 gap-4">
        <LabeledBox label="Block number">
          <div className="border border-white/10 px-3 py-1.5">
            <TimeBox
              icon={<BlockIcon />}
              label={commitment.blockNumber.toString()}
              timestamp={commitment.blockTimestamp}
            />
          </div>
        </LabeledBox>
        <LabeledBox label="Resolve window">
          <div className="border border-white/10 px-3 py-1.5">
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
      <LabeledBox label="Data URL">
        <input
          type="url"
          className="p-4 bg-white/10 text-white font-mono leading-none"
          value={dataUrl}
          onChange={(event) => setDataUrl(event.currentTarget.value)}
        />
      </LabeledBox>
      <p className="text-sm">
        Provide a link to the input data for the commitment for this block. The
        input data will be retrieved and validated.
      </p>
      {dataResult.status === "pending" || dataResult.status === "idle" ? (
        <Button pending>Resolve challenge</Button>
      ) : dataResult.status === "rejected" ? (
        // TODO: show more info about why this failed
        <Button disabled>Could not fetch data</Button>
      ) : (
        <ConnectedWriteButton
          label="Resolve challenge"
          // TODO: be able to set pending/error here or some prerequisite promise
          write={{
            chainId: holesky.id,
            address: challengeContract,
            abi: challengeContractAbi,
            functionName: "resolve",
            args: [
              commitment.blockNumber,
              commitment.inputHash,
              stringToHex(dataResult.value),
            ],
          }}
        />
      )}
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
