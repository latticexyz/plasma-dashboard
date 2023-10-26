import { InputCommitment } from "@/common";
import { getChallengeStatus } from "@/getChallengeStatus";
import { ArrowRightIcon } from "@/icons/ArrowRightIcon";
import { TerminalIcon } from "@/icons/TerminalIcon";
import { ChallengeStatusIcon } from "./ChallengeStatusIcon";
import { ChallengeStatusLabel } from "./ChallengeStatusLabel";
import { getChallengeConfig } from "@/getChallengeConfig";
import { client } from "@/viemClient";
import { CommitmentBlock } from "./CommitmentBlock";
import { CommitmentAddresses } from "./CommitmentAddresses";
import { LabeledCell } from "./LabeledCell";
import { ChallengeCells } from "./ChallengeCells";
import { getBlockNumber } from "viem/actions";

type Props = {
  commitment: InputCommitment;
};

export async function Commitment({ commitment }: Props) {
  const [blockNumber, challengeConfig] = await Promise.all([
    getBlockNumber(client),
    getChallengeConfig(client),
  ]);
  const status = getChallengeStatus(commitment, challengeConfig, blockNumber);
  return (
    <div className="grid grid-cols-6 gap-5 p-3">
      <CommitmentBlock commitment={commitment} />
      <LabeledCell label="Status">
        <div className="flex items-center gap-2">
          <ChallengeStatusIcon status={status} />
          <span className="text-white">
            <ChallengeStatusLabel status={status} />
          </span>
        </div>
      </LabeledCell>
      <ChallengeCells
        latestBlockNumber={blockNumber}
        commitment={commitment}
        challengeConfig={challengeConfig}
      />
      <CommitmentAddresses commitment={commitment} />
      <div className="flex items-center">
        <div className="flex-grow flex gap-2">
          <button
            type="button"
            className="flex-grow flex items-center px-3 py-2 gap-2 bg-white text-black"
          >
            <TerminalIcon />
            <span className="font-mono uppercase text-xs">Challenge</span>
          </button>
          <button
            type="button"
            className="flex-shrink-0 px-3 py-2 bg-white/20 text-white"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
