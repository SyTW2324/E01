import { start } from "./api";
import { init } from "./bcrypt";
import { load } from "./config";
import { connect } from "./db";

async function main() {
  const config = await load("config/auth.json");
  connect(config.db.uri);
  init(config.hash.saltRounds);
  start();
}

main();
