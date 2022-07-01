<script lang="ts">
  import { flip } from "svelte/animate"
  import Exercice from "./Exercice.svelte"
  import Header from "./Header.svelte"
  import NavBar from "./NavBar.svelte"
  import Footer from "./Footer.svelte"
  import { listeExercices } from "./store"
  import InputListeExercices from "./InputListeExercices.svelte"
  import Recherche from "./Recherche.svelte"
  import { Modals, closeModal } from "svelte-modals"

  const exercice1 = {
    directory: "6e",
    filename: "6C30-0",
    nbQuestions: 3,
  }
  const exercice2 = {
    directory: "6e",
    filename: "6C13",
    nbQuestions: 3,
  }
  const exercice3 = {
    directory: "6e",
    filename: "6N10",
    nbQuestions: 3,
  }

  const exercice4 = {
    directory: "5e",
    filename: "5L10",
    nbQuestions: 3,
  }
  const exercice5 = {
    directory: "6e",
    filename: "6C11",
    nbQuestions: 3,
  }
  const exercice6 = {
    directory: "6e",
    filename: "6N11",
    nbQuestions: 3,
  }

  const exercice7 = {
    directory: "exercicesStatiques",
    filename: "dnb/2021/tex/png/dnb_2021_06_ameriquenord_1",
    typeExercice: "dnb",
    nbQuestions: 1,
  }

  const exercice8 = {
    directory: "exercicesStatiques",
    filename: "e3c/2021/tex/png/e3c_2021_01_specimen1_1",
    typeExercice: "e3c",
    nbQuestions: 1,
  }

  const exercice9 = {
    directory: "exercicesStatiques",
    filename: "bac/2021/tex/png/bac_2021_01_sujet0_1",
    typeExercice: "bac",
    nbQuestions: 1,
  }

  listeExercices.set([exercice7, exercice8, exercice9, exercice1, exercice2, exercice3, exercice4, exercice5, exercice6])
  // listeExercices.set([exercice1]);
</script>

<!-- <Header /> -->
<NavBar />
<main class="flex-grow px-1 pt-2 md:p-10">
  <InputListeExercices />
  <Recherche />
  {#each $listeExercices as exercice, i (exercice)}
    <div animate:flip={{ duration: (d) => 30 * Math.sqrt(d) }}>
      <Exercice {...exercice} indiceExercice={i} indiceLastExercice={$listeExercices.length} />
    </div>
  {/each}
</main>
<Modals>
  <div slot="backdrop" class="backdrop" on:click={closeModal} />
</Modals>
<Footer />

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }
</style>
