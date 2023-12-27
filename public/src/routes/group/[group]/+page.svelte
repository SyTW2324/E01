<script lang="ts">
	import { Icon, Plus, User } from "svelte-hero-icons"
	import PP01 from "$lib/images/profile-pics/01.webp"
</script>

<main class="bg-neth-xdark flex items-stretch justify-center min-h-screen w-full">
	<div class="w-full md:p-3 md:w-1/2 lg:w-1/3">
		<div class="bg-neth2-400 border border-neth2-500 flex flex-col h-full shadow text-white w-full md:rounded">
			<h2 class="mb-3 mt-2 text-center text-xl">Groups</h2>
			<div class="bg-white grow relative text-gray-800">
				<ul class="divide-gray-100 divide-y">
					<li class="px-6 py-4 hover:bg-neth2-50">
						<a href="/test" class="block">
							Comida de empresa
						</a>
					</li>
					<li class="px-6 py-4 hover:bg-neth2-50">
						<a href="/test" class="block">
							Viaje Madrid 2024
						</a>
					</li>
					<li class="px-6 py-4 hover:bg-neth2-50 bg-neth2-200">
						<a href="/test" class="block">
							Gastos del piso
						</a>
					</li>
					<li class="px-6 py-4 hover:bg-neth2-50">
						<a href="/test" class="block">
							Amigos
						</a>
					</li>
				</ul>
				<button class="absolute bg-neth2-400 bottom-4 h-12 p-1 right-4 rounded-full shadow text-white">
					<Icon src={Plus} />
				</button>
			</div>
			<a href="/profile" class="flex items-center p-2 text-xl hover:bg-neth-light">
				<Icon src={User} solid class="h-8 w-8" />
				<span class="grow mx-2 text-center">Miguel Dorta</span>
				<img src={PP01} alt="Avatar" class="h-8 rounded">
			</a>
		</div>
	</div>
</main>
  