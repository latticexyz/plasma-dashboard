"use client";

import { usePathname, useRouter } from "next/navigation";
import { DetailedHTMLProps, FormHTMLAttributes, useRef } from "react";

function formToParams(form: HTMLFormElement): URLSearchParams {
  const formData = new FormData(form);
  const formEntries = Array.from(formData, ([key, value]) => [
    key,
    typeof value === "string" ? value : "",
  ]).filter(([, value]) => value !== "");
  return new URLSearchParams(formEntries);
}

type Props = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & {
  inputDelay?: number;
  onBeforeNavigate?: (to: string) => void;
};

export function FilterForm({
  inputDelay = 500,
  onBeforeNavigate,
  ...props
}: Props) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  // TODO: add is mounted check
  return (
    <form
      {...props}
      onSubmit={(event) => {
        event.preventDefault();
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        const params = formToParams(event.currentTarget);
        const to = `${pathname}?${params.toString()}`;
        onBeforeNavigate?.(to);
        router.push(to);
        props.onSubmit?.(event);
      }}
      onChange={(event) => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        const params = formToParams(event.currentTarget);
        const to = `${pathname}?${params.toString()}`;
        if (
          event.target instanceof HTMLElement &&
          event.target.matches(
            "select, input[type=checkbox], input[type=radio]"
          )
        ) {
          onBeforeNavigate?.(to);
          router.push(to);
        } else {
          onBeforeNavigate?.(to);
          timerRef.current = setTimeout(() => {
            router.push(to);
          }, inputDelay);
        }
        props.onChange?.(event);
      }}
    />
  );
}
