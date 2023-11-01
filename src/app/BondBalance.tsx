"use client";

import { PendingIcon } from "@/icons/PendingIcon";
import { useBondBalance } from "@/useBondBalance";
import { formatEther } from "viem";

export function BondBalance() {
  const { data } = useBondBalance();
  return data == null ? <PendingIcon /> : <>{formatEther(data)} ETH</>;
}
