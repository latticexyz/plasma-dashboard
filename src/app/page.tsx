import { getBlockNumber } from "viem/actions";
import Commitments from "./commitments";
import { client } from "./client";
import { bigIntMax } from "@latticexyz/common/utils";
import { getInputCommitments } from "./getInputCommitments";
import { INPUT_COMMITMENT_FETCH_RANGE } from "./constants";

export const dynamic = "force-dynamic";

export default async function Home() {
  const latestBlockNumber = await getBlockNumber(client);
  const inputCommitments = await getInputCommitments({
    from: bigIntMax(latestBlockNumber - INPUT_COMMITMENT_FETCH_RANGE, 0n),
    to: bigIntMax(latestBlockNumber, 0n),
  });

  return (
    <div className="flex h-screen">
      <p>Current block number: {latestBlockNumber.toString()}</p>
      <Commitments initialInputCommitments={inputCommitments} />
    </div>
  );
}
