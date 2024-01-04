import { redirect } from '@sveltejs/kit';
import { getUserInfo } from '$lib/auth';
import { getGroups } from '$lib/db/groups.js';

export async function load() {
  /*if (!getUserInfo()) {
    throw redirect(302, "/login");
  }*/
  const groups = await getGroups();
  return { groups }
}
