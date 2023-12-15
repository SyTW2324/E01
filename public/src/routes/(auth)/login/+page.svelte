<script lang="ts">
  import { onMount } from 'svelte';
	import { initAuth, loginUserPass } from '$lib/auth';
  import { Icon, UserCircle } from "svelte-hero-icons";
  import STCLogo from "$lib/images/sharethecost-logo.svg";

  onMount(() => {
    initAuth();
  });

  let email = "";
  let pass = "";
  let validEmail = true;
  let validPass = true;

  function login() {
    if (!validEmail || !validPass || email === "" || pass === "") {
      checkEmail();
      checkPass();
      return;
    }
    loginUserPass(email, pass);
  }

  function checkEmail() {
    validEmail = !!email.match(/^[ -~]+@[ -~]+$/);
  }

  function checkPass() {
    validPass = !!pass.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[ -/:-@[-`{-~])[A-Za-z0-9 -/:-@[-`{-~]{12,}$/);
  }
</script>

<svelte:head>
	<title>Login | ShareTheCost</title>
	<meta name="description" content="Login to ShareTheCost" />
</svelte:head>


<img src="{STCLogo}" alt="ShareTheCost's Logo" class="block max-h-28 mx-auto my-4">
<h1 class="text-center text-3xl">Login</h1>
<form class="m-4">
  <div class="mb-4">
    <label class="block font-bold mb-2 text-sm" for="login-input-email">
      Email
    </label>
    <input
      class="appearance-none border leading-tight mb-1 px-3 py-2 rounded shadow w-full focus:outline-none {validEmail ? "focus:border-neth" : "border-red-500"}"
      id="login-input-email"
      type="email"
      placeholder="me@example.com"
      bind:value={email}
      on:input={checkEmail}>
    {#if !validEmail}
      <p class="text-red-500 text-xs italic">Invalid email.</p>
    {/if}
  </div>
  <div class="mb-9">
    <label class="block font-bold mb-2 text-sm" for="login-input-password">
      Password
    </label>
    <input
      class="appearance-none border leading-tight mb-1 px-3 py-2 rounded shadow w-full focus:outline-none {validPass ? "focus:border-neth" : "border-red-500"}"
      id="login-input-password"
      type="password"
      placeholder="****************"
      bind:value={pass}
      on:input={checkPass}>
    {#if !validPass}
      <p class="text-red-500 text-xs italic">Must be more than 12 characters long and contain an uppercase letter, a lowercase letter, a number, and a symbol.</p>
    {/if}
  </div>
  <button on:click={login} type="button" class="block bg-neth font-bold mx-auto py-2 rounded text-white uppercase w-full hover:bg-neth-light hover:shadow sm:w-1/3">
    Login
  </button>
  <p class="mt-10 text-center">
    <a href="/register" class="font-bold text-neth hover:text-neth-light">Create an account</a>
  </p>
</form>
