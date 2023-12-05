import { generateKeyPair } from "node:crypto"

const refreshEvery = 3 * 24 * 60 * 60 * 1000; // Refresh every 3 days
let refreshKeysAt = 0;
let keys = {
  publicKey: "",
  privateKey: "",
}

export async function getKeys(): Promise<{publicKey: string, privateKey: string}> {
  const now = new Date().getTime();
  if (now > refreshKeysAt) {
    refreshKeysAt = now + refreshEvery;
    keys = await genKeys();
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
