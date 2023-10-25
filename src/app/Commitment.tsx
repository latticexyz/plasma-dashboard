import { BlockIcon } from "@/icons/BlockIcon";
import { InputCommitment } from "@/common";
import { getChallengeStatus } from "@/getChallengeStatus";
import { SendIcon } from "@/icons/SendIcon";
import { InboxIcon } from "@/icons/InboxIcon";
import { TruncatedAddress } from "./TruncatedAddress";
import { ArrowRightIcon } from "@/icons/ArrowRightIcon";
import { TerminalIcon } from "@/icons/TerminalIcon";
import { ChallengeStatusIcon } from "./ChallengeStatusIcon";
import { ChallengeStatusLabel } from "./ChallengeStatusLabel";

type Props = {
  commitment: InputCommitment;
};

export function Commitment({ commitment }: Props) {
  const status = getChallengeStatus(commitment);
  return (
    <div className="grid grid-cols-6 px-3 py-2 gap-4">
      <div className="flex items-center px-3 py-2 gap-3 bg-white/10">
        <div className="flex-shrink-0 text-2xl">
          <BlockIcon />
        </div>
        <div className="flex-grow flex flex-col items-end">
          <div className="flex-grow text-white text-lg leading-6 font-mono">
            {commitment.blockNumber.toString()}
          </div>
          <div className="text-xs leading-6 font-mono">00/00 00:00</div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-xs leading-6 font-mono uppercase">Status</div>
        <div className="flex items-center gap-1.5">
          <div className="font-mono">
            <ChallengeStatusIcon status={status} />
          </div>
          <div className="font-mono uppercase text-white">
            <ChallengeStatusLabel status={status} />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-xs leading-6 font-mono uppercase">
          Challenge window
        </div>
        <div className="font-mono uppercase">
          <span className="text-white">42</span> blocks
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-xs leading-6 font-mono uppercase">Ends (est.)</div>
        <div className="font-mono uppercase text-white">00/00 00:00</div>
      </div>
      <div className="flex flex-col justify-center gap-2">
        <div className="flex gap-2">
          <div className="flex-shrink-0">
            <SendIcon />
          </div>
          <div className="font-mono uppercase text-xs text-white">
            <TruncatedAddress address={commitment.txFrom} />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-shrink-0">
            <InboxIcon />
          </div>
          <div className="font-mono uppercase text-xs text-white">
            <TruncatedAddress address={commitment.txTo} />
          </div>
        </div>
      </div>
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
      {/* block: {commitment.blockNumber?.toString()}; commitment:{" "}
      {commitment.inputCommitment}; from: {commitment.txFrom}; to:{" "}
      {commitment.txTo} */}
    </div>
  );
}
