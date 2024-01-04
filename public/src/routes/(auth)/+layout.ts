import { getUserInfo } from '$lib/auth';
import { redirect } from '@sveltejs/kit';

export function load() {
  if (getUserInfo() !== null) {
    throw redirect(302, "/group");
  }
}