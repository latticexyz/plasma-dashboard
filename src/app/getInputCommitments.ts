import { gte, lte, and } from "drizzle-orm";
import { database } from "./database";
import { txInputs } from "./schema";

export type Options = {
  from: bigint;
  to: bigint;
};

export async function getInputCommitments({ from, to }: Options) {
  return database
    .select({
      blockNumber: txInputs.blockNumber,
      inputCommitment: txInputs.txInput,
    })
    .from(txInputs)
    .where(and(gte(txInputs.blockNumber, from), lte(txInputs.blockNumber, to)))
    .execute();
}
