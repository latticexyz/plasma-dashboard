import { useState } from "react";
import { client } from "@/viemClient";
import { watchBlockNumber } from "viem/actions";

export function useLatestBlockNumber() {
  const [latestBlockNumber, setLatestBlockNumber] = useState(0n);

  watchBlockNumber(client, {
    onBlockNumber: (blockNumber) => setLatestBlockNumber(blockNumber),
  });

  return latestBlockNumber;
}
