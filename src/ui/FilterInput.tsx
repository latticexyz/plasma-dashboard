"use client";

import { useSearchParams } from "next/navigation";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { name: string; value?: never };

export function FilterInput(props: Props) {
  const params = useSearchParams();
  const value = params.get(props.name);
  return (
    <input {...props} defaultValue={typeof value === "string" ? value : ""} />
  );
}
