import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  label: ReactNode;
  children: ReactNode;
  className?: string;
};

export function LabeledCell({ label, children, className }: Props) {
  return (
    <div className={twMerge("flex flex-col justify-center gap-1.5", className)}>
      <div className="text-xs font-mono uppercase">{label}</div>
      <div className="font-mono uppercase">{children}</div>
    </div>
  );
}
