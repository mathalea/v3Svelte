<script lang="ts">
  import ItemListe from "./ItemListe.svelte"
  export let liste: string[]
  export let spacing: number
</script>

<ul class="list-decimal list-inside mt-2 ml-6 marker:text-orange-500 marker:font-bold">
  {#each liste as item}
    <!-- <li style={(spacing > 1) ? `line-height: ${spacing * 2};`: ''}><ItemListe textItem={item.replace(/\\dotfill/g, '..............................').replace(/\\not=/g, '≠').replace(/\\ldots/g, '....')} /></li> -->
    <li style="margin-bottom: {spacing}em; margin-top: {spacing}em"><ItemListe textItem={item.replace(/\\dotfill/g, '..............................').replace(/\\not=/g, '≠').replace(/\\ldots/g, '....')} /></li>
  {/each}
</ul>

<style></style>
