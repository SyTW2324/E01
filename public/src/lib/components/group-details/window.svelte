<script lang="ts">
    import List from "$lib/components/group-details/list.svelte";
    import Table from "$lib/components/group-details/table.svelte";
	  import Window from "$lib/components/window.svelte";
    import type { Transaction } from "$lib/db/transactions";
	import { calcSummary } from "$lib/money/summary";

    export let title: string;
    export let transactions: {[tid: string]: Transaction};
    export let selectedTran: string;
    export let groupMembers: {[uid: string]: string};
    export let renderPriority: number;
    const summary = Object.entries(calcSummary(transactions)).reduce((acc, val) => {
        const uid = val[0];
        const amount = val[1];
        const username = groupMembers[uid];
        acc[username] = amount;
        return acc;
    }, {} as {[username: string]: number})
</script>

<Window title={title} renderPriority={renderPriority}>
    <div class="h-full relative">
        <div class="absolute bg-white bottom-0 divide-gray-100 divide-y left-0 right-0 text-black top-0 overflow-y-auto">
            <Table summary={summary} />
            <List
                trans={Object.values(transactions).sort((t1, t2) => t2.date - t1.date)}
                selectedTran={selectedTran} />
        </div>
    </div>
</Window>
