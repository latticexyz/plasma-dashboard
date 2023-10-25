import { ChallengeStatus } from "@/common";
import { assertExhaustive } from "@latticexyz/common/utils";

type Props = {
  status: ChallengeStatus;
};

export function ChallengeStatusIcon({ status }: Props) {
  switch (status) {
    case ChallengeStatus.Unchallenged:
      return <span className="text-white/50">▪</span>;
    case ChallengeStatus.Challenged:
      return <span className="text-yellow-500">▪</span>;
    case ChallengeStatus.Resolved:
      return <span className="text-green-500">▪</span>;
    case ChallengeStatus.Expiring:
      return <span className="text-purple-500">▪</span>;
    case ChallengeStatus.Expired:
      return <span className="text-red-500">▪</span>;
    case ChallengeStatus.Unknown:
      return <span className="text-white/50">▪</span>;
  }
  assertExhaustive(status, `Unknown challenge status: ${status}`);
}
