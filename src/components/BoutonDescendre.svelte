<button on:click={descendre}>
  <i class="bx bx-down-arrow-circle ml-1" />
</button>

<script lang="ts">
  import { listeExercices } from "./store";

  export let indice: number;
  function descendre() {
    listeExercices.update((l) => {
      return moveExercice(l, indice, indice + 1);
    });
  }

  function moveExercice(
    liste: any[],
    iDepart: number,
    iArrivee: number
  ): any[] {
    liste.splice(iArrivee, 0, liste.splice(iDepart, 1)[0]);
    return liste;
  }
</script>
