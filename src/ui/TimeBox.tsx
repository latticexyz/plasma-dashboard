import { ShortTimestamp } from "@/ui/ShortTimestamp";
import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  label: ReactNode;
  timestamp: number;
};

export function TimeBox({ icon, label, timestamp }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 text-2xl">{icon}</div>
      <div className="flex-grow flex flex-col items-end">
        <div className="flex-grow text-white text-lg font-mono">{label}</div>
        <div className="text-xs font-mono whitespace-nowrap">
          <ShortTimestamp timestamp={timestamp} />
        </div>
      </div>
    </div>
  );
}
