"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { bigIntMax } from "@latticexyz/common/utils";
import { InputCommitment, getInputCommitments } from "./getInputCommitments";
import { INPUT_COMMITMENT_FETCH_RANGE } from "./constants";
import { useInView } from "react-intersection-observer";
import { useLatestBlockNumber } from "./useLatestBlockNumber";

type Props = {
  initialInputCommitments: InputCommitment[];
};

const LIST_ITEM_CLASS = "input-commitment-item";

export default function Commitments({ initialInputCommitments }: Props) {
  const [inputCommitments, setInputCommitments] = useState(
    initialInputCommitments
  );
  const [isLoading, setIsLoading] = useState(false);
  const latestBlockNumber = useLatestBlockNumber();

  const inputCommitmentContainerRef = useRef<HTMLDivElement>(null);

  const { ref: topRef, inView: topInView } = useInView();
  const { ref: bottomRef, inView: bottomInView } = useInView();

  async function fetchPrecedingInputCommitments() {
    if (isLoading) return;
    setIsLoading(true);
    const firstBlockNumber = inputCommitments.at(0)?.blockNumber ?? 0n;

    // Store the current scroll top so we can update it after the rerender
    // to prevent the viewport from jumping
    const previousScrollHeight =
      inputCommitmentContainerRef.current?.scrollHeight || 0;

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
        const newScrollHeight =
          inputCommitmentContainerRef.current.scrollHeight;
        const addedHeight = newScrollHeight - previousScrollHeight;

        console.log("added height", addedHeight);
        console.log("new scroll height", newScrollHeight);
        inputCommitmentContainerRef.current.scrollTop += addedHeight;
      }

      setIsLoading(false);
    }, 1);
  }

  async function fetchSucceedingInputCommitments() {
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
  }

  useEffect(() => {
    if (topInView) {
      console.log("calling");
      fetchPrecedingInputCommitments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topInView]);

  useEffect(() => {
    if (bottomInView) {
      fetchSucceedingInputCommitments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bottomInView, latestBlockNumber]);

  return (
    <div className="flex flex-col">
      <button onClick={fetchPrecedingInputCommitments} disabled={isLoading}>
        {isLoading ? "Loading..." : "Fetch before"}
      </button>
      <div
        className="overflow-y-auto flex-grow"
        ref={inputCommitmentContainerRef}
      >
        <div ref={topRef} />
        {inputCommitments.map((commitment) => {
          return (
            <div
              key={commitment.txHash}
              className={`break-all ${LIST_ITEM_CLASS} h-36`}
            >
              block: {commitment.blockNumber?.toString()}; commitment:{" "}
              {commitment.inputCommitment}; from: {commitment.txFrom}; to:{" "}
              {commitment.txTo}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
      <button onClick={fetchSucceedingInputCommitments} disabled={isLoading}>
        {isLoading ? "Loading..." : "Fetch after"}
      </button>
    </div>
  );
}
