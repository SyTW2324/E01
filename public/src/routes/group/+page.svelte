<script lang="ts">
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	(getContext("group") as Writable<string>).set("")
</script>
