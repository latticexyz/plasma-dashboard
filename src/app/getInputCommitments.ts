"use server";

import { gte, lte, and, eq } from "drizzle-orm";
import { database } from "./database";
import { txInputs } from "./schema";
import { Address, Hex } from "viem";

const BATCHER = process.env.BATCHER as Address;
const BATCHER_INBOX = process.env.BATCHER_INBOX as Address;
if (!BATCHER || !BATCHER_INBOX)
  throw new Error("Missing BATCHER or BATCHER_INBOX env variable");

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
        eq(txInputs.txSigner, BATCHER),
        eq(txInputs.txTo, BATCHER_INBOX)
      )
    )
    .execute();
}
