<script lang="ts">
  import { flip } from "svelte/animate"

  import Exercice from "./Exercice.svelte"
  import Header from "./Header.svelte"
  import Footer from "./Footer.svelte"
  import { listeExercices } from "./store"
  import InputListeExercices from "./InputListeExercices.svelte"

  // const exercice1 = {
  //   directory: "6e",
  //   filename: "6C30-0",
  //   nbQuestions: 3,
  // }
  // const exercice2 = {
  //   directory: "6e",
  //   filename: "6C13",
  //   nbQuestions: 3,
  // }
  // const exercice3 = {
  //   directory: "6e",
  //   filename: "6N10",
  //   nbQuestions: 3,
  // }

  // listeExercices.set([exercice1, exercice2, exercice3])
</script>

<Header />
<main class="flex-grow px-10 mt-10">
  <InputListeExercices/>
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
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif
  }
</style>