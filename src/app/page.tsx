import { getBlockNumber } from "viem/actions";
import Commitments from "./Commitments";
import { client } from "./client";
import { bigIntMax } from "@latticexyz/common/utils";

const WINDOW = 100n;

export default async function Home() {
  const latestBlockNumber = await getBlockNumber(client);

  return (
    <div>
      <p>Current block number: {latestBlockNumber.toString()}</p>
      <Commitments
        from={bigIntMax(latestBlockNumber - WINDOW, 0n)}
        to={bigIntMax(latestBlockNumber, 0n)}
      />
    </div>
  );
}
