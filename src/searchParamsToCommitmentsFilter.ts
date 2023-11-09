import { ChallengeStatus } from "@/common";
import { ChallengeConfig } from "@/getChallengeConfig";
import { CommitmentsFilter } from "@/getLatestCommitments";
import { isAddress } from "viem";

export function searchParamsToCommitmentsFilter(
  searchParams: URLSearchParams,
  latestBlockNumber: bigint,
  challengeConfig: ChallengeConfig
): CommitmentsFilter {
  const filter: CommitmentsFilter = { latestBlockNumber, challengeConfig };

  // TODO: parse with zod?

  const fromBlock = searchParams.get("fromBlock");
  if (typeof fromBlock === "string" && /^\d+$/.test(fromBlock)) {
    filter.fromBlock = BigInt(fromBlock);
  }

  const toBlock = searchParams.get("toBlock");
  if (typeof toBlock === "string" && /^\d+$/.test(toBlock)) {
    filter.toBlock = BigInt(toBlock);
  }

  const from = searchParams.get("from");
  if (typeof from === "string" && isAddress(from)) {
    filter.from = from;
  }

  const status = searchParams.get("status");
  if (
    typeof status === "string" &&
    Object.values(ChallengeStatus).includes(status as ChallengeStatus)
  ) {
    filter.status = status as ChallengeStatus;
  }

  return filter;
}
