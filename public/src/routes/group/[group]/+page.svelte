<script lang="ts">
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

    /** @type {import('./$types').PageData} */
    export let data;

    function load(data) {
        (getContext("group") as Writable<string>).set(data.group);
    }

    $: load(data);
</script>
