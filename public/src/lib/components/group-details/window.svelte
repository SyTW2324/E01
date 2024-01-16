<script lang="ts">
    import List from "$lib/components/group-details/list.svelte";
    import Table from "$lib/components/group-details/table.svelte";
	  import Window from "$lib/components/window.svelte";
    import type { Transaction } from "$lib/db/transactions";

    export let title: string;
    export let transactions: {[tid: string]: Transaction};
    export let selectedTran: string;
    export let renderPriority: number;
</script>

<Window title={title} renderPriority={renderPriority}>
    <div class="h-full relative">
        <div class="absolute bg-white bottom-0 divide-gray-100 divide-y left-0 right-0 text-black top-0 overflow-y-auto">
            <Table summary={{
                "Alejandro": 250,
                "Lucas": 250,
                "Miguel": -500
            }} />
            <List
                trans={Object.values(transactions).sort((t1, t2) => t2.date - t1.date)}
                selectedTran={selectedTran} />
        </div>
    </div>
</Window>
