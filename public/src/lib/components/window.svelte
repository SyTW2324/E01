<script lang="ts">
    export let title: string;
	export let renderPriority: number;
	export let titleID: string;
	export let titleEdit = false;
	export let titlePlaceholder = "";
</script>

<div class="w-full md:p-3 md:w-1/2 lg:w-1/3 {renderPriority > 0 ? `hidden ${renderPriority < 2 ? "md:block" : "lg:block"}` : ""}">
	<div class="bg-neth border border-neth-600 flex flex-col h-full shadow text-white w-full md:rounded">
		<input
			class="bg-transparent border-b mb-3 mt-2 mx-6 placeholder-neth-250 text-center text-xl focus:outline-none {titleEdit ? "border-white" : "border-neth"}"
			id={`${titleID}-title`}
			type="text"
			placeholder={titlePlaceholder}
			disabled={!titleEdit}
			bind:value={title}>
		<slot />
	</div>
</div>
