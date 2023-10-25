import { pgTable } from "drizzle-orm/pg-core";
import {
  asBigInt,
  asHex,
  asAddress,
  asNumber,
} from "@latticexyz/store-sync/postgres";
import { relations } from "drizzle-orm";

// TODO: make integration table columns actually not null, or remove `notNull()` usage here

export const inputCommitments = pgTable("tx_inputs", {
  chainId: asNumber("chain_id", "numeric").notNull(),
  blockHash: asHex("block_hash").notNull(),
  blockNumber: asBigInt("block_num", "numeric").notNull(),
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
  txHash: asHex("tx_hash").notNull(),
  logAddress: asAddress("log_addr").notNull(),
  challengedHash: asHex("challenged_hash").notNull(),
  challengedBlockNumber: asBigInt("challenged_block_num", "numeric").notNull(),
  status: asNumber("status", "numeric").notNull(),
});

export const inputChallenges = relations(inputCommitments, ({ one }) => ({
  challenge: one(challenges, {
    fields: [
      inputCommitments.chainId,
      inputCommitments.blockNumber,
      inputCommitments.inputHash,
    ],
    references: [
      challenges.chainId,
      challenges.challengedBlockNumber,
      challenges.challengedHash,
    ],
  }),
}));
