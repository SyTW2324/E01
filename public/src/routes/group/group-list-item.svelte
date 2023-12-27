<script lang="ts">
    export let href: string;
    export let selected: boolean = false;
</script>

{#if selected}
    <li class="px-6 py-4 bg-neth-300">
        <slot />
    </li>
{:else}
    <li class="hover:bg-neth-100">
        <a href={href} class="block px-6 py-4">
            <slot />
        </a>
    </li>
{/if}
