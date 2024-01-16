import { goto } from '$app/navigation';
import { getUserInfo } from '$lib/auth';
import { isPrerender } from '$lib/prerender/check';

export function load() {
  if (isPrerender) {
    return;
  }
  if (getUserInfo()) {
    goto("/");
  }
}
