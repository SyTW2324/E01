import { ErrInvalidToken, fetch, fetchJSON } from "$lib/auth";
import config from "$lib/config.json";

export interface Group {
  gid: string;
  members: {[userID: string]: string};
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getGroups(): Promise<Group[]> {
  const resp = await fetch(`${config.db}/group`);
  if (!resp.ok && (await resp.json()).error === "Invalid token") {
    throw ErrInvalidToken;
  }
  return resp.json();
}

export async function getGroup(gid: string): Promise<Group> {
  return (await fetch(`${config.db}/group/${gid}`)).json();
}

export async function postNewGroup(group: Group) {
  return await fetchJSON(`${config.db}/group`, group)
}

export async function updateGroup(group: Group): Promise<Group> {
  return await fetchJSON(`${config.db}/group/${group.gid}`, {}, "PUT")
}

// PATCHS por ahora sin hacer

export async function deleteGroup(gid: string): Promise<Group> {
  return (await fetch(`${config.db}/group/${gid}`, {method: "DELETE"})).json();
}