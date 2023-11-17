<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import logo from '$lib/images/sharethecost.svg';
</script>

<svelte:head>
	<title>ShareTheCost</title>
	<meta name="description" content="Share your costs" />
</svelte:head>

<section>

	<div class="w-64 h-64 rounded-full bg-gray-400/[.2] flex items-center justify-center">
		<img class="w-48 h-48" src={logo} alt="ShareTheCost's Logo">
	</div>

	<div>
	<button class="flex items-center bg-teal-500/[.9] hover:bg-teal-700 text-white font-bold py-2 px-6 rounded mt-20">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="pr-1 w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
		</svg>
		<a href="/login" class="text-white">Log in</a>
		</button>
			
		<button class="flex items-center bg-teal-500/[.9] hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-5">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="pr-1 w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
			</svg>		
			<a href="/register" class="text-white">Register</a>
		</button>
	</div>
</section>

<style lang="postcss">
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
