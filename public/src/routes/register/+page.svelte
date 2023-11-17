<script>
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import logo from '$lib/images/sharethecost.svg';
</script>

<svelte:head>
	<title>ShareTheCost</title>
	<meta name="description" content="Share your costs" />
</svelte:head>

<section>

	<div class="w-40 h-40 my-5 rounded-full border-4 border-teal-500 flex items-center justify-center">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3/4 h-3/4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
    </svg>    
	</div>
		
  <form action="" method="post">
      <div class="my-4">
        <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Name:</label>
        <input type="text" id="username" name="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>  
    
      <div class="my-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input type="email" id="email" name="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>


      <div class="my-4">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Pass:</label>
        <input type="password" id="password" name="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>

        <div class="my-4">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Pass Confirm:</label>
        <input type="password" id="password" name="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>

      <div class="flex items-center justify-center">
        <button class="flex items-center bg-teal-500/[.9] hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-5"> Submit </button>
      </div>
  </form>
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
