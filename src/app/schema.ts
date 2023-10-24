import { pgTable } from "drizzle-orm/pg-core";
import { asBigInt, asHex, asAddress } from "@latticexyz/store-sync/postgres";

export const txInputs = pgTable("tx_inputs", {
  chainId: asBigInt("chain_id", "numeric").notNull(),
  blockHash: asHex("block_hash").notNull(),
  blockNumber: asBigInt("block_num", "numeric").notNull(),
  txHash: asHex("tx_hash").notNull(),
  txIndex: asBigInt("tx_idx", "numeric").notNull(),
  txSigner: asAddress("tx_signer").notNull(),
  txTo: asAddress("tx_to").notNull(),
  txInput: asHex("tx_input").notNull(),
});

// TODO: add schema for challenges table
