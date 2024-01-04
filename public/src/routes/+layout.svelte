<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { initAuth } from '$lib/auth';
	
	onMount(() => {
		initAuth();
	});
	
</script>

<slot />
