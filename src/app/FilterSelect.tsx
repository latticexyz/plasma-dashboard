"use client";

import { useSearchParams } from "next/navigation";
import { DetailedHTMLProps, SelectHTMLAttributes } from "react";

type Props = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & { name: string; value?: never };

export function FilterSelect(props: Props) {
  const params = useSearchParams();
  const value = params.get(props.name);
  return (
    <select {...props} defaultValue={typeof value === "string" ? value : ""} />
  );
}
