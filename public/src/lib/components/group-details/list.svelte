<script lang="ts">
	import Item from "$lib/components/group-details/item.svelte";
	import type { Transaction } from "$lib/db/transactions";
    export let trans: Transaction[];
    export let selectedTran: string;
</script>

<ul class="divide-gray-100 divide-y">
    {#each trans as tran}
        <Item href="/group/{tran.gid}/transaction/{tran.tid}" selected={tran.tid === selectedTran}>
            {tran.concept}
        </Item>
    {/each}
</ul>
