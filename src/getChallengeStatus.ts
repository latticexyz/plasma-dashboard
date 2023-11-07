import { ChallengeStatus, Challenge } from "./common";
import { ChallengeConfig } from "./getChallengeConfig";

export function getChallengeStatus(
  challenge: Challenge | undefined,
  challengeConfig: ChallengeConfig,
  blockNumber: bigint
): ChallengeStatus {
  if (challenge == null) {
    return ChallengeStatus.Unchallenged;
  }

  // keep in sync with https://github.com/latticexyz/quarry/blob/a7ede59824b7d258ebdd3df4607f51a642d43c4c/contracts/src/DataAvailabilityChallenge.sol#L98
  const isInResolveWindow =
    blockNumber <= challenge.blockNumber + challengeConfig.resolveWindowBlocks;

  // `challenge.status` is based on the contract enum
  // https://github.com/latticexyz/quarry/blob/a7ede59824b7d258ebdd3df4607f51a642d43c4c/contracts/src/DataAvailabilityChallenge.sol#L4-L10
  switch (challenge.status) {
    case 0: // Uninitialized
      return ChallengeStatus.Unchallenged;
    case 1: // Active
      if (!isInResolveWindow) {
        return ChallengeStatus.Expired;
      }
      return ChallengeStatus.Challenged;
    case 2: // Resolved
      return ChallengeStatus.Resolved;
  }

  // TODO: should we return `unknown` type instead of this?
  return ChallengeStatus.Unknown;
}
