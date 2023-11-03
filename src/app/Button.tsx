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
      // TODO: disable click handlers during pending/disabled
      className={twMerge(
        "group bg-white text-black transition hover:bg-lime-300",
        "aria-[busy=true]:hover:bg-white aria-[busy=true]:cursor-default",
        "aria-[disabled=true]:bg-neutral-400 aria-[disabled=true]:hover:bg-orange-300 aria-[disabled=true]:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <span className="inline-grid pointer-events-none overflow-hidden">
        <span
          className={twMerge(
            "row-start-1 col-start-1 transition opacity-100 flex items-center justify-center"
          )}
        >
          <span className="px-3 py-2">{children}</span>
        </span>
        <span
          className={twMerge(
            "row-start-1 col-start-1 transition opacity-0 bg-gradient-to-r from-transparent via-white/80 to-white",
            "group-aria-[busy=true]:opacity-100 group-hover:group-aria-[busy=true]:translate-x-1/2"
          )}
        ></span>
        <span
          className={twMerge(
            "row-start-1 col-start-1 transition opacity-0 flex items-center justify-end",
            "group-aria-[busy=true]:opacity-100 group-hover:group-aria-[busy=true]:translate-x-5"
          )}
        >
          <span className="px-3 py-2">
            <PendingIcon />
          </span>
        </span>
      </span>
    </button>
  );
}
