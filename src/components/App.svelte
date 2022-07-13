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
  // import { Modals, closeModal } from "svelte-modals"

  import { exosDispo } from "../dicos/exosDispo.json"
  function toMap(obj: any) {
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
  const donnees = JSON.parse(exosDispo)
  const dico = toMap(donnees)

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
</script>

<div class="h-screen">
  <!-- <Header /> -->
  <NavBar />
  <TitrePage />
  <main class="flex h-full">
    <!-- side menu -->
    <aside class="flex flex-col bg-gray-100 w-1/3 p-4 border-r-2 border-r-coopmaths-light overflow-hidden h-full">
      <div class="flex-none block">
        <!-- <InputListeExercices />
        <Recherche /> -->
        <h2 class="font-bold text-xl">Liste des exercices</h2>
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item border-t-0 border-l-0 border-r-0 rounded-none bg-white border border-gray-200">
            <h2 class="accordion-header mb-0" id="flush-headingOne">
              <button
                class="accordion-button relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                Accordion Item #1
              </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse border-0 collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body py-4 px-5">
                Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.
              </div>
            </div>
          </div>
          <div class="accordion-item border-l-0 border-r-0 rounded-none bg-white border border-gray-200">
            <h2 class="accordion-header mb-0" id="flush-headingTwo">
              <button
                class="accordion-button collapsed relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                Accordion Item #2
              </button>
            </h2>
            <div id="flush-collapseTwo" class="accordion-collapse border-0 collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body py-4 px-5">
                Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled
                with some actual content.
              </div>
            </div>
          </div>
          <div class="accordion-item border-l-0 border-r-0 border-b-0 rounded-none bg-white border border-gray-200">
            <h2 class="accordion-header mb-0" id="flush-headingThree">
              <button
                class="accordion-button collapsed relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree"
              >
                Accordion Item #3
              </button>
            </h2>
            <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body py-4 px-5">
                Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening
                here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.
              </div>
            </div>
          </div>
        </div>
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
