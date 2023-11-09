import superjson from "superjson";
import { getBlockNumber } from "viem/actions";
import { searchParamsToCommitmentsFilter } from "../../../searchParamsToCommitmentsFilter";
import { getChallengeConfig } from "@/getChallengeConfig";
import { client } from "@/viemClient";
import { getLatestCommitments } from "@/getLatestCommitments";
import { secondsPerBlock } from "@/common";

export const revalidate = secondsPerBlock;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const [latestBlockNumber, challengeConfig] = await Promise.all([
    getBlockNumber(client, { cacheTime: 0 }),
    getChallengeConfig(client),
  ]);

  const filter = searchParamsToCommitmentsFilter(
    new URLSearchParams(searchParams),
    latestBlockNumber,
    challengeConfig
  );

  const commitments = await getLatestCommitments(filter);

  return Response.json(superjson.serialize({ commitments }));
}
