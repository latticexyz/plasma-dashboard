"use server";

import { InputCommitment, batcher, batcherInbox } from "@/common";
import { database } from "@/database";

export async function getLatestCommitments(): Promise<InputCommitment[]> {
  return await database.query.inputCommitments.findMany({
    columns: {
      blockNumber: true,
      blockTimestamp: true,
      inputHash: true,
      txHash: true,
      txTo: true,
      txFrom: true,
    },
    with: {
      challenges: {
        columns: {
          blockNumber: true,
          blockTimestamp: true,
          txFrom: true,
          status: true,
        },
        // TODO: probably also want to sort by log index
        orderBy: (challenge, { desc }) => [desc(challenge.blockNumber)],
      },
    },
    where: (table, { and, eq }) =>
      and(eq(table.txFrom, batcher), eq(table.txTo, batcherInbox)),
    orderBy: (table, { desc }) => [desc(table.blockNumber)],
    // TODO: figure out pagination when it becomes a problem
    limit: 100,
  });
}
