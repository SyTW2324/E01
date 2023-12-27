<script lang="ts">
	import { Icon, User } from "svelte-hero-icons"
	import PP01 from "$lib/images/profile-pics/01.webp"
	import GroupList from "./group-list.svelte";
	import Window from "./window.svelte";

    export let selectedGroup: string;
</script>

<Window title="Groups">
	<GroupList groups={{
		"511a3c71-351f-4d18-87b5-7d057e860d87": "Comida de empresa",
		"755361a8-c4aa-429f-a89b-066d2fef5553": "Viaje Madrid 2024",
		"fa05e59f-0b8d-43cf-88a0-041af251e380": "Gastos del piso",
		"b002d887-3da7-441a-a646-0cf8ecbe035d": "Amigos",
	}} selectedGroup={selectedGroup} />
	<a href="/profile" class="flex items-center p-2 text-xl hover:bg-neth-400">
		<Icon src={User} solid class="h-8 w-8" />
		<span class="grow mx-2 text-center">Miguel Dorta</span>
		<img src={PP01} alt="Avatar" class="h-8 rounded">
	</a>
</Window>
