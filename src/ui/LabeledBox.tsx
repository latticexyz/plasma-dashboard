import { ReactNode } from "react";

export type Props = {
  label: ReactNode;
  children: ReactNode;
};

export function LabeledBox({ label, children }: Props) {
  return (
    <span className="flex flex-col gap-2">
      <span className="font-mono uppercase text-xs leading-none">{label}</span>
      {children}
    </span>
  );
}
