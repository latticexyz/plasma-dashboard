import { ChallengeStatusCell } from "@/app/ChallengeStatusCell";
import { ChallengeStatusIndicator } from "@/app/ChallengeStatusIndicator";
import { CommitmentBlock } from "@/app/CommitmentBlock";
import { LabeledBox } from "@/ui/LabeledBox";
import { TruncatedHex } from "@/ui/TruncatedHex";
import { getChallengeConfig } from "@/getChallengeConfig";
import { getChallengeStatus } from "@/getChallengeStatus";
import { getCommitment } from "@/getCommitment";
import { ArrowLeftIcon } from "@/ui/icons/ArrowLeftIcon";
import { InboxIcon } from "@/ui/icons/InboxIcon";
import { SendIcon } from "@/ui/icons/SendIcon";
import { client } from "@/viemClient";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isHex } from "viem";
import { getBlockNumber } from "viem/actions";
import { holesky } from "@/chains/holesky";
import { getInputDataUrl } from "@/getInputDataUrl";

// Force Next.js to always re-render this, otherwise it will cache the fetch for the latest block number, making it quickly stale and affecting the defaults set up deeper in the component tree.
export const dynamic = "force-dynamic";

type Props = {
  params: {
    commitment: string;
  };
};

export default async function CommitmentPage({ params }: Props) {
  const commitment = isHex(params.commitment)
    ? await getCommitment(params.commitment)
    : null;
  if (!commitment) notFound();

  const [latestBlockNumber, challengeConfig] = await Promise.all([
    getBlockNumber(client, { cacheTime: 0 }),
    getChallengeConfig(client),
  ]);

  const latestChallenge = commitment.challenges[0] ?? null;

  const status = getChallengeStatus(
    latestChallenge,
    challengeConfig,
    latestBlockNumber
  );

  // TODO: fetch all challenge states
  // TODO: add a "fake" state between challenged and resolved/expired?

  return (
    <div className="space-y-8">
      <div className="flex">
        <Link
          href="/"
          className="flex items-center gap-2 px-2 -m-2 font-mono text-sm uppercase transition hover:text-white"
        >
          <span className="text-xl">
            <ArrowLeftIcon />
          </span>
          <span>View all blocks</span>
        </Link>
      </div>
      <div className="divide-y divide-white/20">
        <div className="flex justify-between gap-8 px-3 py-5">
          <div className="flex gap-8">
            <CommitmentBlock commitment={commitment} />
            <ChallengeStatusCell status={status} />
          </div>
          {/* TODO: make these dependent on status */}
          <div className="flex gap-8 text-right">
            <LabeledBox label="Resolved by">
              <span className="font-mono text-white">
                {latestChallenge ? (
                  <TruncatedHex hex={latestChallenge.txFrom} />
                ) : (
                  "??"
                )}
              </span>
            </LabeledBox>
            <LabeledBox label="Ended">
              <span className="font-mono text-white">00/00 00:00</span>
            </LabeledBox>
          </div>
        </div>

        <div className="flex gap-8 justify-between items-center px-3 py-6">
          <div className="flex flex-col justify-center gap-3">
            <div className="flex">
              <div className="flex flex-shrink-0 w-32 gap-2 items-center">
                <div className="flex-shrink-0">
                  <SendIcon />
                </div>
                <div className="font-mono uppercase text-sm">Sender</div>
              </div>
              <div className="font-mono text-sm text-white">
                {commitment.txFrom}
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-shrink-0 w-32 gap-2 items-center">
                <div className="flex-shrink-0">
                  <InboxIcon />
                </div>
                <div className="font-mono uppercase text-sm">Inbox</div>
              </div>
              <div className="font-mono text-sm text-white">
                {commitment.txTo}
              </div>
            </div>
          </div>
          <div className="flex-grow flex gap-2 justify-end">
            <Link
              href={`${holesky.blockExplorers.default.url}/tx/${commitment.txHash}`}
              className="flex-shrink-0 px-4 py-2 bg-white text-black font-mono uppercase text-sm"
              target="_blank"
              rel="noopener noreferer"
            >
              View tx
            </Link>
            <Link
              href={getInputDataUrl(commitment.inputHash)}
              className="flex-shrink-0 px-4 py-2 bg-white/20 text-white font-mono uppercase text-sm"
              target="_blank"
              rel="noopener noreferer"
            >
              Data
            </Link>
          </div>
        </div>
        <div className="py-3">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-3 font-mono uppercase text-xs font-normal">
                  History
                </th>
                <th className="text-left p-3 font-mono uppercase text-xs font-normal">
                  Action by
                </th>
                <th className="text-left p-3 font-mono uppercase text-xs font-normal">
                  Window
                </th>
                <th className="text-left p-3 font-mono uppercase text-xs font-normal">
                  Tx hash
                </th>
                <th className="text-left p-3 font-mono uppercase text-xs font-normal"></th>
              </tr>
            </thead>

            <tbody>
              {commitment.challenges.length ? (
                commitment.challenges.map((challenge) => {
                  const status = getChallengeStatus(
                    challenge,
                    challengeConfig,
                    latestBlockNumber
                  );
                  return (
                    <tr key={challenge.txHash}>
                      <td className="p-3 font-mono uppercase text-sm text-white">
                        <ChallengeStatusIndicator status={status} />
                      </td>
                      <td className="p-3 font-mono uppercase text-sm text-white">
                        <TruncatedHex hex={challenge.txFrom} />
                      </td>
                      <td className="p-3 font-mono uppercase text-sm text-white">
                        TODO window
                      </td>
                      <td className="p-3 font-mono uppercase text-sm text-white">
                        <TruncatedHex hex={challenge.txHash} />
                      </td>
                      <td>TODO time ago</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="p-3 text-center">
                    This input commitment has not been challenged.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
