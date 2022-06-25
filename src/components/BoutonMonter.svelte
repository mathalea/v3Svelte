<button on:click={monter}> <i class="bx bx-up-arrow-circle ml-6" /> </button>

<script lang="ts">
  import { listeExercices } from "./store";

  export let indice: number;
  function monter() {
    listeExercices.update((l) => {
      return moveExercice(l, indice, indice - 1);
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
