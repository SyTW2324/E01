import { getGroups } from '$lib/db/groups.js';

export async function load() {
  const groups = await getGroups();
  return { groups }
}
