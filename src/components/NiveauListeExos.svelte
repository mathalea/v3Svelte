<script lang="ts">
  import { string } from "mathjs"

  import { slide } from "svelte/transition"
  import EntreeListeExos from "./EntreeListeExos.svelte"

  export let expanded: boolean = false
  export let nom: string
  export let entrees: any
  export let chemin: string[]
  export let compteurImbrication: number

  function reveler() {
    expanded = !expanded
  }
</script>

<div
  class="flex flex-row items-center justify-between  bg-gray-200 font-bold text-coopmaths  hover:bg-gray-100 hover:text-coopmaths-light cursor-pointer pl-{compteurImbrication * 2}"
  on:click={reveler}
>
  <div class="text-base ">{nom}</div>
  <i class=" text-xl bx {expanded ? 'bx-plus rotate-[225deg]' : 'bx-plus'} transition-transform duration-500 ease-in-out" />
</div>
{#if expanded}
  <ul transition:slide={{ duration: 500 }}>
    {#each Array.from(entrees, ([cle, obj]) => ({ cle, obj })) as entree}
      <li>
        {#if typeof entree.obj === "string"}
          <EntreeListeExos compteurImbrication={compteurImbrication + 1} {chemin} exo={{ id: entree.obj, code: entree.cle }} />
        {:else}
          <svelte:self compteurImbrication={compteurImbrication + 1} chemin={[...chemin, entree.cle]} nom={entree.cle} entrees={entree.obj} />
        {/if}
      </li>
    {/each}
  </ul>
{/if}
