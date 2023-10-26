"use client";

import { ChallengeStatus, InputCommitment, secondsPerBlock } from "@/common";
import { ChallengeConfig } from "@/getChallengeConfig";
import { useLatestBlockNumber } from "@/useLatestBlockNumber";
import { LabeledCell } from "./LabeledCell";
import { ShortTimestamp } from "./ShortTimestamp";
import { getChallengeStatus } from "@/getChallengeStatus";
import { bigIntMax } from "@latticexyz/common/utils";
import { TruncatedAddress } from "./TruncatedAddress";

type Props = {
  latestBlockNumber: bigint;
  commitment: InputCommitment;
  challengeConfig: ChallengeConfig;
};

export function ChallengeCells({
  latestBlockNumber,
  commitment,
  challengeConfig,
}: Props) {
  const blockNumber = useLatestBlockNumber(latestBlockNumber);
  const status = getChallengeStatus(commitment, challengeConfig, blockNumber);

  if (status === ChallengeStatus.Unchallenged) {
    const blocksElapsed = blockNumber - commitment.blockNumber;
    const blocksLeft = bigIntMax(
      0n,
      challengeConfig.challengeWindowBlocks - blocksElapsed
    );

    return (
      <>
        <LabeledCell label="Challenge window">
          <span className="text-white">{blocksLeft.toString()}</span> blocks
        </LabeledCell>
        <LabeledCell label="Ends (est.)">
          <span className="text-white">
            <ShortTimestamp
              timestamp={
                Math.floor(Date.now() / 1000) +
                Number(blocksLeft) * secondsPerBlock
              }
            />
          </span>
        </LabeledCell>
      </>
    );
  }

  if (status === ChallengeStatus.Challenged) {
    // TODO: tie together status type and challenge being not null
    if (!commitment.challenge) throw new Error("invalid status");
    const blocksElapsed = blockNumber - commitment.challenge.blockNumber;
    const blocksLeft = challengeConfig.resolveWindowBlocks - blocksElapsed;

    return (
      <>
        <LabeledCell label="Resolve window">
          <span className="text-white">
            {bigIntMax(0n, blocksLeft).toString()}
          </span>{" "}
          blocks
        </LabeledCell>
        <LabeledCell label="Ends (est.)">
          <span className="text-white">
            <ShortTimestamp
              timestamp={
                Math.floor(Date.now() / 1000) +
                Number(blocksLeft) * secondsPerBlock
              }
            />
          </span>
        </LabeledCell>
      </>
    );
  }

  if (status === ChallengeStatus.Resolved) {
    // TODO: tie together status type and challenge being not null
    if (!commitment.challenge) throw new Error("invalid status");

    return (
      <>
        <LabeledCell label="Resolved by">
          <span className="text-white">
            <TruncatedAddress address={commitment.challenge.txFrom} />
          </span>
        </LabeledCell>
        <LabeledCell label="Ended">
          <span className="text-white">
            <ShortTimestamp timestamp={commitment.challenge.blockTimestamp} />
          </span>
        </LabeledCell>
      </>
    );
  }

  if (status === ChallengeStatus.Expiring) {
    // TODO: tie together status type and challenge being not null
    if (!commitment.challenge) throw new Error("invalid status");
    const blocksElapsed = blockNumber - commitment.challenge.blockNumber;
    const blocksLeft = challengeConfig.resolveWindowBlocks - blocksElapsed;
    return (
      <>
        <LabeledCell label="Resolve window">
          <span className="text-white">
            <span className="text-white">
              {bigIntMax(0n, blocksLeft).toString()}
            </span>{" "}
            blocks
          </span>
        </LabeledCell>
        <LabeledCell label="Ended (est.)">
          <span className="text-white">
            <ShortTimestamp
              timestamp={
                Math.floor(Date.now() / 1000) +
                Number(blocksLeft) * secondsPerBlock
              }
            />
          </span>
        </LabeledCell>
      </>
    );
  }

  return (
    <>
      <LabeledCell label="Challenge window">
        <span className="text-white">42</span> blocks
      </LabeledCell>
      <LabeledCell label="Ends (est.)">
        <span className="text-white">
          <ShortTimestamp
            timestamp={
              commitment.blockTimestamp + challengeConfig.challengeWindowSeconds
            }
          />
        </span>
      </LabeledCell>
    </>
  );
}
