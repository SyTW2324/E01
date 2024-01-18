<script lang="ts">
    import GroupsWindow from "$lib/components/group/window.svelte";
    import DetailsWindow from "$lib/components/group-details/window.svelte";
    import TransactionWindow from "$lib/components/transaction/window.svelte";
	import { getGroups, type Group } from "$lib/db/groups";
	import { getTransactions, type Transaction } from "$lib/db/transactions";

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
        groups = data.groups;
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
        group={groups[groupSelected]}
        transactions={transactions}
        selectedTran={transSelected}
        renderPriority={renderLevel-1}
        reloadGroupsFunc={async () => groups = await getGroups()}/>
    
    {#if transSelected !== ""}
        <TransactionWindow
            groupMembers={groups[groupSelected].members}
            transaction={transactions[transSelected]}
            renderPriority={renderLevel-2}
            updateTransactionsFunc={async () => transactions = await getTransactions(groupSelected)}/>
    {/if}
{/if}
