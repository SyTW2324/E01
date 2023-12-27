<script lang="ts">
	import { writable } from "svelte/store";
	import GroupsWindow from "./groups-window.svelte";
	import { setContext } from "svelte";

    const group = writable("");
    setContext("group", group);
</script>

<main class="bg-ruster flex items-stretch justify-center min-h-screen w-full">
    <GroupsWindow selectedGroup={$group} />
	<slot />
</main>
