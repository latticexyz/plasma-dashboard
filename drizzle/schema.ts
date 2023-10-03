import { pgTable, numeric } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"


export const txInputs = pgTable("tx_inputs", {
	taskId: numeric("task_id"),
	chainId: numeric("chain_id"),
	// TODO: failed to parse database type 'bytea'
	blockHash: unknown("block_hash"),
	blockNumber: numeric("block_number"),
	// TODO: failed to parse database type 'bytea'
	txHash: unknown("tx_hash"),
	txIndex: numeric("tx_index"),
	// TODO: failed to parse database type 'bytea'
	txSigner: unknown("tx_signer"),
	// TODO: failed to parse database type 'bytea'
	txTo: unknown("tx_to"),
	// TODO: failed to parse database type 'bytea'
	txInput: unknown("tx_input"),
});