import { pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { asNumber, asHex, asBigInt, asAddress } from "./columnTypes";

// TODO: make integration table columns actually not null, or remove `notNull()` usage here

export const inputCommitments = pgTable("tx_inputs", {
  chainId: asNumber("chain_id", "numeric").notNull(),
  blockHash: asHex("block_hash").notNull(),
  blockNumber: asBigInt("block_num", "numeric").notNull(),
  blockTimestamp: asNumber("block_time", "numeric").notNull(),
  txHash: asHex("tx_hash").notNull(),
  txIndex: asBigInt("tx_idx", "numeric").notNull(),
  txFrom: asAddress("tx_signer").notNull(),
  txTo: asAddress("tx_to").notNull(),
  inputHash: asHex("tx_input").notNull(),
});

export const challenges = pgTable("challenge_status", {
  chainId: asNumber("chain_id", "numeric").notNull(),
  blockHash: asHex("block_hash").notNull(),
  blockNumber: asBigInt("block_num", "numeric").notNull(),
  blockTimestamp: asNumber("block_time", "numeric").notNull(),
  txHash: asHex("tx_hash").notNull(),
  txFrom: asAddress("tx_signer").notNull(),
  logAddress: asAddress("log_addr").notNull(),
  challengedHash: asHex("challenged_hash").notNull(),
  challengedBlockNumber: asBigInt("challenged_block_num", "numeric").notNull(),
  status: asNumber("status", "numeric").notNull(),
});

export const challengeInputCommitment = relations(challenges, ({ one }) => ({
  inputCommitment: one(inputCommitments, {
    fields: [
      challenges.chainId,
      challenges.challengedBlockNumber,
      challenges.challengedHash,
    ],
    references: [
      inputCommitments.chainId,
      inputCommitments.blockNumber,
      inputCommitments.inputHash,
    ],
  }),
}));

export const inputChallenges = relations(inputCommitments, ({ many }) => ({
  challenges: many(challenges),
}));
