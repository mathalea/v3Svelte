<script lang="ts">
  import { listeExercices, moveExercice } from "./store"

  export let indice: number;
  function monter() {
    listeExercices.update((l) => {
      return moveExercice(l, indice, indice - 1);
    });
  }
</script>

<button on:click={monter}> <i class="bx bx-up-arrow-circle ml-6 {(indice > 0) ? '' : 'invisible'}" /> </button>