<script lang="ts">
	import { getContext, setContext } from "svelte";
	import { writable, type Writable } from "svelte/store";
    import DetailsWindow from "$lib/components/group-details/window.svelte";
	import type { Group } from "$lib/db/groups";

    /** @type {import('./$types').PageData} */
    export let data;
    let group: Group = {name: "Pepe"} as Group;
    let selectedTran = writable("");
    setContext("transaction", selectedTran);

    function load(data) {
        (getContext("group") as Writable<string>).set(data.group);
        (getContext("groups") as Writable<Group[]>).subscribe(groups => {
            group = groups.find(group => group.gid === data.group)!;
        });
    }
    $: load(data);
</script>

<DetailsWindow title={group.name} />
<slot />
