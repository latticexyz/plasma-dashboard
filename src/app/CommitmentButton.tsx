import { InputCommitment, ChallengeStatus } from "@/common";
import { TerminalIcon } from "@/icons/TerminalIcon";
import { DialogButton } from "./DialogButton";
import { ChallengeButton } from "./ChallengeButton";
import { BondBalance } from "./BondBalance";
import { DepositButton } from "./DepositButton";
import { ChallengeConfig } from "@/getChallengeConfig";
import { ResolveButton } from "./ResolveButton";
import { ExpireButton } from "./ExpireButton";

type Props = {
  challengeConfig: ChallengeConfig;
  commitment: InputCommitment;
  status: ChallengeStatus;
};

export function CommitmentButton({
  challengeConfig,
  commitment,
  status,
}: Props) {
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
        <div>TODO: explain wtf this is for</div>
        <div>
          <ChallengeButton commitment={commitment} />
        </div>
        <div>
          {/* TODO: move this to a better spot */}
          <div>
            Bond balance: <BondBalance />{" "}
            <DepositButton challengeConfig={challengeConfig} />
          </div>
        </div>
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
        <div>TODO: explain wtf this is for</div>
        <div>TODO: get input data from somewhere</div>
        <div>
          <ResolveButton commitment={commitment} inputData="0x" />
        </div>
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
        <div>TODO: explain wtf this is for</div>
        <div>
          <ExpireButton commitment={commitment} />
        </div>
      </DialogButton>
    );
  }

  return null;
}
