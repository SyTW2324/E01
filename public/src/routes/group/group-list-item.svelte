<script lang="ts">
    export let href: string;
    export let selected: boolean = false;
</script>

<li class="px-6 py-4 {selected ? "bg-neth-300" : "hover:bg-neth-100"}">
    {#if selected}
        <slot />
    {:else}
        <a href={href} class="block">
            <slot />
        </a>
    {/if}
</li>
