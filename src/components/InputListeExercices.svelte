<script lang="ts">
  import Chips from "./Chips.svelte"

  import { listeExercices } from "./store"

  let input: HTMLInputElement
  let listeId = []

  $: {
    listeId = []
    for (const ex of $listeExercices) {
      listeId.push(ex.filename)
    }
    listeId = listeId
  }

  function handleChange() {
    let newId = input.value
    const newExercice = {
      directory: newId[0] + "e",
      filename: newId,
    }
    listeExercices.update((l) => [...l, newExercice])
    input.value = ""
  }
</script>

<input type="text" class="inline-flex border w-20 p-0 m-0 text-sm" placeholder="Code exo" bind:this={input} on:change={handleChange} />
<div class="inline-flex space-x-2">
  {#each listeId as id, indice (indice)}
    <Chips text={id} {indice} />
  {/each}
</div>
