<script lang="ts">
    import { Icon, Plus } from "svelte-hero-icons";
	import GroupListItem from "./group-list-item.svelte";
    export let groups: {[gid: string]: string};
    export let selectedGroup: string = "";
</script>

<div class="bg-white grow relative text-gray-800">
    <ul class="divide-gray-100 divide-y">
        {#each Object.entries(groups) as [gid, groupName]}
            <GroupListItem href="/group/{gid}" selected={gid === selectedGroup}>
                {groupName}
            </GroupListItem>
        {/each}
    </ul>
    <button class="absolute bg-neth bottom-4 h-12 p-1 right-4 rounded-full shadow text-white hover:bg-neth-400">
        <Icon src={Plus} />
    </button>
</div>
