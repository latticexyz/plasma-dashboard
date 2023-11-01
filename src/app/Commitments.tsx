"use client";

import { ChallengeStatus, InputCommitment, batcher } from "@/common";
import { FilterForm } from "./FilterForm";
import { FilterInput } from "./FilterInput";
import { FilterSelect } from "./FilterSelect";
import { ChallengeConfig } from "@/getChallengeConfig";
import { Commitment } from "./Commitment";
import { useEffect, useState } from "react";
import { PendingIcon } from "@/icons/PendingIcon";

type Props = {
  latestBlockNumber: bigint;
  challengeConfig: ChallengeConfig;
  commitments: InputCommitment[];
};

// TODO: try to normalize sizing of select vs input (https://twitter.com/frolic/status/1717561249154662516)

export function Commitments({
  latestBlockNumber,
  challengeConfig,
  commitments,
}: Props) {
  const [isPending, setPending] = useState(false);

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
            <option value={ChallengeStatus.Expiring}>Expiring</option>
            <option value={ChallengeStatus.Expired}>Expired</option>
          </FilterSelect>
        </label>
        <div className="flex items-center justify-between gap-2">
          <label className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase">Address</span>
            <FilterSelect
              name="addressSource"
              className="bg-white/10 border border-white/20 text-white font-mono px-2 py-2"
            >
              <option>From</option>
              <option>To</option>
            </FilterSelect>
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase">&nbsp;</span>
            <FilterInput
              name="address"
              type="text"
              className="bg-white/10 border border-white/20 text-white placeholder:text-white/30 font-mono px-3 py-2 w-64"
              placeholder={batcher}
            />
          </label>
        </div>
        <button type="submit" className="hidden">
          Submit
        </button>
      </FilterForm>
      <div className="relative">
        <div className="border-y border-white/20 divide-y divide-white/20">
          {commitments.length ? (
            commitments.map((commitment) => (
              <Commitment
                key={commitment.txHash}
                latestBlockNumber={latestBlockNumber}
                challengeConfig={challengeConfig}
                commitment={commitment}
              />
            ))
          ) : (
            <div className="p-8 text-center">No input commitments found.</div>
          )}
        </div>
        {isPending ? (
          <div className="absolute inset-0 bg-neutral-950/80 flex justify-center p-8">
            <div className="text-white text-xl">
              <PendingIcon />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}