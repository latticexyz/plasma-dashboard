import { pgTable, numeric, customType } from "drizzle-orm/pg-core";
import {
  Hex,
  ByteArray,
  hexToBytes,
  bytesToHex,
  Address,
  getAddress,
} from "viem";

// TODO: export from @latticexyz/store-sync
const asHex = (name: string) =>
  customType<{ data: Hex; driverData: ByteArray }>({
    dataType() {
      return "bytea";
    },
    toDriver(data: Hex): ByteArray {
      return hexToBytes(data);
    },
    fromDriver(driverData: ByteArray): Hex {
      return bytesToHex(driverData);
    },
  })(name);

// TODO: export from @latticexyz/store-sync
const asAddress = (name: string) =>
  customType<{ data: Address; driverData: ByteArray }>({
    dataType() {
      return "bytea";
    },
    toDriver(data: Address): ByteArray {
      return hexToBytes(data);
    },
    fromDriver(driverData: ByteArray): Address {
      return getAddress(bytesToHex(driverData));
    },
  })(name);

export const txInputs = pgTable("tx_inputs", {
  taskId: numeric("task_id"),
  chainId: numeric("chain_id"),
  blockHash: asHex("block_hash"),
  blockNumber: numeric("block_number"),
  txHash: asHex("tx_hash"),
  txIndex: numeric("tx_index"),
  txSigner: asAddress("tx_signer"),
  txTo: asAddress("tx_to"),
  txInput: asHex("tx_input"),
});
