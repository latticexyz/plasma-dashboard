import { ChallengeStatus } from "@/common";
import { LabeledCell } from "./LabeledCell";
import { ChallengeStatusIndicator } from "./ChallengeStatusIndicator";

type Props = {
  status: ChallengeStatus;
};

export function ChallengeStatusCell({ status }: Props) {
  return (
    <LabeledCell label="Status">
      <ChallengeStatusIndicator status={status} />
    </LabeledCell>
  );
}
