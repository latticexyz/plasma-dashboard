import { BlockIcon } from "@/icons/BlockIcon";
import { InputCommitment } from "@/common";
import { ShortTimestamp } from "./ShortTimestamp";

type Props = {
  commitment: InputCommitment;
};

export function CommitmentBlock({ commitment }: Props) {
  return (
    <div className="flex items-center px-3 py-2 gap-3 bg-white/10">
      <div className="flex-shrink-0 text-2xl">
        <BlockIcon />
      </div>
      <div className="flex-grow flex flex-col items-end">
        <div className="flex-grow text-white text-lg font-mono">
          {commitment.blockNumber.toString()}
        </div>
        <div className="text-xs font-mono whitespace-nowrap">
          <ShortTimestamp timestamp={commitment.blockTimestamp} />
        </div>
      </div>
    </div>
  );
}
