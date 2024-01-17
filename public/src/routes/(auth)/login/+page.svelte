<script lang="ts">
  import InputText from '$lib/components/input_text.svelte';
  import Link from '$lib/components/link.svelte';
	import { loginUserPass } from '$lib/auth';
  import STCLogo from "$lib/images/sharethecost-logo.svg";
	import { goto } from '$app/navigation';

  let email = "";
  let pass = "";
  let validEmail = true;
  let validPass = true;

  async function login() {
    let ok = true;
    if (!validEmail || email === "") {
      validEmail = false;
      ok = false;
    }
    if (!validPass || pass === "") {
      validPass = false;
      ok = false;
    }
    if (!ok) {
      return;
    }

    try {
      await loginUserPass(email, pass);
    } catch (err) {
      alert(err);
      return;
    }
    goto("/");
  }
</script>

<svelte:head>
	<title>Login | ShareTheCost</title>
	<meta name="description" content="Login to ShareTheCost" />
</svelte:head>


<img src="{STCLogo}" alt="ShareTheCost's Logo" class="block max-h-28 mx-auto my-4">
<h1 class="text-center text-3xl">Login</h1>
<form class="m-4">
  <InputText
    id="login-email"
    type="email"
    label="Email"
    placeholder="me@example.com"
    invalidValueMsg="Invalid email."
    checkFn={email => !!email.match(/^[ -~]+@[ -~]+$/)}
    bind:isValid={validEmail}
    bind:value={email}/>
  <InputText
    id="login-pass"
    type="password"
    label="Password"
    placeholder="****************"
    invalidValueMsg="Password cannot be empty."
    checkFn={pass => pass.length > 0}
    bind:isValid={validPass}
    bind:value={pass}/>
  <button on:click={login} type="button" class="block bg-neth font-bold mt-9 mx-auto py-2 rounded text-white uppercase w-full hover:bg-neth-400 hover:shadow sm:w-1/3">
    Login
  </button>
  <p class="mt-10 text-center">
    <Link href="/register">Create an account</Link>
  </p>
</form>
