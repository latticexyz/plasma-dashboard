import * as Tooltip from "@radix-ui/react-tooltip";
import { PendingIcon } from "@/ui/icons/PendingIcon";
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  pending?: boolean | ReactNode;
  error?: ReactNode;
};

export function Button({
  type,
  className,
  pending,
  disabled,
  error,
  children,
  ...props
}: Props) {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type={type || "button"}
            aria-busy={!!pending}
            aria-disabled={disabled}
            // TODO: disable click handlers during pending/disabled
            className={twMerge(
              "group bg-white text-black text-left font-mono uppercase leading-none transition hover:bg-lime-300",
              "aria-[busy=true]:bg-white aria-[busy=true]:cursor-default",
              "aria-[disabled=true]:bg-neutral-400 aria-[disabled=true]:cursor-not-allowed",
              className
            )}
            {...props}
          >
            <span className="inline-grid pointer-events-none overflow-hidden">
              <span
                className={twMerge(
                  "row-start-1 col-start-1",
                  "p-[1em] transition opacity-100 flex items-center justify-center"
                )}
              >
                {children}
              </span>
              <span
                aria-hidden
                className={twMerge(
                  "row-start-1 col-start-1",
                  "bg-gradient-to-r from-transparent via-white/80 to-white",
                  "transition opacity-0 group-aria-[busy=true]:opacity-100"
                  // "group-hover:group-aria-[busy=true]:translate-x-1/2"
                )}
              ></span>
              <span
                aria-hidden
                className={twMerge(
                  "row-start-1 col-start-1",
                  "p-[1em] flex items-center justify-end",
                  "transition opacity-0 group-aria-[busy=true]:opacity-100"
                  // "group-hover:group-aria-[busy=true]:translate-x-[1.5em]"
                )}
              >
                <PendingIcon />
              </span>
              {error ? (
                <span
                  aria-hidden
                  className={twMerge(
                    "row-start-1 col-start-1 flex items-start justify-end"
                  )}
                >
                  <span className="absolute flex items-center justify-center h-5 w-5 -m-1.5 text-xs text-white bg-red-800 rounded-full">
                    !
                  </span>
                </span>
              ) : null}
            </span>
          </button>
        </Tooltip.Trigger>

        {error ? (
          <Tooltip.Portal>
            <Tooltip.Content className="bg-red-900 text-white max-w-lg max-h-40 overflow-auto text-xs px-3 py-2.5">
              {error}
              <Tooltip.Arrow className="fill-red-900 mb-1.5" />
            </Tooltip.Content>
          </Tooltip.Portal>
        ) : pending != null && pending !== true && pending !== false ? (
          <Tooltip.Portal>
            <Tooltip.Content className="bg-neutral-800 text-white max-w-lg max-h-40 overflow-auto text-xs px-3 py-2.5">
              {pending}
              <Tooltip.Arrow className="fill-neutral-800 mb-1.5" />
            </Tooltip.Content>
          </Tooltip.Portal>
        ) : null}
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
