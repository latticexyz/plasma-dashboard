import { getInputCommitments } from "./getInputCommitments";

type Props = {
  from: bigint;
  to: bigint;
};

export default async function Commitments({ from, to }: Props) {
  const inputCommitments = await getInputCommitments({
    from,
    to,
  });

  return (
    <div>
      <p>
        Commitments from {from.toString()} to {to.toString()}
      </p>
      <ul>
        {inputCommitments.map((row) => (
          <li key={row.inputCommitment}>
            block: {row.blockNumber?.toString()}, commitment:{" "}
            {row.inputCommitment}
          </li>
        ))}
      </ul>
    </div>
  );
}
