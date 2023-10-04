"use client";

import { useCallback, useRef, useState } from "react";
import { bigIntMax } from "@latticexyz/common/utils";
import { InputCommitment, getInputCommitments } from "./getInputCommitments";
import { INPUT_COMMITMENT_FETCH_RANGE } from "./constants";

type Props = {
  initialInputCommitments: InputCommitment[];
};

export default function Commitments({ initialInputCommitments }: Props) {
  const [inputCommitments, setInputCommitments] = useState(
    initialInputCommitments
  );
  const [isLoading, setIsLoading] = useState(false);

  const inputCommitmentContainerRef = useRef<HTMLDivElement>(null);

  const getInputCommitmentItemHeight = useCallback(() => {
    const firstListItem = inputCommitmentContainerRef.current
      ?.firstElementChild as HTMLElement;
    return firstListItem.offsetHeight || 0;
  }, []);

  const fetchPrecedingInputCommitments = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    const firstBlockNumber = inputCommitments.at(0)?.blockNumber ?? 0n;

    // Store the current scroll top so we can update it after the rerender
    // to prevent the viewport from jumping
    const itemHeight = getInputCommitmentItemHeight();
    const currentScrollTop =
      inputCommitmentContainerRef.current?.scrollTop || 0;

    const precedingInputCommitments = await getInputCommitments({
      from: bigIntMax(firstBlockNumber - INPUT_COMMITMENT_FETCH_RANGE, 0n),
      to: bigIntMax(firstBlockNumber - 1n, 0n),
    });

    setInputCommitments((currentInputCommitments) => [
      ...precedingInputCommitments,
      ...currentInputCommitments,
    ]);

    setTimeout(() => {
      if (inputCommitmentContainerRef.current) {
        const addedHeight = precedingInputCommitments.length * itemHeight;
        const newScrollTop = currentScrollTop + addedHeight;
        console.log("current scroll top", currentScrollTop);
        console.log("added height", addedHeight);
        console.log("new scroll top", newScrollTop);
        inputCommitmentContainerRef.current.scrollTop = newScrollTop;
      }
    }, 1);

    setIsLoading(false);
  }, [inputCommitments, getInputCommitmentItemHeight, isLoading]);

  const fetchSucceedingInputCommitments = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    const lastBlockNumber = inputCommitments.at(-1)?.blockNumber ?? 0n;

    const succeedingInputCommitments = await getInputCommitments({
      from: bigIntMax(lastBlockNumber + 1n, 0n),
      to: bigIntMax(lastBlockNumber + INPUT_COMMITMENT_FETCH_RANGE, 0n),
    });

    setInputCommitments((currentInputCommitments) => [
      ...currentInputCommitments,
      ...succeedingInputCommitments,
    ]);

    setIsLoading(false);
  }, [inputCommitments, isLoading]);

  return (
    <div className="flex flex-col bg-green-500">
      <button onClick={fetchPrecedingInputCommitments} disabled={isLoading}>
        {isLoading ? "Loading..." : "Fetch before"}
      </button>
      <div
        className="overflow-y-auto flex-grow bg-red-500"
        ref={inputCommitmentContainerRef}
      >
        {inputCommitments.map((commitment) => (
          <div key={commitment.txHash} className="break-all">
            block: {commitment.blockNumber?.toString()}; commitment:{" "}
            {commitment.inputCommitment}; from: {commitment.txFrom}; to:{" "}
            {commitment.txTo}
          </div>
        ))}
      </div>
      <button onClick={fetchSucceedingInputCommitments} disabled={isLoading}>
        {isLoading ? "Loading..." : "Fetch after"}
      </button>
    </div>
  );
}
