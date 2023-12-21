<script lang="ts">
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export let checkFn = (_: string) => true;
  export let id: string;
  export let invalidValueMsg = "";
  export let isValid = false;
  export let label: string;
  export let placeholder: string;
  export let type = "text";
  export let value = "";

  function check() {
    isValid = checkFn(value);
  }
</script>

<div class="mb-4">
  <label class="block font-bold mb-2 text-sm" for="{id}">{label}</label>
  <input
    class="appearance-none border leading-tight mb-1 px-3 py-2 rounded shadow w-full focus:outline-none {isValid ? "focus:border-neth" : "border-red-500"}"
    id="{id}"
    {...{ type }}
    placeholder="{placeholder}"
    bind:value={value}
    on:input={check}>
  {#if !isValid}
    <p class="text-red-500 text-xs italic">{invalidValueMsg}</p>
  {/if}
</div>
