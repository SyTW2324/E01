<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/navbar.svelte';
</script>

<Navbar />

<main class="bg-neth-xdark min-h-screen w-full">
	<slot />
</main>
