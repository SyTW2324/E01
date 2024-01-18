<script lang="ts">
  import InputText from '$lib/components/input_text.svelte';
  import Link from '$lib/components/link.svelte';
	import { loginUserPass, registerUserPass } from '$lib/auth';
  import { isSecurePassword } from '$lib/verification/password';
  import STCLogo from "$lib/images/sharethecost-logo.svg";
	import { goto } from '$app/navigation';

  let name = "";
  let email = "";
  let pass = "";
  let confirm = "";
  let validName = true;
  let validEmail = true;
  let validPass = true;
  let validConfirm = true;

  async function register() {
    let ok = true;
    if (!validName || name === "") {
      validName = false;
      ok = false;
    }
    if (!validEmail || email === "") {
      validEmail = false;
      ok = false;
    }
    if (!validPass || pass === "") {
      validPass = false;
      ok = false;
    }
    if (pass !== confirm) {
      validConfirm = false;
      ok = false;
    }
    if (!ok) {
      return;
    }

    try {
      await registerUserPass(email, Math.trunc(Math.random() * 16) + 1, name, pass);
    } catch (err) {
      alert(err);
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
	<title>Register | ShareTheCost</title>
	<meta name="description" content="Register a new account in ShareTheCost" />
</svelte:head>


<img src="{STCLogo}" alt="ShareTheCost's Logo" class="block max-h-28 mx-auto my-4">
<h1 class="text-center text-3xl">Register</h1>
<p class="mt-2 text-center">Already have an account? <Link href="login">Log in</Link></p>
<form class="m-4">
  <InputText
    id="register-name"
    label="Name"
    placeholder="John Doe"
    invalidValueMsg="Must be at least 1 character long."
    checkFn={name => name.trim().length > 0}
    bind:isValid={validName}
    bind:value={name}/>
  <InputText
    id="register-email"
    type="email"
    label="Email"
    placeholder="me@example.com"
    invalidValueMsg="Invalid email."
    checkFn={email => !!email.match(/^[ -~]+@[ -~]+$/)}
    bind:isValid={validEmail}
    bind:value={email}/>
  <InputText
    id="register-pass"
    type="password"
    label="Password"
    placeholder="****************"
    invalidValueMsg="Must be more than 12 characters long and contain an uppercase letter, a lowercase letter, a number, and a symbol."
    checkFn={isSecurePassword}
    bind:isValid={validPass}
    bind:value={pass}/>
  <InputText
    id="register-pass-confirm"
    type="password"
    label="Repeat password"
    placeholder="****************"
    invalidValueMsg="Must match the previous password."
    checkFn={passConfirm => pass === passConfirm}
    bind:isValid={validConfirm}
    bind:value={confirm}/>
  <button on:click={register} type="button" class="block bg-neth font-bold mt-9 mx-auto py-2 rounded text-white uppercase w-full hover:bg-neth-400 hover:shadow sm:w-1/3">
    Register
  </button>
</form>
