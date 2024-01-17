<script lang="ts">
	import { Check, Icon, Pencil, Trash, XMark } from "svelte-hero-icons";
	import Window from "$lib/components/window.svelte";
	import { deleteTransactionOfGroup, type Transaction } from "$lib/db/transactions";
	import { goto } from "$app/navigation";
	
	export let groupMembers: {[uid: string]: string};
	export let transaction: Transaction;
	export let renderPriority: number;
	let sortedUIDs: string[];
	let categories: string;
	let concept: string;
	let dateTime: string;
	let amounts: {[uid: string]: string};
	let shares: {[uid: string]: string};
	let edit = false;

	function updateData(t: Transaction) {
		sortedUIDs = Object.entries(groupMembers).sort((a, b) => Intl.Collator().compare(a[1], b[1])).map(v => v[0]);
		categories = t.categories.join(", ");
		concept = t.concept;
		dateTime = new Date(t.date * 1000).toISOString().slice(0, 19);
		amounts = Object.entries(t.payments).reduce((acc, val) => {
			acc[val[0]] = (val[1] / 100).toFixed(2);
			return acc;
		}, {} as {[uid: string]: string});
		shares = Object.entries(t.debtShares).reduce((acc, val) => {
			acc[val[0]] = String(val[1]);
			return acc;
		}, {} as {[uid: string]: string});
	}
	$: updateData(transaction);

	function cancel() {
		edit = false;
		updateData(transaction);
	}

	async function remove() {
		await deleteTransactionOfGroup(transaction.gid, transaction.tid);
		goto(`/group/${transaction.gid}`)
	}

	function submit() {
		// TODO
		edit = false;
	}
</script>

<Window bind:title={concept} titleEdit={edit} titlePlaceholder="Concept" titleID="transaction" renderPriority={renderPriority}>
	<div class="bg-white h-full text-black px-4 py-2">
		<table class="table-auto text-left w-full">
			<tr>
				<th>Categories:</th>
				<td class="pl-2">
					<input
						class="bg-transparent border-b px-1 w-full focus:outline-none focus:border-neth {edit ? "border-b" : "border-white"}"
						id="transaction-categories"
						type="text"
						placeholder="Groceries, Restaurants"
						disabled={!edit}
						bind:value={categories}>
				</td>
			</tr>
			<tr>
				<th>Date:</th>
				<td class="pl-2">
					<input
						class="bg-transparent border-b px-1 w-full focus:outline-none focus:border-neth {edit ? "border-b" : "border-white"}"
						id="transaction-date"
						type="datetime-local"
						disabled={!edit}
						bind:value={dateTime}>
				</td>
			</tr>
			<tr>
				<th>Amount</th>
			</tr>
			{#each sortedUIDs as uid}
				<tr>
					<th class="font-normal pl-4">{groupMembers[uid]}:</th>
					<td class="pl-2">
						<input
							class="appearance-none bg-transparent border-b px-1 text-right w-full focus:outline-none focus:border-neth {edit ? "border-b" : "border-white"}"
							id={`transaction-amount-${groupMembers[uid]}`}
							type="number"
							step="0.01"
							placeholder="24.98"
							disabled={!edit}
							bind:value={amounts[uid]}>
					</td>
					<td>€</td>
				</tr>
			{/each}
			<tr>
				<th>Shares</th>
			</tr>
			{#each sortedUIDs as uid}
				<tr>
					<th class="font-normal pl-4">{groupMembers[uid]}:</th>
					<td class="pl-2">
						<input
							class="appearance-none bg-transparent border-b px-1 text-right w-full focus:outline-none focus:border-neth {edit ? "border-b" : "border-white"}"
							id={`transaction-amount-${groupMembers[uid]}`}
							type="number"
							placeholder="1"
							disabled={!edit}
							bind:value={shares[uid]}>
					</td>
				</tr>
			{/each}
		</table>
		<p class="mt-8 text-center">
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
</Window>
