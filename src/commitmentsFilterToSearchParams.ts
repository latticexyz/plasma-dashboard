import { CommitmentsFilter } from "./getLatestCommitments";

export function commitmentsFilterToSearchParams(
  filter: CommitmentsFilter
): URLSearchParams {
  const params = new URLSearchParams();
  if (filter.fromBlock != null) {
    params.set("fromBlock", filter.fromBlock.toString());
  }
  if (filter.toBlock != null) {
    params.set("toBlock", filter.toBlock.toString());
  }
  if (filter.status != null) {
    params.set("status", filter.status);
  }
  if (filter.from != null) {
    params.set("from", filter.from);
  }
  return params;
}
