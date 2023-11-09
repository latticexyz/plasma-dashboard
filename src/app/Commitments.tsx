"use client";

import superjson from "superjson";
import { ChallengeStatus, InputCommitment, batcher } from "@/common";
import { FilterForm } from "@/ui/FilterForm";
import { FilterInput } from "@/ui/FilterInput";
import { FilterSelect } from "@/ui/FilterSelect";
import { ChallengeConfig } from "@/getChallengeConfig";
import { CommitmentRow } from "./CommitmentRow";
import { useEffect, useState } from "react";
import { PendingIcon } from "@/ui/icons/PendingIcon";
import { useAccount, useBlockNumber } from "wagmi";
import { holesky } from "@/chains/holesky";
import { CommitmentsFilter } from "@/getLatestCommitments";
import { commitmentsFilterToSearchParams } from "@/commitmentsFilterToSearchParams";
import { twMerge } from "tailwind-merge";

type Props = {
  latestBlockNumber: bigint;
  challengeConfig: ChallengeConfig;
  commitments: InputCommitment[];
  filter: CommitmentsFilter;
};

// TODO: try to normalize sizing of select vs input (https://twitter.com/frolic/status/1717561249154662516)

export function Commitments({
  latestBlockNumber,
  challengeConfig,
  commitments: initialCommitments,
  filter,
}: Props) {
  const { address } = useAccount();
  const [isPending, setPending] = useState(false);

  const blockNumber =
    useBlockNumber({ chainId: holesky.id, watch: true }).data ??
    latestBlockNumber;

  const [commitments, setCommitments] = useState(initialCommitments);
  useEffect(() => {
    fetch(
      `/api/commitments?${commitmentsFilterToSearchParams(filter).toString()}`
    )
      .then((res) => res.json())
      .then((json) => superjson.deserialize(json))
      .then((json: any) => setCommitments(json.commitments));
  }, [blockNumber, filter]);

  useEffect(() => {
    setPending(false);
  }, [commitments]);

  return (
    <div className="flex flex-col gap-5">
      <FilterForm
        className="flex items-center justify-between gap-4"
        onBeforeNavigate={() => {
          setPending(true);
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <label className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase">From block</span>
            <FilterInput
              name="fromBlock"
              type="text"
              className="bg-white/10 border border-white/20 text-white placeholder:text-white/30 font-mono px-3 py-2 w-32"
              placeholder="0"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase">To block</span>
            <FilterInput
              name="toBlock"
              type="text"
              className="bg-white/10 border border-white/20 text-white placeholder:text-white/30 font-mono px-3 py-2 w-32"
              placeholder={latestBlockNumber.toString()}
            />
          </label>
        </div>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase">Status</span>
          <FilterSelect
            name="status"
            className="bg-white/10 border border-white/20 text-white font-mono px-2 py-2"
          >
            <option value="">All</option>
            <option value={ChallengeStatus.Unchallenged}>Unchallenged</option>
            <option value={ChallengeStatus.Challenged}>Challenged</option>
            <option value={ChallengeStatus.Resolved}>Resolved</option>
            <option value={ChallengeStatus.Expired}>Expired</option>
          </FilterSelect>
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase">Challenged by</span>
          <FilterInput
            name="from"
            type="text"
            className="bg-white/10 border border-white/20 text-white placeholder:text-white/30 font-mono px-3 py-2 w-64"
            placeholder={address ?? batcher}
          />
        </label>
        <button type="submit" className="hidden">
          Submit
        </button>
      </FilterForm>
      <div className="relative">
        <div className="border-y border-white/20 divide-y divide-white/20">
          {commitments.length ? (
            commitments.map((commitment) => (
              <CommitmentRow
                key={commitment.txHash}
                latestBlockNumber={latestBlockNumber}
                challengeConfig={challengeConfig}
                commitment={commitment}
              />
            ))
          ) : (
            <div className="p-20 text-center">No input commitments found.</div>
          )}
        </div>
        <div
          className={twMerge(
            "pointer-events-none absolute inset-0 bg-neutral-950/80 backdrop-blur-sm flex justify-center p-20",
            "transition",
            isPending ? "opacity-100" : "opacity-0"
          )}
          aria-hidden
        >
          <PendingIcon className="text-white text-lg" />
        </div>
      </div>
    </div>
  );
}
