<script lang="ts">
	import { ContextKeys } from "$lib/shared";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	(getContext(ContextKeys.selectedGroupID) as Writable<string>).set("")
</script>
