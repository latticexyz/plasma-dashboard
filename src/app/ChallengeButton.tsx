import { InputCommitment, ChallengeStatus } from "@/common";
import { TerminalIcon } from "@/icons/TerminalIcon";

type Props = {
  commitment: InputCommitment;
  status: ChallengeStatus;
};

export function ChallengeButton({ commitment, status }: Props) {
  if (status === ChallengeStatus.Unchallenged) {
    return (
      <button
        type="button"
        className="flex-grow flex items-center px-3 py-2 gap-2 bg-white text-black"
        onClick={() => alert("not implemented yet")}
      >
        <TerminalIcon />
        <span className="font-mono uppercase text-xs">Challenge</span>
      </button>
    );
  }

  if (status === ChallengeStatus.Challenged) {
    return (
      <button
        type="button"
        className="flex-grow flex items-center px-3 py-2 gap-2 bg-white text-black"
        onClick={() => alert("not implemented yet")}
      >
        <TerminalIcon />
        <span className="font-mono uppercase text-xs">Resolve</span>
      </button>
    );
  }

  if (status === ChallengeStatus.Expiring) {
    return (
      <button
        type="button"
        className="flex-grow flex items-center px-3 py-2 gap-2 bg-white text-black"
        onClick={() => alert("not implemented yet")}
      >
        <TerminalIcon />
        <span className="font-mono uppercase text-xs">Expire</span>
      </button>
    );
  }

  return null;
}
