import { Hex, Address, isHex } from "viem";

export type InputCommitment = {
  blockNumber: bigint;
  txHash: Hex;
  txFrom: Address;
  txTo: Address;
  inputHash: Hex;
  challenge: { status: number } | null;
};

export enum ChallengeStatus {
  Unchallenged = "unchallenged",
  Challenged = "challenged",
  Resolved = "resolved",
  Expiring = "expiring",
  Expired = "expired",
  Unknown = "unknown",
}

if (!isHex(process.env.NEXT_PUBLIC_BATCHER, { strict: true })) {
  throw new Error(
    "Missing or invalid NEXT_PUBLIC_BATCHER environment variable"
  );
}
export const batcher = process.env.NEXT_PUBLIC_BATCHER;

if (!isHex(process.env.NEXT_PUBLIC_BATCHER_INBOX, { strict: true })) {
  throw new Error(
    "Missing or invalid NEXT_PUBLIC_BATCHER_INBOX environment variable"
  );
}
export const batcherInbox = process.env.NEXT_PUBLIC_BATCHER_INBOX;

if (!isHex(process.env.NEXT_PUBLIC_CHALLENGE_CONTRACT, { strict: true })) {
  throw new Error(
    "Missing or invalid NEXT_PUBLIC_CHALLENGE_CONTRACT environment variable"
  );
}
export const challengeContract = process.env.NEXT_PUBLIC_CHALLENGE_CONTRACT;
