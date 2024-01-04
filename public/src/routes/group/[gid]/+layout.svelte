<script lang="ts">
	import { getContext, setContext } from "svelte";
	import { writable, type Writable } from "svelte/store";
    import DetailsWindow from "$lib/components/group-details/window.svelte";
	import type { Group } from "$lib/db/groups";
	import { ContextKeys } from "$lib/shared";

    /** @type {import('./$types').PageData} */
    export let data;
    let group: Group;
    let tid = writable("");
    setContext(ContextKeys.selectedTransactionID, tid);

    function load(data) {
        (getContext(ContextKeys.selectedGroupID) as Writable<string>).set(data.gid);
        (getContext(ContextKeys.listGroups) as Writable<Group[]>).subscribe(groups => {
            group = groups.find(group => group.gid === data.gid)!;
        });
    }
    $: load(data);
</script>

<DetailsWindow title={group.name} />
<slot />
