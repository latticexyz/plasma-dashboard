import { ChallengeStatusCell } from "@/app/ChallengeStatusCell";
import { ChallengeStatusIcon } from "@/app/ChallengeStatusIcon";
import { ChallengeStatusIndicator } from "@/app/ChallengeStatusIndicator";
import { ChallengeStatusLabel } from "@/app/ChallengeStatusLabel";
import { CommitmentBlock } from "@/app/CommitmentBlock";
import { LabeledCell } from "@/app/LabeledCell";
import { TruncatedAddress } from "@/app/TruncatedAddress";
import { Challenge } from "@/common";
import { getChallengeConfig } from "@/getChallengeConfig";
import { getChallengeStatus } from "@/getChallengeStatus";
import { getCommitment } from "@/getCommitment";
import { ArrowRightIcon } from "@/icons/ArrowRightIcon";
import { InboxIcon } from "@/icons/InboxIcon";
import { SendIcon } from "@/icons/SendIcon";
import { client } from "@/viemClient";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isHex } from "viem";
import { getBlockNumber } from "viem/actions";

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

  const challenge = commitment.challenges[0];
  const status = getChallengeStatus(
    challenge,
    challengeConfig,
    latestBlockNumber
  );

  return (
    <div className="divide-y divide-white/20">
      <div className="flex justify-between gap-8 px-3 py-5">
        <div className="flex gap-8">
          <CommitmentBlock commitment={commitment} />
          <ChallengeStatusCell status={status} />
        </div>
        {/* TODO: make these dependent on status */}
        <div className="flex gap-8">
          <LabeledCell label="Resolved by" className="text-right">
            <span className="text-white">
              {challenge ? (
                <TruncatedAddress address={challenge.txFrom} />
              ) : (
                "??"
              )}
            </span>
          </LabeledCell>
          <LabeledCell label="Ended" className="text-right">
            <span className="text-white">00/00 00:00</span>
          </LabeledCell>
        </div>
      </div>

      <div className="flex gap-8 justify-between items-center px-3 py-6">
        <div className="flex flex-col justify-center gap-3">
          <div className="flex">
            <div className="flex flex-shrink-0 w-32 gap-1 items-center">
              <div className="flex-shrink-0">
                <SendIcon />
              </div>
              <div className="font-mono uppercase text-sm">Sender</div>
            </div>
            <div className="font-mono uppercase text-sm text-white">
              {commitment.txFrom}
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-shrink-0 w-32 gap-1 items-center">
              <div className="flex-shrink-0">
                <InboxIcon />
              </div>
              <div className="font-mono uppercase text-sm">Inbox</div>
            </div>
            <div className="font-mono uppercase text-sm text-white">
              {commitment.txTo}
            </div>
          </div>
        </div>
        <div className="flex-grow flex gap-2 justify-end">
          <Link
            // TODO: link to block explorer
            href={`#${commitment.txHash}`}
            className="flex-shrink-0 px-4 py-2 bg-white text-black font-mono uppercase text-sm"
          >
            View tx
          </Link>
          <Link
            // TODO: link to input data on S3
            href={`#${commitment.inputHash}`}
            className="flex-shrink-0 px-4 py-2 bg-white/20 text-white font-mono uppercase text-sm"
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
                      <TruncatedAddress address={challenge.txFrom} />
                    </td>
                    <td className="p-3 font-mono uppercase text-sm text-white">
                      TODO window
                    </td>
                    <td className="p-3 font-mono uppercase text-sm text-white">
                      <TruncatedAddress address={challenge.txHash} />
                    </td>
                    <td>TODO time ago</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="p-3 font-mono uppercase text-sm text-white"
                >
                  This input commitment has not been challenged.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
