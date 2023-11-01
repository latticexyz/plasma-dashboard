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
>;

export function FilterForm({ onSubmit, onChange, ...props }: Props) {
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
        router.push(`${pathname}?${params.toString()}`);
        onSubmit?.(event);
      }}
      onChange={(event) => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        const params = formToParams(event.currentTarget);
        if (
          event.target instanceof HTMLElement &&
          event.target.matches(
            "select, input[type=checkbox], input[type=radio]"
          )
        ) {
          router.replace(`${pathname}?${params.toString()}`);
        } else {
          timerRef.current = setTimeout(() => {
            router.replace(`${pathname}?${params.toString()}`);
          }, 1000);
        }
        onChange?.(event);
      }}
    />
  );
}
