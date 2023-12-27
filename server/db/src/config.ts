import { readFile } from 'node:fs/promises'

export interface Config {
  db: {
    uri: string
  }
}

export async function load(path: string) {
  let f: string;
  try {
    f = await readFile(path, {encoding: "utf-8"});
  } catch (err: any) {
    console.error(err.message);
    process.exit(err.errno);
  }

  let config: unknown;
  try {
    config = JSON.parse(f);
  } catch (err: any) {
    console.error(`Error parsing JSON from file '${path}': ${err.message}`);
    process.exit(1);
  }

  try {
    return parseConfig(config);
  } catch (err: any) {
    console.error(`Error parsing config from file '${path}': ${err.message}`);
    process.exit(1);
  }
}

function parseConfig(c: unknown): Config {
  if (typeof c !== "object" || c === null || !("version" in c) || typeof c.version !== "number") {
    throw new Error("Invalid config");
  }
  if (c.version > 1) {
    throw new Error("Config version not supported (supported versions: 1 or below)");
  }

  // TODO improve checking data
  return c as any as Config
}
