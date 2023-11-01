"use client";

import { batcher } from "@/common";
import { FilterForm } from "./FilterForm";
import { FilterInput } from "./FilterInput";
import { FilterSelect } from "./FilterSelect";

type Props = {
  latestBlockNumber: bigint;
};

// TODO: try to normalize sizing of select vs input (https://twitter.com/frolic/status/1717561249154662516)

export function CommitmentsFilterForm({ latestBlockNumber }: Props) {
  return (
    <FilterForm className="flex items-center justify-between gap-4">
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
          <option>All</option>
          <option>Unchallenged</option>
          <option>Challenged</option>
          <option>Resolved</option>
          <option>Expiring</option>
          <option>Expired</option>
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
  );
}
