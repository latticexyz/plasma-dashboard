import { ChallengeStatus } from "@/common";
import { assertExhaustive } from "@latticexyz/common/utils";

type Props = {
  status: ChallengeStatus;
};

export function ChallengeStatusIcon({ status }: Props) {
  switch (status) {
    case ChallengeStatus.Unchallenged:
      return <span className="inline-flex w-1.5 h-1.5 bg-white/50"></span>;
    case ChallengeStatus.Challenged:
      return <span className="inline-flex w-1.5 h-1.5 bg-yellow-500"></span>;
    case ChallengeStatus.Resolved:
      return <span className="inline-flex w-1.5 h-1.5 bg-green-500"></span>;
    case ChallengeStatus.Expiring:
      return <span className="inline-flex w-1.5 h-1.5 bg-purple-500"></span>;
    case ChallengeStatus.Expired:
      return <span className="inline-flex w-1.5 h-1.5 bg-red-500"></span>;
    case ChallengeStatus.Unknown:
      return <span className="inline-flex w-1.5 h-1.5 bg-white/50"></span>;
  }
  assertExhaustive(status, `Unknown challenge status: ${status}`);
}
