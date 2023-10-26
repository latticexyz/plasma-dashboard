import { InputCommitment } from "@/common";
import { SendIcon } from "@/icons/SendIcon";
import { InboxIcon } from "@/icons/InboxIcon";
import { TruncatedAddress } from "./TruncatedAddress";

type Props = {
  commitment: InputCommitment;
};

export function CommitmentAddresses({ commitment }: Props) {
  return (
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
  );
}