"use client";

import { Abi, Address } from "viem";
import {
  useContractWrite,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
} from "wagmi";
import { Button } from "./Button";
import { ReactNode } from "react";
import { HoverLabel } from "./HoverLabel";
import { useDeepMemo } from "@/useDeepMemo";

export type Props<
  abi extends Abi | readonly unknown[],
  functionName extends string
> = {
  write: UsePrepareContractWriteConfig<abi, functionName, number> & {
    chainId: number;
    address: Address;
  };
  label: ReactNode;
};

export function WriteButton<
  abi extends Abi | readonly unknown[],
  functionName extends string
>({ write, label }: Props<abi, functionName>) {
  const memoizedWrite = useDeepMemo(write);
  const prepareResult = usePrepareContractWrite(memoizedWrite);
  const writeResult = useContractWrite<abi, functionName, "prepared">(
    prepareResult.config
  );

  if (prepareResult.isLoading) {
    return (
      <Button pending>
        <HoverLabel label={label} labelHover="Estimating gas…" />
      </Button>
    );
  }

  if (prepareResult.isError) {
    return (
      <Button disabled>
        <HoverLabel
          label={label}
          // TODO: reason from contract revert
          labelHover={prepareResult.error?.message ?? "Could not estimate gas"}
        />
      </Button>
    );
  }

  if (!writeResult.write) {
    return (
      <Button disabled>
        <HoverLabel
          label={label}
          // TODO: better messaging
          labelHover={writeResult.error?.message ?? "Can't call contract"}
        />
      </Button>
    );
  }

  return (
    <Button pending={writeResult.isLoading} onClick={writeResult.write}>
      {label}
    </Button>
  );
}
