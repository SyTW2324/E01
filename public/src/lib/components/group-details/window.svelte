<script lang="ts">
    import { Check, Icon, Pencil, Plus, Trash, XMark } from "svelte-hero-icons";
    import List from "$lib/components/group-details/list.svelte";
    import Table from "$lib/components/group-details/table.svelte";
    import Window from "$lib/components/window.svelte";
    import { createTransaction, type Transaction } from "$lib/db/transactions";
	import { calcSummary } from "$lib/money/summary";
	import { deleteGroup, updateGroup, type Group } from "$lib/db/groups";
	import { goto } from "$app/navigation";

    export let group: Group;
    export let transactions: {[tid: string]: Transaction};
    export let selectedTran: string;
    export let renderPriority: number;
    export let reloadGroupsFunc: () => void;
    let title: string;
    let edit = false;
    let summary: {[username: string]: number};

    function loadTransactionData(t: {[tid: string]: Transaction}) {
        summary = Object.entries(calcSummary(t)).reduce((acc, val) => {
            const uid = val[0];
            const amount = val[1];
            const username = group.members[uid];
            acc[username] = amount;
            return acc;
        }, {} as {[username: string]: number})
    }
    $: loadTransactionData(transactions);

    function loadGroupData(g: Group) {
        title = g.name;
        edit = false;
    }
    $: loadGroupData(group);

    async function remove() {
        await deleteGroup(group.gid);
        goto("/");
    }

    function cancel() {
        title = group.name;
        edit = false;
    }

    async function submit() {
        await updateGroup({
            gid: group.gid,
            name: title,
            members: group.members
        });
        reloadGroupsFunc();
        edit = false;
    }

    async function newTransaction() {
        const tid = (await createTransaction(group)).tid;
        goto(`/group/${group.gid}/transaction/${tid}`);
    }
</script>

<Window bind:title={title} titleID="group-details" titleEdit={edit} titlePlaceholder="Group name" renderPriority={renderPriority}>
    <div class="h-full relative">
        <div class="absolute bg-white bottom-0 divide-gray-100 divide-y left-0 right-0 text-black top-0 overflow-y-auto">
            <div>
                <Table summary={summary} />
                <p class="mb-4 mt-2 text-center">
                    {#if !edit}
                        <button class="bg-red-600 h-10 mx-2 p-2 rounded-full shadow text-white hover:bg-red-400" on:click={remove}>
                            <Icon src={Trash} solid />
                        </button>
                        <button class="bg-neth h-10 mx-2 p-2 rounded-full shadow text-white hover:bg-neth-400" on:click={() => edit = true}>
                            <Icon src={Pencil} solid />
                        </button>
                    {:else}
                        <button class="bg-neth h-10 mx-2 p-2 rounded-full shadow text-white hover:bg-neth-400" on:click={cancel}>
                            <Icon src={XMark} solid />
                        </button>
                        <button class="bg-neth h-10 mx-2 p-2 rounded-full shadow text-white hover:bg-neth-400" on:click={submit}>
                            <Icon src={Check} solid />
                        </button>
                    {/if}
                </p>
            </div>
            <List
                trans={Object.values(transactions).sort((t1, t2) => t2.date - t1.date)}
                selectedTran={selectedTran} />
        </div>
        <button class="absolute bg-neth bottom-4 h-12 p-1 right-4 rounded-full shadow text-white hover:bg-neth-400" on:click={newTransaction}>
            <Icon src={Plus} />
        </button>
    </div>
</Window>
