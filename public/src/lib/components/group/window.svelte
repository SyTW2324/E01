<script lang="ts">
	import { Icon, User } from "svelte-hero-icons"
	import PP01 from "$lib/images/profile-pics/01.webp"
	import List from "$lib/components/group/list.svelte";
	import Window from "$lib/components/window.svelte";
	import type { Group } from "$lib/db/groups";
	import { logout } from "$lib/auth";
	import { goto } from "$app/navigation";

    export let groups: {[gid: string]: Group};
    export let selectedGroup: string;
	export let renderPriority: number;

	function sortedGroupList(groups: {[gid: string]: Group}) {
		const compare = Intl.Collator().compare;
		const groupList = Object.values(groups);
		return groupList.sort((g1, g2) => compare(g1.name, g2.name));
	}

	function btnLogout() {
		logout();
		goto("/login");
	}
</script>

<Window title="Groups" renderPriority={renderPriority}>
	<List groups={sortedGroupList(groups)} selectedGroup={selectedGroup} />
	<button class="flex items-center p-2 text-xl hover:bg-neth-400" on:click={btnLogout}>
		<Icon src={User} solid class="h-8 w-8" />
		<span class="grow mx-2 text-center">Log out</span>
		<img src={PP01} alt="Avatar" class="h-8 rounded">
	</button>
</Window>
