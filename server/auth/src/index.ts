import { start } from "./api.js";
import { init as initBcrypt } from "./bcrypt.js";
import { load } from "./config.js";
import { init as initCrypto } from "./crypto_utils.js";
import { connect } from "./db.js";
import { init as initJWT } from "./jwt.js";
import { init as initLog } from "./logger.js";

async function main() {
  const config = await load("config/auth.json");
  initLog(config);
  connect(config.db.uri);
  initCrypto(config);
  initBcrypt(config.hash.saltRounds);
  initJWT(config);
  start(config.api.prefix);
}

main();
