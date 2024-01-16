export interface UserInfo {
  email: string,
  image: number,
  name: string,
  uid: string,
}

const lsKeyToken = "sharethecost:auth:token";
let user: UserInfo | null = null;
let isInitialized = false;

function fetchWithCredentials(url: string, options?: RequestInit): Promise<Response> {
  const token = localStorage.getItem(lsKeyToken);

  if (token) {
    if (!options || typeof options !== "object") {
      options = {headers: new Headers()};
    }
    if (!options.headers || typeof options.headers !== "object") {
      options.headers = new Headers();
    }
    if (!(options.headers instanceof Headers)) {
      options.headers = new Headers(options.headers);
    }
    options.headers.set("Authorization", `Bearer ${token}`);
  }
  return fetch(url, options);
}
export { fetchWithCredentials as fetch };

export async function fetchJSON(url: string, data?: unknown): Promise<any> {
  return (await fetchWithCredentials(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })).json();
}

export function getUserInfo(): UserInfo | null {
  init();
  return user;
}

export function saveCredentials(token: string) {
  localStorage.setItem(lsKeyToken, token);
  readDataFromToken(token);
}

export function deleteCredentials(): void {
  localStorage.removeItem(lsKeyToken);
  user = null;
}

function init() {
  if (isInitialized) return;
  isInitialized = true;
  readDataFromToken(localStorage.getItem(lsKeyToken));
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
