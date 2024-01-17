import { start } from "./api.js";
import { init as initBcrypt } from "./bcrypt.js";
import { load } from "./config.js";
import { init as initCrypto } from "./crypto_utils.js";
import { connect } from "./db.js";
import { init as initJWT } from "./jwt.js";

async function main() {
  const config = await load("config/auth.json");
  connect(config.db.uri);
  initCrypto(config);
  initBcrypt(config.hash.saltRounds);
  initJWT(config);
  start(config.api.prefix);
}

main();
