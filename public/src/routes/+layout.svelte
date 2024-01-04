<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { initAuth } from '$lib/auth';
	
	onMount(() => {
    initAuth();
  });
	
</script>

<main class="bg-neth-xdark flex items-center justify-center min-h-screen w-full">
	<slot />
</main>
