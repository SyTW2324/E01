<script lang="ts">
	import Window from "$lib/components/window.svelte";
	
	export let renderPriority: number;
	let edit = false;
</script>

<Window title="Party Snacks" renderPriority={renderPriority}>
	<div class="bg-white h-full text-black px-4 py-2">
		<table class="table-auto text-left w-full">
			<tr>
				<th>Concept:</th>
				<td class="pl-2">
					<input
						class="bg-transparent border-b px-1 w-full focus:outline-none focus:border-neth {edit ? "border-b" : "border-white"}"
						id="transaction-concept"
						type="text"
						placeholder="Concept"
						disabled={!edit}>
				</td>
			</tr>
			<tr>
				<th>Categories:</th>
				<td class="pl-2">
					<input
						class="bg-transparent border-b px-1 w-full focus:outline-none focus:border-neth {edit ? "border-b" : "border-white"}"
						id="transaction-categories"
						type="text"
						placeholder="Groceries, Restaurants"
						disabled={!edit}>
				</td>
			</tr>
			<tr>
				<th>Date:</th>
				<td class="pl-2">
					<input
						class="bg-transparent border-b px-1 w-full focus:outline-none focus:border-neth {edit ? "border-b" : "border-white"}"
						id="transaction-date"
						type="datetime-local"
						disabled={!edit}>
				</td>
			</tr>
			<tr>
				<th>Amount:</th>
				<td class="pl-2">
					<input
						class="appearance-none bg-transparent border-b px-1 text-right w-full focus:outline-none focus:border-neth border-white"
						id="transaction-amount"
						type="number"
						placeholder="24.98"
						disabled>
				</td>
				<td>€</td>
			</tr>
			<tr>
				<th class="font-normal pl-4">Alejandro:</th>
				<td class="pl-2">
					<input
						class="appearance-none bg-transparent border-b px-1 text-right w-full focus:outline-none focus:border-neth {edit ? "border-b" : "border-white"}"
						id="transaction-amount-Alejandro"
						type="number"
						placeholder="24.98"
						disabled={!edit}>
				</td>
				<td>€</td>
			</tr>
			<tr>
				<th class="font-normal pl-4">Lucas:</th>
				<td class="pl-2">
					<input
						class="appearance-none bg-transparent border-b px-1 text-right w-full focus:outline-none focus:border-neth {edit ? "border-b" : "border-white"}"
						id="transaction-amount-Lucas"
						type="number"
						placeholder="24.98"
						disabled={!edit}>
				</td>
				<td>€</td>
			</tr>
			<tr>
				<th class="font-normal pl-4">Miguel:</th>
				<td class="pl-2">
					<input
						class="appearance-none bg-transparent border-b px-1 text-right w-full focus:outline-none focus:border-neth {edit ? "border-b" : "border-white"}"
						id="transaction-amount-Miguel"
						type="number"
						placeholder="24.98"
						disabled={!edit}>
				</td>
				<td>€</td>
			</tr>
			<tr>
				<th>Shares</th>
			</tr>
			<tr>
				<th class="font-normal pl-4">Alejandro:</th>
				<td class="pl-2">
					<input
						class="appearance-none bg-transparent border-b px-1 text-right w-full focus:outline-none focus:border-neth {edit ? "border-b" : "border-white"}"
						id="transaction-amount-Alejandro"
						type="number"
						placeholder="1"
						disabled={!edit}>
				</td>
			</tr>
			<tr>
				<th class="font-normal pl-4">Lucas:</th>
				<td class="pl-2">
					<input
						class="appearance-none bg-transparent border-b px-1 text-right w-full focus:outline-none focus:border-neth {edit ? "border-b" : "border-white"}"
						id="transaction-amount-Lucas"
						type="number"
						placeholder="1"
						disabled={!edit}>
				</td>
			</tr>
			<tr>
				<th class="font-normal pl-4">Miguel:</th>
				<td class="pl-2">
					<input
						class="appearance-none bg-transparent border-b px-1 text-right w-full focus:outline-none focus:border-neth {edit ? "border-b" : "border-white"}"
						id="transaction-amount-Miguel"
						type="number"
						placeholder="1"
						disabled={!edit}>
				</td>
			</tr>
		</table>
	</div>
</Window>
