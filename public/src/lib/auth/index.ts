import config from "$lib/config.json";
import {
  deleteCredentials,
  fetch,
  fetchJSON,
  getUserInfo,
  init,
  saveCredentials
} from "./session";

export { fetch, fetchJSON, getUserInfo, init as initAuth };

export async function loginUserPass(email: string, pass: string): Promise<void> {
  const resp = await fetchJSON(`${config.auth}/login`, { email, pass });
  if (!resp.ok) {
    throw new Error(`login error: ${resp.error}`);
  }
  saveCredentials(resp.token);
}

export async function registerUserPass(email: string, image: number, name: string, pass: string): Promise<void> {
  const resp = await fetchJSON(`${config.auth}/register`, { email, image, name, pass });
  if (!resp.ok) {
    throw new Error(`register error: ${resp.error}`);
  }
}

export function logout(): void {
  deleteCredentials();
}
