import { goto } from '$app/navigation';
import { getUserInfo } from '$lib/auth';

export function load() {
  if (typeof localStorage === "undefined") {
    return;
  }
  if (getUserInfo()) {
    goto("/");
  }
}
