import { pgTable } from "drizzle-orm/pg-core";
import { asBigInt, asHex, asAddress } from "@latticexyz/store-sync/postgres";

export const txInputs = pgTable("tx_inputs", {
  taskId: asBigInt("task_id", "numeric").notNull(),
  chainId: asBigInt("chain_id", "numeric").notNull(),
  blockHash: asHex("block_hash").notNull(),
  blockNumber: asBigInt("block_number", "numeric").notNull(),
  txHash: asHex("tx_hash").notNull(),
  txIndex: asBigInt("tx_index", "numeric").notNull(),
  txSigner: asAddress("tx_signer").notNull(),
  txTo: asAddress("tx_to").notNull(),
  txInput: asHex("tx_input").notNull(),
});
