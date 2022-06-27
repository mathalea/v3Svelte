<script lang="ts">
  import { listeExercices, moveExercice } from "./store"
  export let indice: number
  export let indiceLastExercice: number
  function descendre() {
    listeExercices.update((l) => {
      return moveExercice(l, indice, indice + 1)
    })
  }
</script>

<button on:click={descendre}><i class="bx bx-down-arrow-circle ml-1 {indice < indiceLastExercice - 1 ? '' : 'invisible'}" /></button>
