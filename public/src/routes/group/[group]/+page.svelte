<script lang="ts">
    import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	(getContext("transaction") as Writable<string>).set("")
</script>
