import { ChallengeStatus } from "@/common";
import { ChallengeStatusIndicator } from "./ChallengeStatusIndicator";
import { LabeledBox } from "@/ui/LabeledBox";

type Props = {
  status: ChallengeStatus;
};

export function ChallengeStatusCell({ status }: Props) {
  return (
    <LabeledBox label="Status">
      <ChallengeStatusIndicator status={status} />
    </LabeledBox>
  );
}
