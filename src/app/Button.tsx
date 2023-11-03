import { PendingIcon } from "@/icons/PendingIcon";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { pending?: boolean };

export function Button({
  type,
  className,
  pending,
  disabled,
  children,
  ...props
}: Props) {
  return (
    <button
      type={type || "button"}
      aria-busy={pending}
      aria-disabled={disabled}
      className={twMerge(
        "group bg-white text-black transition hover:bg-neutral-200",
        "aria-[busy=true]:opacity-80 aria-[busy=true]:hover:bg-white aria-[busy=true]:cursor-default",
        "aria-[disabled=true]:opacity-80 aria-[disabled=true]:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <span className="inline-grid pointer-events-none overflow-hidden">
        <span
          className={twMerge(
            "row-start-1 col-start-1 transition opacity-100 flex items-center justify-center",
            "group-aria-[busy=true]:opacity-10 group-hover:group-aria-[busy=true]:opacity-60"
          )}
        >
          <span className="px-3 py-2">{children}</span>
        </span>
        <span
          className={twMerge(
            "row-start-1 col-start-1 transition opacity-0 flex items-center justify-center",
            "group-aria-[busy=true]:opacity-100 group-hover:group-aria-[busy=true]:opacity-20"
          )}
        >
          <PendingIcon />
        </span>
      </span>
    </button>
  );
}
