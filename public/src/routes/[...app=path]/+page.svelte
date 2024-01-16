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
                members: {
                    "f4b8a9f7-5332-4356-87ad-74a28489f197": "Alejandro",
                    "c58aca3e-4955-418e-a4f3-a1a49a54074d": "Lucas",
                    "d2dd55b0-5116-4dfc-93e4-ea18344dad0b": "Miguel"
                },
            }
        }
        // TODO fix: transactions = data.transactions;
        transactions = {
            "8c94b879-17ea-4a84-9ffc-e99ecf06952e": {
                categories: ["Groceries", "Restaurants"],
                concept: "Almuerzo arepera",
                date: 1705431692,
                debtShares: {
                    "f4b8a9f7-5332-4356-87ad-74a28489f197": 0,
                    "c58aca3e-4955-418e-a4f3-a1a49a54074d": 0,
                    "d2dd55b0-5116-4dfc-93e4-ea18344dad0b": 1
                },
                gid: "511a3c71-351f-4d18-87b5-7d057e860d87",
                payments: {
                    "f4b8a9f7-5332-4356-87ad-74a28489f197": 350,
                    "c58aca3e-4955-418e-a4f3-a1a49a54074d": 248,
                    "d2dd55b0-5116-4dfc-93e4-ea18344dad0b": 0
                },
                tid: "8c94b879-17ea-4a84-9ffc-e99ecf06952e"
            }
        }
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
            groupMembers={groups[groupSelected].members}
            transaction={transactions[transSelected]}
            renderPriority={renderLevel-2} />
    {/if}
{/if}
