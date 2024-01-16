import { start } from "./api.js";
import { connect } from "./db.js";
import { load } from "./config.js";
import { init as initJWT } from "./jwt.js";


async function main() {
  const config = await load("config/db.json");
  initJWT(config);
  connect(config.db.uri);
  start(config.api.prefix);
}

main();
