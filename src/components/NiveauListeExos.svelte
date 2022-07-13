<script lang="ts">
  import { string } from "mathjs"

  import { slide } from "svelte/transition"
  import EntreeListeExos from "./EntreeListeExos.svelte"

  export let expanded: boolean = false
  export let nom: string
  export let entrees: any
  export let chemin: string[]

  function reveler() {
    expanded = !expanded
  }
</script>

<span class="text-coopmaths text-base font-bold" on:click={reveler}>{nom}</span>
{#if expanded}
  <ul class="ml-2" transition:slide={{ duration: 300 }}>
    {#each Array.from(entrees, ([cle, obj]) => ({ cle, obj })) as entree}
      <li>
        {#if typeof entree.obj === "string"}
          <EntreeListeExos {chemin} exo={{ id: entree.obj, code: entree.cle }} />
        {:else}
          <svelte:self chemin={[...chemin, entree.cle]} nom={entree.cle} entrees={entree.obj} />
        {/if}
      </li>
    {/each}
  </ul>
{/if}
