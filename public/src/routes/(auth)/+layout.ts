import { goto } from '$app/navigation';
import { getUserInfo } from '$lib/auth';

export const ssr = false;

export function load() {
  if (getUserInfo()) {
    goto("/");
  }
}
