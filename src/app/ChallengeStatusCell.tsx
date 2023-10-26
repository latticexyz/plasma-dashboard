import { ChallengeStatus } from "@/common";
import { ChallengeStatusIcon } from "./ChallengeStatusIcon";
import { ChallengeStatusLabel } from "./ChallengeStatusLabel";
import { LabeledCell } from "./LabeledCell";

type Props = {
  status: ChallengeStatus;
};

export function ChallengeStatusCell({ status }: Props) {
  return (
    <LabeledCell label="Status">
      <div className="flex items-center gap-2">
        <ChallengeStatusIcon status={status} />
        <span className="text-white">
          <ChallengeStatusLabel status={status} />
        </span>
      </div>
    </LabeledCell>
  );
}
