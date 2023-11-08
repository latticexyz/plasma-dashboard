import { ChallengeStatus } from "@/common";
import { ChallengeStatusIcon } from "./ChallengeStatusIcon";
import { ChallengeStatusLabel } from "./ChallengeStatusLabel";

type Props = {
  status: ChallengeStatus;
};

export function ChallengeStatusIndicator({ status }: Props) {
  return (
    <div className="flex items-center gap-2">
      <ChallengeStatusIcon status={status} />
      <span className="font-mono uppercase text-white">
        <ChallengeStatusLabel status={status} />
      </span>
    </div>
  );
}
