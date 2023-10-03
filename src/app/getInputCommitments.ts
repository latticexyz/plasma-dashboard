import { database } from "./database";

export async function getInputCommitments() {
  return database.query.txInputs.findMany();
}
