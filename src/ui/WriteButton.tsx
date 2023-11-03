"use client";

import { Abi, Address, BaseError } from "viem";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
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
  const transactionResult = useWaitForTransaction({
    chainId: write.chainId,
    ...writeResult.data,
  });

  if (prepareResult.isLoading) {
    return <Button pending="Estimating gas…">{label}</Button>;
  }

  if (writeResult.isLoading) {
    return <Button pending="Waiting for confirmation…">{label}</Button>;
  }

  if (transactionResult.isLoading) {
    return <Button pending="Waiting for transaction…">{label}</Button>;
  }

  if (prepareResult.isError) {
    return (
      <Button
        disabled
        error={
          prepareResult.error instanceof Error ? (
            <span className="flex font-mono whitespace-pre p-2 pb-8">
              {prepareResult.error.message}
            </span>
          ) : (
            "Could not estimate gas"
          )
        }
      >
        {label}
      </Button>
    );
  }

  return (
    <Button pending={writeResult.isLoading} onClick={writeResult.write}>
      {label}
    </Button>
  );
}
