import { start } from "./api.js";
import { init } from "./bcrypt.js";
import { load } from "./config.js";
import { connect } from "./db.js";

async function main() {
  const config = await load("config/auth.json");
  connect(config.db.uri);
  init(config.hash.saltRounds);
  start(config.api.prefix);
}

main();
