<script lang="ts">
	import { writable } from "svelte/store";
	import GroupsWindow from "$lib/components/group/window.svelte";
	import { setContext } from "svelte";
	import type { Group } from "$lib/db/groups";

	/** @type {import('./$types').PageData} */
    export let data;
	let groups: Group[] = [];
	let selectedGroup = writable("");
	setContext("group", selectedGroup);

    function load(data) {
		groups = data.groups;
    }
    $: load(data);
</script>

<main class="bg-ruster flex items-stretch justify-center min-h-screen w-full">
    <GroupsWindow groups={groups} selectedGroup={$selectedGroup} />
	<slot />
</main>
