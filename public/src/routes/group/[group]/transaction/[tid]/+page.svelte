<script lang="ts">
  import Window from "$lib/components/window.svelte";
  import { getTransactions } from "$lib/db/transactions";

  export const date = new Date(1704381055 * 1000);
</script>

<Window title="Party Snacks">
  <div class="h-full bg-white text-black p-4">
    <h2 class="font-bold text-lg mb-4">Categories: Viaje, Comida</h2>

    <strong class="block mb-2">Amount: 500€ (Sumar los payments)</strong>
    <strong class="block mb-2">Date: {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</strong>

    <strong class="block mb-2">DebtShares:</strong>
    <ul class="list-disc pl-6 mb-4">
      <li>Alejandro: 250€</li>
      <li>Lucas: 250€</li>
    </ul>

    <strong class="block mb-2">Payments:</strong>
    <ul class="list-disc pl-6">
      <li>Miguel: 500€</li>
    </ul>
  </div>
</Window>
