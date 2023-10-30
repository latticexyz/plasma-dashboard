import { InputCommitment, ChallengeStatus } from "@/common";
import { TerminalIcon } from "@/icons/TerminalIcon";
import { DialogButton } from "./DialogButton";

type Props = {
  commitment: InputCommitment;
  status: ChallengeStatus;
};

export function ChallengeButton({ commitment, status }: Props) {
  if (status === ChallengeStatus.Unchallenged) {
    return (
      <DialogButton
        className="flex-grow"
        label={
          <>
            <TerminalIcon />
            <span className="font-mono uppercase text-xs">Challenge</span>
          </>
        }
      >
        TODO
      </DialogButton>
    );
  }

  if (status === ChallengeStatus.Challenged) {
    return (
      <DialogButton
        className="flex-grow"
        label={
          <>
            <TerminalIcon />
            <span className="font-mono uppercase text-xs">Resolve</span>
          </>
        }
      >
        TODO
      </DialogButton>
    );
  }

  if (status === ChallengeStatus.Expiring) {
    return (
      <DialogButton
        className="flex-grow"
        label={
          <>
            <TerminalIcon />
            <span className="font-mono uppercase text-xs">Expire</span>
          </>
        }
      >
        TODO
      </DialogButton>
    );
  }

  return null;
}
