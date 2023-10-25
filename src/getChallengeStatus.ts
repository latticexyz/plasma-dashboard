import { InputCommitment, ChallengeStatus } from "./common";

export function getChallengeStatus(
  commitment: InputCommitment
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
  // TODO: Expiring status (needs data about current block and challenge window)
  // TODO: should we return `unknown` type instead of this?
  return ChallengeStatus.Unknown;
}
