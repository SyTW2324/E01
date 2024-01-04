<script lang="ts">
	import { writable, type Writable } from "svelte/store";
	import GroupsWindow from "$lib/components/group/window.svelte";
	import { setContext } from "svelte";
	import type { Group } from "$lib/db/groups";
	import { ContextKeys } from "$lib/shared";

	/** @type {import('./$types').PageData} */
    export let data;
	let groups: Writable<Group[]> = writable([]);
	let gid = writable("");
	setContext(ContextKeys.listGroups, groups);
	setContext(ContextKeys.selectedGroupID, gid);

    function load(data) {
		groups.set(data.groups);
    }
    $: load(data);
</script>

<main class="bg-ruster flex items-stretch min-h-screen w-full">
    <GroupsWindow groups={$groups} selectedGroup={$gid} />
	<slot />
</main>
