<button on:click={ descendre }><i class="bx bx-down-arrow-circle ml-1" /></button>

<script lang="ts">
  import { listeExercices, moveExercice } from "./store";

  export let indice: number;
  function descendre() {
    listeExercices.update((l) => {
      return moveExercice(l, indice, indice + 1);
    })
  }
</script>
