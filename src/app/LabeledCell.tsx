import { ReactNode } from "react";

type Props = {
  label: ReactNode;
  children: ReactNode;
};

export function LabeledCell({ label, children }: Props) {
  return (
    <div className="flex flex-col justify-center gap-1.5">
      <div className="text-xs font-mono uppercase">{label}</div>
      <div className="font-mono uppercase">{children}</div>
    </div>
  );
}
