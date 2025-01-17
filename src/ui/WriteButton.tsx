"use client";

import { Abi, Client } from "viem";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  UsePrepareContractWriteConfig,
  usePublicClient,
} from "wagmi";
import { Button } from "./Button";
import { ReactNode, useCallback } from "react";
import { useDeepMemo } from "@/useDeepMemo";
import { toast } from "react-toastify";
import { useCreatePromise } from "@/useCreatePromise";
import { wait } from "@latticexyz/common/utils";
import { afterUnless } from "@/afterUnless";
import { waitForTransactionReceipt } from "viem/actions";

export type Props<
  abi extends Abi | readonly unknown[],
  functionName extends string
> = {
  label: ReactNode;
  write: UsePrepareContractWriteConfig<abi, functionName, number>;
  className?: string;
};

export function WriteButton<
  abi extends Abi | readonly unknown[],
  functionName extends string
>({ write: writeArgs, label, className }: Props<abi, functionName>) {
  const publicClient = usePublicClient({ chainId: writeArgs.chainId });
  const memoizedWriteArgs = useDeepMemo(writeArgs);
  const prepareResult = usePrepareContractWrite(memoizedWriteArgs);
  const writeResult = useContractWrite<abi, functionName, "prepared">(
    prepareResult.config
  );

  const transactionResult = useWaitForTransaction({
    chainId: memoizedWriteArgs.chainId,
    hash: writeResult.data?.hash,
  });

  const { writeAsync } = writeResult;
  const [writeAndConfirmResult, writeAndConfirm] = useCreatePromise(
    useCallback(
      async (onProgress: (message: string) => void) => {
        if (!writeAsync) {
          throw new Error("Contract call could not be prepared");
        }

        onProgress("Starting transaction…");

        const writePromise = writeAsync();
        afterUnless(wait(1000 * 5), writePromise, () =>
          onProgress("Please confirm transaction in your wallet…")
        );
        const { hash } = await writePromise;

        onProgress("Finalizing transaction…");

        // TODO: figure out why calling `waitForTransactionReceipt` immediately results in a `TransactionReceiptNotFoundError`
        await wait(500);

        const receiptPromise = waitForTransactionReceipt(
          // TODO: ugh why
          publicClient as unknown as Client,
          {
            hash,
          }
        );
        afterUnless(wait(1000 * 15), receiptPromise, () =>
          onProgress("It can sometimes take a while to finalize a transaction…")
        );
        afterUnless(wait(1000 * 30), receiptPromise, () =>
          onProgress("Still working on it…")
        );
        const receipt = await receiptPromise;

        return { hash, receipt };
      },
      [publicClient, writeAsync]
    )
  );

  // TODO: invalidate cache or otherwise reload tx data

  if (prepareResult.isLoading) {
    return (
      <Button
        className={className}
        label={label}
        pending
        title="Estimating gas…"
      />
    );
  }

  if (writeResult.isLoading) {
    return <Button className={className} label={label} pending />;
  }

  if (transactionResult.isLoading) {
    return <Button className={className} label={label} pending />;
  }

  if (prepareResult.isError) {
    // TODO: display better message for specific kinds of errors (eth balance, etc)
    return (
      <Button className={className} label="Could not estimate gas" disabled />
    );
  }

  return (
    <Button
      className={className}
      label={label}
      pending={writeResult.isLoading}
      onClick={(event) => {
        event.preventDefault();

        const toastId = toast.loading("Preparing…");
        writeAndConfirm((message) =>
          toast.update(toastId, { render: message })
        ).then(
          (result) => {
            // TODO: link to block explorer
            toast.update(toastId, {
              isLoading: false,
              type: "success",
              render: "Success!",
              autoClose: 15000,
              closeButton: true,
            });
          },
          (error) => {
            // TODO: improve viem error handling (can't do instanceof checks)
            toast.update(toastId, {
              isLoading: false,
              type: "error",
              render: error.shortMessage ? (
                error.shortMessage
              ) : (
                <div className="whitespace-pre-wrap">{String(error)}</div>
              ),
              autoClose: 15000,
              closeButton: true,
            });
          }
        );
      }}
    />
  );
}
