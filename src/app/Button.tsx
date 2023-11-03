import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

export const buttonClassNames = twMerge(
  "group text-left bg-black text-white px-3 py-2 transition hover:bg-neutral-800",
  "aria-[disabled=true]:hover:bg-red-700 aria-[disabled=true]:cursor-not-allowed",
  "aria-[busy=true]:hover:bg-neutral-700 aria-[busy=true]:cursor-default"
);

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { pending?: boolean };

export function Button({
  type,
  className,
  pending,
  disabled,
  ...props
}: Props) {
  return (
    <button
      type={type || "button"}
      aria-busy={pending}
      aria-disabled={pending || disabled}
      className={twMerge(buttonClassNames, className)}
      {...props}
    />
  );
}
