<script lang="ts">
    import GroupsWindow from "$lib/components/group/window.svelte";
    import DetailsWindow from "$lib/components/group-details/window.svelte";
    import TransactionWindow from "$lib/components/transaction/window.svelte";
	import type { Group } from "$lib/db/groups";
	import type { Transaction } from "$lib/db/transactions";

    /** @type {import('./$types').PageData} */
    export let data;
    let groupSelected = "";
    let transSelected = "";
    let groups = {} as {[gid: string]: Group};
    let transactions = {} as {[tid: string]: Transaction};
    let renderLevel = 0;

    function load(data) {
        groupSelected = data.path.group ? data.path.group : "";
        transSelected = data.path.transaction ? data.path.transaction : "";
        // TODO fix: groups = data.groups;
        groups = {
            "511a3c71-351f-4d18-87b5-7d057e860d87": {
                gid: "511a3c71-351f-4d18-87b5-7d057e860d87",
                name: "Chupipandi",
                members: {},
            }
        }

        transactions = data.transactions;
        renderLevel = data.path.transaction ? 2 : (data.path.group ? 1 : 0);
    }
    $: load(data);
</script>

<GroupsWindow
    groups={groups}
    selectedGroup={groupSelected}
    renderPriority={renderLevel} />

{#if groupSelected !== ""}
    <DetailsWindow
        title={groups[groupSelected].name}
        transactions={transactions}
        selectedTran={transSelected}
        renderPriority={renderLevel-1} />
    
    {#if transSelected !== ""}
        <TransactionWindow
            renderPriority={renderLevel-2} />
    {/if}
{/if}
