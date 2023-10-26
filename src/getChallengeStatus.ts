import { InputCommitment, ChallengeStatus } from "./common";
import { ChallengeConfig } from "./getChallengeConfig";

export function getChallengeStatus(
  commitment: InputCommitment,
  challengeConfig: ChallengeConfig,
  blockNumber: bigint
): ChallengeStatus {
  if (commitment.challenge == null) {
    return ChallengeStatus.Unchallenged;
  }
  // https://github.com/latticexyz/quarry/blob/a7ede59824b7d258ebdd3df4607f51a642d43c4c/contracts/src/DataAvailabilityChallenge.sol#L5-L10
  switch (commitment.challenge.status) {
    case 0: // Uninitialized
      return ChallengeStatus.Unchallenged;
    case 1: // Active
      return ChallengeStatus.Challenged;
    case 2: // Resolved
      return ChallengeStatus.Resolved;
    case 3: // Expired
      return ChallengeStatus.Expired;
  }

  // keep in sync with https://github.com/latticexyz/quarry/blob/a7ede59824b7d258ebdd3df4607f51a642d43c4c/contracts/src/DataAvailabilityChallenge.sol#L98
  const isInResolveWindow =
    blockNumber <=
    commitment.challenge.blockNumber + challengeConfig.resolveWindowBlocks;

  if (!isInResolveWindow) {
    return ChallengeStatus.Expiring;
  }

  // TODO: should we return `unknown` type instead of this?
  return ChallengeStatus.Unknown;
}
