<script lang="ts">
  import ItemListe from "./ItemListe.svelte"
  export let liste: string[]
</script>

<ul class="list-decimal list-inside mt-2 ml-6 marker:text-orange-500 marker:font-bold">
  {#each liste as item}
    <li><ItemListe textItem={item} /></li>
  {/each}
</ul>

<style></style>
