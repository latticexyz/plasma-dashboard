import { getLatestCommitment } from "./getLatestCommitment";
import { Commitment } from "./Commitment";

export default async function Home() {
  const latestCommitment = await getLatestCommitment();
  if (!latestCommitment)
    throw new Error(
      "No commitments found. Are we connected to the right chain?"
    );

  return (
    <div className="flex flex-col mx-auto max-w-screen-lg">
      <Commitment commitment={latestCommitment} />
    </div>
  );
}
