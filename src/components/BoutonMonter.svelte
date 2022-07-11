<script lang="ts">
import { Mathalea } from '../Mathalea'

  import { listeExercices, moveExercice } from "./store"
  export let indice: number
  function monter() {
    listeExercices.update((l) => {
      return moveExercice(l, indice, indice - 1)
    })
    Mathalea.updateUrl($listeExercices)
  }
</script>

<button on:click={monter}> <i class="bx bx-up-arrow-circle ml-4 {indice > 0 ? '' : 'invisible'}" /> </button>
