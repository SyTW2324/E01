<script lang="ts">
    import { Icon, Plus } from "svelte-hero-icons";
	import Item from "$lib/components/group/item.svelte";
	import type { Group } from "$lib/db/groups";
    export let groups: Group[];
    export let selectedGroup: string;
</script>

<div class="bg-white grow relative text-gray-800">
    <ul class="divide-gray-100 divide-y">
        {#each groups as group}
            <Item href="/group/{group.gid}" selected={group.gid === selectedGroup}>
                {group.name}
            </Item>
        {/each}
    </ul>
    <button class="absolute bg-neth bottom-4 h-12 p-1 right-4 rounded-full shadow text-white hover:bg-neth-400">
        <Icon src={Plus} />
    </button>
</div>
