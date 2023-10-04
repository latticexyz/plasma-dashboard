import { getBlockNumber } from "viem/actions";
import Commitments from "./Commitments";
import { client } from "./client";

const WINDOW = 100n;

export default async function Home() {
  const latestBlockNumber = await getBlockNumber(client);

  return (
    <div>
      <p>Current block number: {latestBlockNumber.toString()}</p>
      <Commitments from={latestBlockNumber - WINDOW} to={latestBlockNumber} />
    </div>
  );
}
