"use server";

import { InputCommitment } from "@/common";
import { database } from "@/database";
import { Hex } from "viem";

export async function getCommitment(
  inputHash: Hex
): Promise<InputCommitment | undefined> {
  return await database.query.inputCommitments.findFirst({
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
    where: (table, { eq }) => eq(table.inputHash, inputHash),
  });
}
