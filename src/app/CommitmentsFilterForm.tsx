"use client";

import { batcher } from "@/common";

type Props = {
  latestBlockNumber: bigint;
};

export function CommitmentsFilterForm({ latestBlockNumber }: Props) {
  return (
    <form
      className="flex items-center justify-between gap-4"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase">From block</span>
          <input
            type="text"
            className="bg-white/10 border border-white/20 text-white placeholder:text-white/30 font-mono px-3 py-2 w-32"
            placeholder="earliest"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase">To block</span>
          <input
            type="text"
            className="bg-white/10 border border-white/20 text-white placeholder:text-white/30 font-mono px-3 py-2 w-32"
            placeholder={latestBlockNumber.toString()}
          />
        </label>
      </div>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-xs uppercase">Status</span>
        <select className="bg-white/10 border border-white/20 text-white font-mono px-2 py-2">
          <option>All</option>
          <option>Unchallenged</option>
          <option>Challenged</option>
          <option>Resolved</option>
          <option>Expiring</option>
          <option>Expired</option>
        </select>
      </label>
      <div className="flex items-center justify-between gap-2">
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase">Address</span>
          <select className="bg-white/10 border border-white/20 text-white font-mono px-2 py-2">
            <option>From</option>
            <option>To</option>
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase">&nbsp;</span>
          <input
            type="text"
            className="bg-white/10 border border-white/20 text-white placeholder:text-white/30 font-mono px-3 py-2 w-64"
            placeholder={batcher}
          />
        </label>
      </div>
    </form>
  );
}
