export interface UserInfo {
  email: string,
  image: number,
  name: string,
  uid: string,
}

const lsKeyToken = "sharethecost:auth:token";
let user: UserInfo | null = null;

export function init() {
  const token = localStorage.getItem(lsKeyToken);
  readDataFromToken(token);
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

export function saveAuth(token: string) {
  localStorage.setItem(lsKeyToken, token);
  readDataFromToken(token);
}

export function deleteAuth(): void {
  localStorage.removeItem(lsKeyToken);
  user = null;
}

function readDataFromToken(token: string|null) {
  if (!token) {
    user = null;
    return;
  }

  const payloadStr = atob(token.split(".")[1].replace(/_/g, "/").replace(/-/g, "+"));
  const payload = JSON.parse(payloadStr);

  // Check token validity
  const now = new Date().getTime() / 1000;
  if (now < payload.nbf || now > payload.exp || payload.iss !== "sharethecost") {
    user = null;
    return;
  }

  user = {
    email: payload.email,
    image: payload.image,
    name: payload.name,
    uid: payload.uid
  }
}
