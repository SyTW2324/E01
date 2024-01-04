<script>
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
