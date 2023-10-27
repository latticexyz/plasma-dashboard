"use server";

import {
  ChallengeStatus,
  InputCommitment,
  batcher,
  batcherInbox,
} from "@/common";
import { database } from "@/database";
import { Address } from "viem";

export type CommitmentsFilter = {
  fromBlock?: bigint;
  toBlock?: bigint;
  status?: ChallengeStatus;
  fromAddress?: Address;
  toAddress?: Address;
};

export async function getLatestCommitments(
  filter: CommitmentsFilter = {}
): Promise<InputCommitment[]> {
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
          txHash: true,
          txFrom: true,
          status: true,
        },
        // TODO: probably also want to sort by log index
        orderBy: (challenge, { desc }) => [desc(challenge.blockNumber)],
      },
    },
    where: (table, { and, eq, gte, lte }) => {
      const conditions = [
        eq(table.txFrom, batcher),
        eq(table.txTo, batcherInbox),
      ];
      if (filter.fromBlock != null) {
        conditions.push(gte(table.blockNumber, filter.fromBlock));
      }
      if (filter.toBlock != null) {
        conditions.push(lte(table.blockNumber, filter.toBlock));
      }
      // TODO: implement the rest of the filters
      return and(...conditions);
    },
    orderBy: (table, { desc }) => [desc(table.blockNumber)],
    // TODO: figure out pagination when it becomes a problem
    limit: 100,
  });
}
