"use server";

import {
  ChallengeStatus,
  InputCommitment,
  batcher,
  batcherInbox,
} from "@/common";
import { database } from "@/database";
import { SQLWrapper, and, desc, eq, gte, isNull, lt, lte } from "drizzle-orm";
import { Address } from "viem";
import { challenges, inputCommitments } from "./schema";
import { isNotNull, uniqueBy } from "@latticexyz/common/utils";
import { ChallengeConfig } from "./getChallengeConfig";

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
    conditions.push(eq(challenges.txFrom, filter.from));
  }

  // TODO: redo challenged/expired status to have a block number range check
  if (filter.status === ChallengeStatus.Unchallenged) {
    conditions.push(isNull(challenges.status));
  } else if (filter.status === ChallengeStatus.Challenged) {
    conditions.push(
      and(
        eq(challenges.status, 1),
        gte(
          challenges.blockNumber,
          filter.latestBlockNumber - filter.challengeConfig.resolveWindowBlocks
        )
      )
    );
  } else if (filter.status === ChallengeStatus.Expired) {
    conditions.push(
      and(
        eq(challenges.status, 1),
        lt(
          challenges.blockNumber,
          filter.latestBlockNumber - filter.challengeConfig.resolveWindowBlocks
        )
      )
    );
  } else if (filter.status === ChallengeStatus.Resolved) {
    conditions.push(eq(challenges.status, 2));
  }

  const rows = await database
    .select()
    .from(inputCommitments)
    .fullJoin(
      challenges,
      and(
        eq(challenges.chainId, inputCommitments.chainId),
        eq(challenges.challengedBlockNumber, inputCommitments.blockNumber),
        eq(challenges.challengedHash, inputCommitments.inputHash)
      )
    )
    .where(and(...conditions))
    .orderBy(desc(inputCommitments.blockNumber))
    .limit(100);

  const commitments = uniqueBy(
    rows.map((row) => row.inputCommitments).filter(isNotNull),
    (commitment) =>
      JSON.stringify({
        chainId: commitment.chainId,
        blockNumber: commitment.blockNumber.toString(),
        inputHash: commitment.inputHash,
      })
  ).map((commitment) => ({
    ...commitment,
    challenges: rows
      .map((row) => row.challenges)
      .filter(isNotNull)
      .filter(
        (challenge) =>
          challenge.chainId === commitment.chainId &&
          challenge.challengedBlockNumber === commitment.blockNumber &&
          challenge.challengedHash === commitment.inputHash
      ),
  }));

  return commitments;
}
