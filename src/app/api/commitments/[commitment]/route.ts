import superjson from "superjson";
import { secondsPerBlock } from "@/common";
import { isHex } from "viem";
import { getCommitment } from "@/getCommitment";

export const revalidate = secondsPerBlock;

export async function GET(
  req: Request,
  { params }: { params: { commitment: string } }
) {
  if (!isHex(params.commitment)) {
    return Response.json({ error: "expected hex input hash" }, { status: 400 });
  }

  const commitment = await getCommitment(params.commitment);

  return Response.json(superjson.serialize(commitment));
}
