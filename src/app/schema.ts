import { pgTable } from "drizzle-orm/pg-core";
import {
  asBigInt,
  asHex,
  asAddress,
  asNumber,
} from "@latticexyz/store-sync/postgres";

export const txInputs = pgTable("tx_inputs", {
  chainId: asNumber("chain_id", "numeric"),
  blockHash: asHex("block_hash"),
  blockNumber: asBigInt("block_num", "numeric"),
  txHash: asHex("tx_hash"),
  txIndex: asBigInt("tx_idx", "numeric"),
  txSigner: asAddress("tx_signer"),
  txTo: asAddress("tx_to"),
  txInput: asHex("tx_input"),
});

export const challengeStatus = pgTable("challenge_status", {
  chainId: asNumber("chain_id", "numeric"),
  blockHash: asHex("block_hash"),
  blockNumber: asBigInt("block_num", "numeric"),
  txHash: asHex("tx_hash"),
  logAddress: asAddress("log_addr"),
  challengedHash: asHex("challenged_hash"),
  challengedBlockNumber: asBigInt("challenged_block_num", "numeric"),
  status: asNumber("status", "numeric"),
});
