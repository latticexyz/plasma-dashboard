"use client";

import { holesky } from "wagmi/chains";
import {
  Challenge,
  ChallengeStatus,
  InputCommitment,
  secondsPerBlock,
} from "@/common";
import { ChallengeConfig } from "@/getChallengeConfig";
import { LabeledBox } from "@/ui/LabeledBox";
import { ShortTimestamp } from "@/ui/ShortTimestamp";
import { getChallengeStatus } from "@/getChallengeStatus";
import { bigIntMax } from "@latticexyz/common/utils";
import { TruncatedHex } from "@/ui/TruncatedHex";
import { useBlockNumber } from "wagmi";

type Props = {
  blockNumber: bigint;
  challengeConfig: ChallengeConfig;
  commitment: InputCommitment;
};

export function ChallengeDetailCells({
  blockNumber,
  challengeConfig,
  commitment,
}: Props) {
  const challenge = commitment.latestChallenge;
  const status = getChallengeStatus(challenge, challengeConfig, blockNumber);

  if (!challenge || status === ChallengeStatus.Unchallenged) {
    const blocksElapsed = blockNumber - commitment.blockNumber;
    const blocksLeft = bigIntMax(
      0n,
      challengeConfig.challengeWindowBlocks - blocksElapsed
    );
    return (
      <>
        <LabeledBox label="Challenge window">
          <span className="font-mono uppercase">
            <span className="text-white">{blocksLeft.toString()}</span> blocks
          </span>
        </LabeledBox>
        <LabeledBox label="Ends (est.)">
          <span className="font-mono text-white">
            <ShortTimestamp
              timestamp={
                Math.floor(Date.now() / 1000) +
                Number(blocksLeft) * secondsPerBlock
              }
            />
          </span>
        </LabeledBox>
      </>
    );
  }

  const blocksElapsed = blockNumber - challenge.blockNumber;
  const blocksLeft = challengeConfig.resolveWindowBlocks - blocksElapsed;
  const deadline =
    Math.floor(Date.now() / 1000) + Number(blocksLeft) * secondsPerBlock;

  if (status === ChallengeStatus.Challenged) {
    return (
      <>
        <LabeledBox label="Resolve window">
          <span className="font-mono uppercase">
            <span className="text-white">
              {bigIntMax(0n, blocksLeft).toString()}
            </span>{" "}
            blocks
          </span>
        </LabeledBox>
        <LabeledBox label="Ends (est.)">
          <span className="font-mono text-white">
            <ShortTimestamp timestamp={deadline} />
          </span>
        </LabeledBox>
      </>
    );
  }

  if (status === ChallengeStatus.Resolved) {
    return (
      <>
        <LabeledBox label="Resolved by">
          <span className="font-mono text-white">
            <TruncatedHex hex={challenge.txFrom} />
          </span>
        </LabeledBox>
        <LabeledBox label="Ended">
          <span className="font-mono text-white">
            <ShortTimestamp timestamp={challenge.blockTimestamp} />
          </span>
        </LabeledBox>
      </>
    );
  }

  if (status === ChallengeStatus.Expired) {
    return (
      <>
        <LabeledBox label="Resolve window">
          <span className="font-mono uppercase">
            <span className="text-white">0</span> blocks
          </span>
        </LabeledBox>
        <LabeledBox
          label={status === ChallengeStatus.Expired ? "Ended" : "Ended (est)."}
        >
          <span className="font-mono text-white">
            <ShortTimestamp timestamp={deadline} />
          </span>
        </LabeledBox>
      </>
    );
  }

  // TODO: return something different for an unknown/unspecified status type?
  return null;
}
