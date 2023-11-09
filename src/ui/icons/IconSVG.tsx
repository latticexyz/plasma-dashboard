import { DetailedHTMLProps, SVGAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type Props = DetailedHTMLProps<
  SVGAttributes<SVGSVGElement>,
  SVGSVGElement
>;

export function IconSVG({ className, children, ...props }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={twMerge("w-[1.25em] h-[1.25em] -my-[0.125em]", className)}
      {...props}
    >
      {children}
    </svg>
  );
}
