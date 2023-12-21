<script lang="ts">
  import { onMount } from 'svelte';
  import InputText from '$lib/components/input_text.svelte';
  import Link from '$lib/components/link.svelte';
	import { initAuth, loginUserPass } from '$lib/auth';
  import { isSecurePassword } from '$lib/verification/password';
  import STCLogo from "$lib/images/sharethecost-logo.svg";

  onMount(() => {
    initAuth();
  });

  let email = "";
  let pass = "";
  let validEmail = true;
  let validPass = true;

  function login() {
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
    loginUserPass(email, pass);
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
    invalidValueMsg="Must be more than 12 characters long and contain an uppercase letter, a lowercase letter, a number, and a symbol."
    checkFn={isSecurePassword}
    bind:isValid={validPass}
    bind:value={pass}/>
  <button on:click={login} type="button" class="block bg-neth font-bold mt-9 mx-auto py-2 rounded text-white uppercase w-full hover:bg-neth-light hover:shadow sm:w-1/3">
    Login
  </button>
  <p class="mt-10 text-center">
    <Link href="/register">Create an account</Link>
  </p>
</form>
