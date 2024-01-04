<script lang="ts">
	import { Icon, User } from "svelte-hero-icons"
	import PP01 from "$lib/images/profile-pics/01.webp"
	import Window from "$lib/components/window.svelte";

    // export let transactions: Transaction[];
    // export let selectedGroup: string;
</script>

<Window title="transactions" windowRenderLevel={3}>
	<!-- <List transactions={transactions} selectedGroup={selectedGroup} /> -->
	<a href="/profile" class="flex items-center p-2 text-xl hover:bg-neth-400">
		<Icon src={User} solid class="h-8 w-8" />
		<span class="grow mx-2 text-center">Miguel Dorta</span>
		<img src={PP01} alt="Avatar" class="h-8 rounded">
	</a>
</Window>
