import { generateKeyPair } from "node:crypto"

const refreshEvery = 3 * 24 * 60 * 60 * 1000; // Refresh every 3 days
let prvKey = "";
let pubkey = "";
let refreshKeysAt = 0;

async function getPrivateKey(): Promise<string> {
  await refreshKeys();
  return prvKey;
}

async function getPublicKey(): Promise<string> {
  await refreshKeys();
  return pubkey;
}

async function refreshKeys(): Promise<void> {
  const now = new Date().getTime();
  if (now < refreshKeysAt) {
    return;
  }
  const {publicKey, privateKey} = await genKeys();
  pubkey = publicKey;
  prvKey = privateKey;
  refreshKeysAt = now + refreshEvery;
}

function genKeys(): Promise<{publicKey: string, privateKey: string}> {
  return new Promise((resolve, reject) => {
    generateKeyPair("ed25519", {
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
