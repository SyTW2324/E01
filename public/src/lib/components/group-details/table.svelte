<script lang="ts">
    export let summary: {[key: string]: number};
</script>

<div class="p-2">
    <h3 class="text-center text-xl">Summary</h3>
    <div class="p-2">
        <table class="table-auto w-full">
            <tbody>
                {#each Object.entries(summary).sort((a, b) => Intl.Collator().compare(a[0], b[0])) as [username, amount]}
                    <tr>
                        <td>{username}</td>
                        <td class="text-right {amount < 0 ? "text-red-500": ""}">
                            {(amount/100).toFixed(2)}€
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
