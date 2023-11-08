import { Hex, Address, isHex } from "viem";
import challengeContractAbi from "@/abi/DataAvailabilityChallenge.abi.json";

export { challengeContractAbi };

export type Challenge = {
  chainId: number;
  blockNumber: bigint;
  blockTimestamp: number;
  txHash: Hex;
  txFrom: Address;
  status: number;
};

export type InputCommitment = {
  chainId: number;
  blockNumber: bigint;
  blockTimestamp: number;
  txHash: Hex;
  txFrom: Address;
  txTo: Address;
  inputHash: Hex;
  latestChallenge: Challenge | null;
};

export enum ChallengeStatus {
  Unchallenged = "unchallenged",
  Challenged = "challenged",
  Resolved = "resolved",
  Expired = "expired",
  Unknown = "unknown",
}

// TODO: is hardcoding this enough of an estimate for challenge windows?
export const secondsPerBlock = 12;

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
export const challengeContract = process.env.NEXT_PUBLIC_CHALLENGE_CONTRACT; // TODO: is a hardcoded seconds per block a good enough estimate?
