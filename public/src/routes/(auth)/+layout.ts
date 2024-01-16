import { goto } from '$app/navigation';
import { getUserInfo } from '$lib/auth';

export function load() {
  if (getUserInfo()) {
    goto("/");
  }
}
