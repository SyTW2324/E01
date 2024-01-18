<script lang="ts">
    import { Icon, Plus } from "svelte-hero-icons";
	import Item from "$lib/components/group/item.svelte";
	import { createGroup, type Group } from "$lib/db/groups";
	import { getUserInfo } from "$lib/auth";
	import { goto } from "$app/navigation";
    export let groups: Group[];
    export let selectedGroup: string;

    async function newGroup() {
        const gid = (await createGroup(getUserInfo()!)).gid;
        goto(`/group/${gid}`);
    }
</script>

<div class="bg-white grow relative text-gray-800">
    <ul class="divide-gray-100 divide-y">
        {#each groups as group}
            <Item href="/group/{group.gid}" selected={group.gid === selectedGroup}>
                {group.name}
            </Item>
        {/each}
    </ul>
    <button class="absolute bg-neth bottom-4 h-12 p-1 right-4 rounded-full shadow text-white hover:bg-neth-400" on:click={newGroup}>
        <Icon src={Plus} />
    </button>
</div>
