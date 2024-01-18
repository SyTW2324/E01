import { generateKeyPair } from "node:crypto"
import { writeFile } from "node:fs/promises"
import { Config } from "./config.js";
import { warn } from "./logger.js";

const refreshEvery = 14 * 24 * 60 * 60 * 1000; // Refresh every 14 days
let refreshKeysAt = 0;
let keys = {
  publicKey: "",
  privateKey: "",
}
let pubkeyPath: string;

export function init(c: Config) {
  pubkeyPath = c.crypto.pubkey;
  getKeys();
}

export async function getKeys(): Promise<{publicKey: string, privateKey: string}> {
  const now = new Date().getTime();
  if (now > refreshKeysAt) {
    refreshKeysAt = now + refreshEvery;
    keys = await genKeys();
    writeFile(pubkeyPath, keys.publicKey, {encoding: "utf-8"}).catch(err => warn(`Pubkey not updated: ${err}`));
  }
  return keys;
}

function genKeys(): Promise<{publicKey: string, privateKey: string}> {
  return new Promise((resolve, reject) => {
    generateKeyPair("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      }
    }, (err, publicKey, privateKey) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({publicKey, privateKey})
    });
  })
}
