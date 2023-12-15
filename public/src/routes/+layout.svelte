<script lang="ts">
	import '../app.scss';
	import Navbar from '$lib/components/navbar.svelte';
</script>

<Navbar />

<main class="bg-gray-700 min-h-screen w-full">
	<slot />
</main>
