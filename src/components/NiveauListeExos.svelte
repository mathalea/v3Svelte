<script lang="ts">
  //   import File from "./File.svelte"
  import { slide } from "svelte/transition"

  export let expanded: boolean = false
  export let nom: string
  export let entrees: any

  function reveler() {
    expanded = !expanded
  }
</script>

<span on:click={reveler}>{nom}</span>
{#if expanded}
  <ul class="ml-2" transition:slide={{ duration: 300 }}>
    {#each Array.from(entrees, ([cle, obj]) => ({ cle, obj })) as entree}
      <li>
        <svelte:self nom={entree.cle} entrees={entree.obj} />
      </li>
    {/each}
  </ul>
{/if}
