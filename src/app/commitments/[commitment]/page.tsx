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
import { EnvelopeIcon } from "@/ui/icons/EnvelopeIcon";
import { TertiaryButtonLink } from "@/ui/TertiaryButtonLink";
import { SecondaryButton } from "@/ui/SecondaryButton";
import { TerminalIcon } from "@/ui/icons/TerminalIcon";
import { CommitmentButton } from "@/app/CommitmentButton";

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
          className="flex items-center gap-2 px-2 -m-2 font-mono uppercase transition hover:text-white"
        >
          <ArrowLeftIcon />
          <span className="text-sm leading-none">View all blocks</span>
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
          <div className="grid grid-cols-[max-content_auto] gap-x-8 gap-y-3 place-items-start">
            <div className="flex items-center justify-center gap-2 text-sm">
              <SendIcon />
              <div className="font-mono uppercase">Sender</div>
            </div>
            <div className="font-mono text-sm text-white">
              {commitment.txFrom}
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <InboxIcon />
              <div className="font-mono uppercase">Inbox</div>
            </div>
            <div className="font-mono text-sm text-white">
              {commitment.txTo}
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <EnvelopeIcon />
              <div className="font-mono uppercase">Input hash</div>
            </div>
            <div className="font-mono text-sm text-white">
              {commitment.inputHash}
            </div>
          </div>

          <div className="flex-shrink-0 grid grid-cols-2 gap-2">
            <CommitmentButton
              className="col-span-2"
              blockNumber={latestBlockNumber}
              challengeConfig={challengeConfig}
              commitment={{
                ...commitment,
                latestChallenge,
              }}
              status={getChallengeStatus(
                latestChallenge,
                challengeConfig,
                latestBlockNumber
              )}
            />
            <TertiaryButtonLink
              href={`${holesky.blockExplorers.default.url}/tx/${commitment.txHash}`}
              target="_blank"
              rel="noopener noreferer"
              label="View tx"
            />
            <TertiaryButtonLink
              href={getInputDataUrl(commitment.inputHash)}
              target="_blank"
              rel="noopener noreferer"
              label="Data"
            />
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
