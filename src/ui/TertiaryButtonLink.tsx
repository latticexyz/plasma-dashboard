import { AnchorHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = Omit<
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  "children"
> & {
  label?: ReactNode;
  icon?: ReactNode;
};

export function TertiaryButtonLink({
  type,
  className,
  label,
  icon,
  ...props
}: Props) {
  return (
    <a
      className={twMerge(
        "group inline-block bg-neutral-700 text-white font-mono uppercase text-xs",
        "transition hover:brightness-125",
        className
      )}
      {...props}
    >
      <span className="flex items-center justify-center px-[1em] py-[1em] gap-[0.5em]">
        {icon}
        {label ? <span className="leading-none">{label}</span> : null}
      </span>
    </a>
  );
}
