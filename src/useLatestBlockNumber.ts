import { useEffect, useState } from "react";
import { client } from "@/viemClient";
import { watchBlockNumber } from "viem/actions";

export function useLatestBlockNumber(): bigint | null;
export function useLatestBlockNumber(initialBlockNumber: bigint): bigint;

export function useLatestBlockNumber(
  initialBlockNumber: bigint | null = null
): bigint | null {
  const [latestBlockNumber, setLatestBlockNumber] = useState<bigint | null>(
    null
  );

  useEffect(() => {
    const unwatch = watchBlockNumber(client, {
      emitOnBegin: true,
      onBlockNumber: (blockNumber) => setLatestBlockNumber(blockNumber),
    });
    return () => unwatch();
  }, []);

  return latestBlockNumber ?? initialBlockNumber;
}
