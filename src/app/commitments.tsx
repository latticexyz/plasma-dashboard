"use client";

import { useCallback, useState } from "react";
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

  const fetchPrecedingInputCommitments = useCallback(async () => {
    const firstBlockNumber = inputCommitments.at(0)?.blockNumber ?? 0n;

    const precedingInputCommitments = await getInputCommitments({
      from: bigIntMax(firstBlockNumber - INPUT_COMMITMENT_FETCH_RANGE, 0n),
      to: bigIntMax(firstBlockNumber - 1n, 0n),
    });

    setInputCommitments((currentInputCommitments) => [
      ...precedingInputCommitments,
      ...currentInputCommitments,
    ]);
  }, [inputCommitments]);

  const fetchSucceedingInputCommitments = useCallback(async () => {
    const lastBlockNumber = inputCommitments.at(-1)?.blockNumber ?? 0n;

    const succeedingInputCommitments = await getInputCommitments({
      from: bigIntMax(lastBlockNumber + 1n, 0n),
      to: bigIntMax(lastBlockNumber + INPUT_COMMITMENT_FETCH_RANGE, 0n),
    });

    setInputCommitments((currentInputCommitments) => [
      ...currentInputCommitments,
      ...succeedingInputCommitments,
    ]);
  }, [inputCommitments]);

  return (
    <div>
      <button onClick={fetchPrecedingInputCommitments}>Fetch before</button>
      <div className="overflow-auto">
        <ul>
          {inputCommitments.map((commitment) => (
            <li key={commitment.txHash}>
              block: {commitment.blockNumber?.toString()}; commitment:{" "}
              {commitment.inputCommitment}; from: {commitment.txFrom}; to:{" "}
              {commitment.txTo}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={fetchSucceedingInputCommitments}>Fetch after</button>
    </div>
  );
}
