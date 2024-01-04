<script lang="ts">
	import { ContextKeys } from "$lib/shared";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

    export let title: string;
	export let windowRenderLevel: number;
	let currentRenderLevel = getContext(ContextKeys.currentRenderLevel) as Writable<number>;
</script>

<div class="w-full md:p-3 md:w-1/2 lg:w-1/3 {windowRenderLevel - $currentRenderLevel === -1 ? "hidden md:block" : ""} {windowRenderLevel - $currentRenderLevel === -2 ? "hidden lg:block" : ""}">
	<div class="bg-neth border border-neth-600 flex flex-col h-full shadow text-white w-full md:rounded">
		<h2 class="mb-3 mt-2 text-center text-xl">{title}</h2>
		<slot />
	</div>
</div>
