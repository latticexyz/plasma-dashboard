"use server";

import {
  ChallengeStatus,
  InputCommitment,
  batcher,
  batcherInbox,
} from "@/common";
import { database } from "@/database";
import {
  SQLWrapper,
  and,
  desc,
  eq,
  gte,
  isNull,
  lt,
  lte,
  sql,
  getTableColumns,
} from "drizzle-orm";
import { Address } from "viem";
import { challenges, inputCommitments } from "./schema";
import { ChallengeConfig } from "./getChallengeConfig";

const latestChallenges = database.$with("latestChallenges").as(
  database
    .select({
      ...getTableColumns(challenges),
      rowNumber:
        sql<number>`ROW_NUMBER() OVER (PARTITION BY chain_id, challenged_block_num, challenged_hash ORDER BY block_num DESC)`.as(
          "rowNumber"
        ),
    })
    .from(challenges)
);

export type CommitmentsFilter = {
  latestBlockNumber: bigint;
  challengeConfig: ChallengeConfig;
  fromBlock?: bigint;
  toBlock?: bigint;
  status?: ChallengeStatus;
  from?: Address;
};

export async function getLatestCommitments(
  filter: CommitmentsFilter
): Promise<InputCommitment[]> {
  const conditions: (SQLWrapper | undefined)[] = [
    eq(inputCommitments.txFrom, batcher),
    eq(inputCommitments.txTo, batcherInbox),
  ];
  if (filter.fromBlock != null) {
    conditions.push(gte(inputCommitments.blockNumber, filter.fromBlock));
  }
  if (filter.toBlock != null) {
    conditions.push(lte(inputCommitments.blockNumber, filter.toBlock));
  }
  if (filter.from != null) {
    conditions.push(eq(latestChallenges.txFrom, filter.from));
  }

  // TODO: redo challenged/expired status to have a block number range check
  if (filter.status === ChallengeStatus.Unchallenged) {
    conditions.push(isNull(latestChallenges.status));
  } else if (filter.status === ChallengeStatus.Challenged) {
    conditions.push(
      and(
        eq(latestChallenges.status, 1),
        gte(
          latestChallenges.blockNumber,
          filter.latestBlockNumber - filter.challengeConfig.resolveWindowBlocks
        )
      )
    );
  } else if (filter.status === ChallengeStatus.Expired) {
    conditions.push(
      and(
        eq(latestChallenges.status, 1),
        lt(
          latestChallenges.blockNumber,
          filter.latestBlockNumber - filter.challengeConfig.resolveWindowBlocks
        )
      )
    );
  } else if (filter.status === ChallengeStatus.Resolved) {
    conditions.push(eq(latestChallenges.status, 2));
  }

  const rows = await database
    .with(latestChallenges)
    .select()
    .from(inputCommitments)
    .leftJoin(
      latestChallenges,
      and(
        eq(latestChallenges.chainId, inputCommitments.chainId),
        eq(
          latestChallenges.challengedBlockNumber,
          inputCommitments.blockNumber
        ),
        eq(latestChallenges.challengedHash, inputCommitments.inputHash),
        eq(latestChallenges.rowNumber, 1)
      )
    )
    .where(and(...conditions))
    .orderBy(desc(inputCommitments.blockNumber))
    .limit(100);

  const commitments = rows.map(({ inputCommitments, latestChallenges }) => ({
    ...inputCommitments,
    challenge: latestChallenges,
  }));

  return commitments;
}
