"use server";

import { InputCommitment } from "@/common";
import { database } from "@/database";
import { Address } from "viem";

const BATCHER = process.env.BATCHER as Address;
const BATCHER_INBOX = process.env.BATCHER_INBOX as Address;
if (!BATCHER || !BATCHER_INBOX)
  throw new Error("Missing BATCHER or BATCHER_INBOX env variable");

export async function getLatestCommitment(): Promise<
  InputCommitment | undefined
> {
  const commitment = await database.query.inputCommitments.findFirst({
    columns: {
      blockNumber: true,
      inputHash: true,
      txHash: true,
      txTo: true,
      txFrom: true,
    },
    with: {
      challenge: {
        columns: {
          status: true,
        },
      },
    },
    where: (table, { and, eq }) =>
      and(eq(table.txFrom, BATCHER), eq(table.txTo, BATCHER_INBOX)),
    orderBy: (table, { desc }) => [desc(table.blockNumber)],
  });
  // `commitment.challenge` type is not nullable but should be, see https://github.com/drizzle-team/drizzle-orm/issues/1420
  // instead, we return this as `InputCommitment` type which corrects for this.
  return commitment;
}
