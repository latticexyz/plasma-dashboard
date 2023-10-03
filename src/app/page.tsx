// import { getInputCommitments } from "./getInputCommitments";

export default async function Home() {
  const inputCommitments = []; //await getInputCommitments();

  return (
    <div>
      <h1>Database rows</h1>
      <ul>
        {inputCommitments.map((row) => (
          <li key={row.txHash}>
            block: {row.blockNumber}, hash: {row.txInput}
          </li>
        ))}
      </ul>
    </div>
  );
}
