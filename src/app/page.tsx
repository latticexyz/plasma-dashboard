import { getLatestCommitments } from "@/getLatestCommitments";
import { Commitment } from "./Commitment";

export default async function Home() {
  const commitments = await getLatestCommitments();
  if (!commitments)
    throw new Error(
      "No commitments found. Are we connected to the right chain?"
    );

  return (
    <div className="flex flex-col mx-auto max-w-screen-lg py-16">
      <div className="border-y border-white/20 divide-y divide-white/20">
        {commitments.map((commitment) => (
          <Commitment key={commitment.txHash} commitment={commitment} />
        ))}
      </div>
    </div>
  );
}
