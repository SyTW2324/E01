<script lang="ts">
  let email = "";
  let pass = "";

  async function send(evt: Event) {
    evt.preventDefault();

    const resp = await fetch("http://localhost:7480/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, pass })
    })

    if (!resp.ok) {
      alert(resp.statusText);
      return;
    }

    alert((await resp.json()).message)
  }
</script>

<svelte:head>
	<title>Login | ShareTheCost</title>
	<meta name="description" content="Login to ShareTheCost" />
</svelte:head>

<section>
	<div class="w-40 h-40 my-5 rounded-full border-4 border-teal-500 flex items-center justify-center">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3/4 h-3/4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>    
	</div>
		
  <form action="" method="post">    
      <div class="my-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input bind:value={email} type="email" id="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>


      <div class="my-4">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password:</label>
        <input bind:value={pass} type="password" id="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>

      <div class="flex items-center justify-center">
        <button on:click={send} class="flex items-center bg-teal-500/[.9] hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-5"> Log in </button>
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
