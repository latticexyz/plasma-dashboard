"use server";

import { gte, lte, and, eq } from "drizzle-orm";
import { database } from "./database";
import { txInputs } from "./schema";
import { Address, Hex } from "viem";
import { env } from "../env";

export type GetInputCommitmentsOptions = {
  from: bigint;
  to: bigint;
};

export type InputCommitment = {
  blockNumber: bigint;
  inputCommitment: Hex;
  txHash: Hex;
  txTo: Address;
  txFrom: Address;
};

export async function getInputCommitments({
  from,
  to,
}: GetInputCommitmentsOptions): Promise<InputCommitment[]> {
  return database
    .select({
      blockNumber: txInputs.blockNumber,
      inputCommitment: txInputs.txInput,
      txHash: txInputs.txHash,
      txTo: txInputs.txTo,
      txFrom: txInputs.txSigner,
    })
    .from(txInputs)
    .where(
      and(
        gte(txInputs.blockNumber, from),
        lte(txInputs.blockNumber, to),
        eq(txInputs.txSigner, env.BATCHER),
        eq(txInputs.txTo, env.BATCHER_INBOX)
      )
    )
    .execute();
}
