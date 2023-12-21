<script lang="ts">
    export let href: string;
    let classValue = "font-bold text-neth hover:text-neth-light";
    export { classValue as class }
</script>

<a href="{href}" class="{classValue}">
    <slot />
</a>
