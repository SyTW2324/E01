import { parse as parsePath } from "$lib/path/path";

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param: string): boolean {
    return !!parsePath(param);
}
