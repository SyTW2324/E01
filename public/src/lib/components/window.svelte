<script lang="ts">
    export let title: string;
	export let renderPriority: number;
</script>

<div class="w-full md:p-3 md:w-1/2 lg:w-1/3 {renderPriority > 0 ? `hidden ${renderPriority < 2 ? "md" : "lg"}:block` : ""}">
	<div class="bg-neth border border-neth-600 flex flex-col h-full shadow text-white w-full md:rounded">
		<h2 class="mb-3 mt-2 text-center text-xl">{title}</h2>
		<slot />
	</div>
</div>
