<script lang="ts">
	import { Icon, Plus, User } from "svelte-hero-icons"
	import PP01 from "$lib/images/profile-pics/01.webp"
	import GroupListItem from "./group-list-item.svelte";
</script>

<main class="bg-ruster flex items-stretch justify-center min-h-screen w-full">
	<div class="w-full md:p-3 md:w-1/2 lg:w-1/3">
		<div class="bg-neth border border-neth-600 flex flex-col h-full shadow text-white w-full md:rounded">
			<h2 class="mb-3 mt-2 text-center text-xl">Groups</h2>
			<div class="bg-white grow relative text-gray-800">
				<ul class="divide-gray-100 divide-y">
					<GroupListItem href="/test">Comida de empresa</GroupListItem>
					<GroupListItem href="/test" selected>Viaje Madrid 2024</GroupListItem>
					<GroupListItem href="/test">Gastos del piso</GroupListItem>
					<GroupListItem href="/test">Amigos</GroupListItem>
				</ul>
				<button class="absolute bg-neth bottom-4 h-12 p-1 right-4 rounded-full shadow text-white hover:bg-neth-400">
					<Icon src={Plus} />
				</button>
			</div>
			<a href="/profile" class="flex items-center p-2 text-xl hover:bg-neth-400">
				<Icon src={User} solid class="h-8 w-8" />
				<span class="grow mx-2 text-center">Miguel Dorta</span>
				<img src={PP01} alt="Avatar" class="h-8 rounded">
			</a>
		</div>
	</div>
</main>
  