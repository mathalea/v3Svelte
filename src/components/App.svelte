<Header />
<main class="flex-grow px-10">
  {#each $listeExercices as exercice, i (exercice)}
    <div animate:flip={{ duration: (d) => 30 * Math.sqrt(d) }}>
      <Exercice
        {...exercice}
        indiceExercice={i}
        indiceLastExercice={$listeExercices.length}
      />
    </div>
  {/each}
</main>
<Footer />

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
</style>

<script lang="ts">
  import { flip } from "svelte/animate";

  import Exercice from "./Exercice.svelte";
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  import { listeExercices } from "./store";

  const exercice1 = {
    directory: "6e",
    filename: "6C30-0",
    nbQuestions: 3,
  };
  const exercice2 = {
    directory: "6e",
    filename: "6C13",
    nbQuestions: 3,
  };
  const exercice3 = {
    directory: "6e",
    filename: "6N10",
    nbQuestions: 3,
  };

  const exercice4 = {
    directory: "5e",
    filename: "5L10",
    nbQuestions: 3,
  };
  const exercice5 = {
    directory: "6e",
    filename: "6C11",
    nbQuestions: 3,
  };
  const exercice6 = {
    directory: "6e",
    filename: "6N11",
    nbQuestions: 3,
  };

  listeExercices.set([
    exercice1,
    exercice2,
    exercice3,
    exercice4,
    exercice5,
    exercice6,
  ]);
</script>
