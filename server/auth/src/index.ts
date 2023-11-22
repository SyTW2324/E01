import { load } from "./config";

async function main() {
  console.log(await load("config/auth.json"));
}

main();
