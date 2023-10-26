import { ChallengeStatus } from "@/common";
import { assertExhaustive } from "@latticexyz/common/utils";

type Props = {
  status: ChallengeStatus;
};

export function ChallengeStatusLabel({ status }: Props) {
  switch (status) {
    case ChallengeStatus.Unchallenged:
      return <>Unchallenged</>;
    case ChallengeStatus.Challenged:
      return <>Challenged</>;
    case ChallengeStatus.Resolved:
      return <>Resolved</>;
    case ChallengeStatus.Expiring:
      return <>Expiring</>;
    case ChallengeStatus.Expired:
      return <>Expired</>;
    case ChallengeStatus.Unknown:
      return <>Unknown</>;
  }
  assertExhaustive(status, `Unknown challenge status: ${status}`);
}
