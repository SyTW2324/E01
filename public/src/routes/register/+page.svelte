<script lang="ts">
  let name = "";
  let email = "";
  let pass1 = "";
  let pass2 = "";

  async function send(evt: Event) {
    evt.preventDefault();
    
    if (pass1 !== pass2) {
      alert("Passwords don't match");
    }

    const resp = await fetch("http://localhost:7480/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        image: 1,
        pass: pass1
      })
    })

    if (!resp.ok) {
      alert(resp.statusText);
      return;
    }

    alert((await resp.json()).message)
  }
</script>

<svelte:head>
	<title>Register | ShareTheCost</title>
	<meta name="description" content="Register yourself in ShareTheCost" />
</svelte:head>

<section>

	<div class="w-40 h-40 my-5 rounded-full border-4 border-teal-500 flex items-center justify-center">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3/4 h-3/4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
    </svg>    
	</div>
		
  <form>
      <div class="my-4">
        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name:</label>
        <input bind:value={name} type="text" id="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>
    
      <div class="my-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input bind:value={email} type="email" id="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>


      <div class="my-4">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Pass:</label>
        <input bind:value={pass1} type="password" id="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>

        <div class="my-4">
        <label for="password-confirmation" class="block text-gray-700 text-sm font-bold mb-2">Pass Confirm:</label>
        <input bind:value={pass2} type="password" id="password-confirmation" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>

      <div class="flex items-center justify-center">
        <button type="submit" on:click={send} class="flex items-center bg-teal-500/[.9] hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-5"> Submit </button>
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
