<script lang="ts">
  import { tick } from "svelte";
  import { flip } from "svelte/animate";
  import { Mathalea } from "../Mathalea";

  import Exercice from "./Exercice.svelte";
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  import { listeExercices } from "./store";

  const exercice1 = {
    directory: "6e",
    filename: "6M10",
    nbQuestions: 3,
  };
  const exercice2 = {
    directory: "6e",
    filename: "6C11",
    nbQuestions: 3,
  };
  const exercice3 = {
    directory: "6e",
    filename: "6N10",
    nbQuestions: 3,
  };

  let mesExercices;

  listeExercices.subscribe(async (liste) => {
    mesExercices = liste;
    await tick();
    Mathalea.renderDiv(document.querySelector("#app"));
  });

  listeExercices.set([exercice1, exercice2, exercice3]);
</script>

<Header />
<main>
  {#each mesExercices as exercice, i (exercice)}
    <div animate:flip={{ duration: (d) => 30 * Math.sqrt(d) }}>
      <Exercice
        {...exercice}
        indiceExercice={i}
        indiceLastExercice={mesExercices.length}
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