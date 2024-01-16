import { start } from "./api.js";
import { connect } from "./db.js";
import { load } from "./config.js";

async function main() {
  const config = await load("config/db.json")
  connect(config.db.uri)
  start(config.api.prefix);
}

main();
