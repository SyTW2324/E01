import { ErrInvalidToken, fetch, fetchJSON } from "$lib/auth";
import type { UserInfo } from "$lib/auth/session";
import config from "$lib/config.json";

export interface Group {
  gid: string;
  members: {[uid: string]: string};
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getGroups(): Promise<{[gid: string]: Group}> {
  const resp = await fetch(`${config.db}/group`);
  if (!resp.ok && (await resp.json()).error === "Invalid token") {
    throw ErrInvalidToken;
  }
  return (await resp.json()).groups.reduce((acc, val) => {
    acc[val.gid] = val;
    return acc;
  }, {} as {[gid: string]: Group});
}

export async function getGroup(gid: string): Promise<Group> {
  return (await fetch(`${config.db}/group/${gid}`)).json();
}

export async function createGroup(user: UserInfo) {
  const members = {} as {[uid: string]: string}
  members[user.uid] = user.name;
  return (await fetchJSON(`${config.db}/group`, {
    members,
    name: "@ New Group"
  })).group;
}

export async function updateGroup(group: Group): Promise<Group> {
  return await fetchJSON(`${config.db}/group/${group.gid}`, group, "PUT")
}

// PATCHS por ahora sin hacer

export async function deleteGroup(gid: string): Promise<Group> {
  return (await fetch(`${config.db}/group/${gid}`, {method: "DELETE"})).json();
}