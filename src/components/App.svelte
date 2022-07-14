<script lang="ts">
  import { flip } from "svelte/animate"
  import Exercice from "./Exercice.svelte"
  import Header from "./Header.svelte"
  import NavBar from "./NavBar.svelte"
  import Footer from "./Footer.svelte"
  import TitrePage from "./TitrePage.svelte"
  import { listeExercices } from "./store"
  import InputListeExercices from "./InputListeExercices.svelte"
  import Recherche from "./Recherche.svelte"
  import NiveauListeExos from "./NiveauListeExos.svelte"
  import liste from "../dicos/listeIdsNoms.json"
  import referentiel from "../dicos/referentiel2022.json"
  // import { Modals, closeModal } from "svelte-modals"

  const exercice1 = {
    directory: "6e",
    filename: "6G10-3",
    nbQuestions: 2,
  }
  const exercice2 = {
    directory: "5e",
    filename: "5N13",
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
    filename: "dnb_2021_06_ameriquenord_1",
  }

  const exercice8 = {
    directory: "exercicesStatiques",
    filename: "e3c_2021_01_specimen1_1",
  }

  const exercice9 = {
    directory: "exercicesStatiques",
    filename: "bac_2021_01_sujet0_1",
  }

  const exercice10 = {
    directory: "exercicesStatiques",
    filename: "crpe_2019-g5-pb-1",
  }
  listeExercices.set([exercice1, exercice2, exercice3, exercice4, exercice5, exercice6, exercice7, exercice8, exercice9, exercice10])
  // listeExercices.set([exercice3])

  function toMap(obj: any): Map {
    let dico = new Map()
    for (let cle of Object.keys(obj)) {
      if (obj[cle] instanceof Object) {
        if (obj[cle] instanceof Array) {
          dico.set(cle, obj[cle])
        } else {
          dico.set(cle, toMap(obj[cle]))
        }
      } else {
        dico.set(cle, obj[cle])
      }
    }
    return dico
  }

  const dictionnaire = toMap(referentiel)

  function retrouverNomNiveau(idNiveau: string) {
    if (liste[idNiveau]) {
      return liste[idNiveau]
    } else {
      return idNiveau
    }
  }
</script>

<div class="h-screen">
  <!-- <Header /> -->
  <NavBar />
  <TitrePage />
  <main class="flex h-full">
    <!-- side menu -->
    <aside class="flex flex-col bg-gray-200 w-1/3 p-4 border-r-2 border-r-coopmaths-light overflow-hidden h-full">
      <div class="flex-none block overflow-y-scroll overscroll-auto h-full">
        <!-- <InputListeExercices /> -->
        <!-- <Recherche /> -->
        <h2 class="font-bold text-xl">Liste des exercices</h2>
        <ul>
          {#each Array.from(dictionnaire, ([cle, obj]) => ({ cle, obj })) as entree}
            <li>
              <NiveauListeExos compteurImbrication={1} chemin={[entree.cle]} nom={retrouverNomNiveau(entree.cle)} entrees={entree.obj} />
            </li>
          {/each}
        </ul>
      </div>
    </aside>
    <!-- content -->
    <div class="flex-1 flex flex-col p-6 overflow-hidden h-full">
      <div class="flex-1 overflow-y-scroll overscroll-auto">
        {#each $listeExercices as exercice, i (exercice)}
          <div animate:flip={{ duration: (d) => 30 * Math.sqrt(d) }}>
            <Exercice {...exercice} indiceExercice={i} indiceLastExercice={$listeExercices.length} />
          </div>
        {/each}
      </div>
    </div>
  </main>
  <!-- Modals ne sont pas utilisés pour le moment
  <Modals>
    <div slot="backdrop" class="backdrop" on:click={closeModal} />
  </Modals> -->
  <Footer />
</div>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  /* .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  } */
</style>
