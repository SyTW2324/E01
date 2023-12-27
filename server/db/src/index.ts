import { start } from "./api";
import { connect } from "./db";
import { load } from "./config";

async function main() {
  const config = await load("config/db.json")
  connect(config.db.uri)
  start();
}

main();
