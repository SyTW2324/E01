<script lang="ts">
	import { writable, type Writable } from "svelte/store";
	import GroupsWindow from "$lib/components/group/window.svelte";
	import { setContext } from "svelte";
	import type { Group } from "$lib/db/groups";

	/** @type {import('./$types').PageData} */
    export let data;
	let groups: Writable<Group[]> = writable([]);
	let selectedGroup = writable("");
	setContext("groups", groups);
	setContext("group", selectedGroup);

    function load(data) {
		groups.set(data.groups);
    }
    $: load(data);
</script>

<main class="bg-ruster flex items-stretch min-h-screen w-full">
    <GroupsWindow groups={$groups} selectedGroup={$selectedGroup} />
	<slot />
</main>
