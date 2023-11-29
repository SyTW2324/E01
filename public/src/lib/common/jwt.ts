import { verify, type JwtPayload } from "jsonwebtoken-esm";

export interface UserInfo {
  email: string,
  image: number,
  name: string,
  uid: string,
}

const lsPathAuth = "sharethecost:auth";
const lsKeyToken = `${lsPathAuth}:token`;
const lsKeyPubKey = `${lsPathAuth}:publickey`;

let user: UserInfo | null = null;

export function init() {
  const token = localStorage.getItem(lsKeyToken);
  const pubkey = localStorage.getItem(lsKeyPubKey);
  try {
    readDataFromToken(token!, pubkey!);
  } catch (_) {}
}

export function fetchWithAuth(url: string, options?: RequestInit): Promise<Response> {
  const token = localStorage.getItem(lsKeyToken);

  if (token) {
    if (!options || typeof options !== "object") {
      options = {headers: new Headers()};
    }
    if (!options.headers || typeof options.headers !== "object" || !(options.headers instanceof Headers)) {
      options.headers = new Headers();
    }
    options.headers.set("Authorization", `Bearer ${token}`);
  }
  return fetch(url, options);
}

export function getUserInfo(): UserInfo | null {
  return user;
}

export function saveAuth(token: string, pubkey: string) {
  localStorage.setItem(lsKeyToken, token);
  localStorage.setItem(lsKeyPubKey, pubkey);
  readDataFromToken(token, pubkey);
}

export function deleteAuth(): void {
  localStorage.removeItem(lsKeyToken);
  localStorage.removeItem(lsKeyPubKey);
}

function readDataFromToken(token: string, pubkey: string) {
  let tokenInfo = verify(token, pubkey, {
    algorithms: ["RS256"],
    issuer: "sharethecost",
  });
  if (typeof tokenInfo === "string") {
    tokenInfo = JSON.parse(tokenInfo);
  }

  user = {
    email: (tokenInfo as JwtPayload)["email"],
    image: (tokenInfo as JwtPayload)["image"],
    name: (tokenInfo as JwtPayload)["name"],
    uid: (tokenInfo as JwtPayload)["uid"],
  }
}
