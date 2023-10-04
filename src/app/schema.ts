import { pgTable } from "drizzle-orm/pg-core";
import { asBigInt, asHex, asAddress } from "@latticexyz/store-sync/postgres";

export const txInputs = pgTable("tx_inputs", {
  taskId: asBigInt("task_id", "numeric"),
  chainId: asBigInt("chain_id", "numeric"),
  blockHash: asHex("block_hash"),
  blockNumber: asBigInt("block_number", "numeric"),
  txHash: asHex("tx_hash"),
  txIndex: asBigInt("tx_index", "numeric"),
  txSigner: asAddress("tx_signer"),
  txTo: asAddress("tx_to"),
  txInput: asHex("tx_input"),
});
