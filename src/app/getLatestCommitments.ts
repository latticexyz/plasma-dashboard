"use server";

import { InputCommitment, batcher, batcherInbox } from "@/common";
import { database } from "@/database";

export async function getLatestCommitments(): Promise<
  InputCommitment[] | undefined
> {
  const commitments = await database.query.inputCommitments.findMany({
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
      and(eq(table.txFrom, batcher), eq(table.txTo, batcherInbox)),
    orderBy: (table, { desc }) => [desc(table.blockNumber)],
    // TODO: figure out pagination when it becomes a problem
    limit: 500,
  });
  // `commitment.challenge` type is not nullable but should be, see https://github.com/drizzle-team/drizzle-orm/issues/1420
  // instead, we return this as `InputCommitment` type which corrects for this.
  return commitments;
}
