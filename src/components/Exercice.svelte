<script lang="ts">
  import { afterUpdate, onMount, tick } from "svelte"
  import { fade } from "svelte/transition"
  import { listeExercices } from "./store"
  import seedrandom from "seedrandom"
  import BoutonMonter from "./BoutonMonter.svelte"
  import BoutonDescendre from "./BoutonDescendre.svelte"
  import { Mathalea } from "../Mathalea"
  import type Exercice from "../exercices/ExerciceTs"
  import Settings from "./Settings.svelte"
  import { randomInt } from "mathjs"
  import Contenu from "./Contenu.svelte"
  import { exerciceInteractif } from "../modulesv2/gestionInteractif"

  export let directory: string
  export let filename: string
  export let nbQuestions = undefined
  export let indiceExercice: number
  export let indiceLastExercice: number

  let exercice: Exercice
  let divExercice: HTMLDivElement
  let visible = true
  let contenuVisible = true
  let correctionVisible = true
  let parametresVisible = false
  let interactif = false
  let titre: string
  let consigne: string
  let consigneCorrection: string
  let listeQuestions: string[] = []
  let listeCorrections: string[] = []

  afterUpdate(() => {
    Mathalea.renderDiv(divExercice)
    if (interactif) exerciceInteractif(exercice)
  })

  function handleNewSettings(event: CustomEvent) {
    if (event.detail.nbQuestions) exercice.nbQuestions = event.detail.nbQuestions
    if (event.detail.sup !== undefined) exercice.sup = event.detail.sup
    if (event.detail.sup2 !== undefined) exercice.sup2 = event.detail.sup2
    if (event.detail.sup3 !== undefined) exercice.sup3 = event.detail.sup3
    if (event.detail.sup4 !== undefined) exercice.sup4 = event.detail.sup4
    updateDisplay()
  }

  async function transitionContenuCorrection() {
    correctionVisible = !correctionVisible
    contenuVisible = !contenuVisible
  }

  async function newData() {
    const seed = (Math.random() * 1000).toString()
    exercice.seed = seed
    updateDisplay()
  }

  function toggle(flag: boolean) {
    flag !== flag
  }

  function remove() {
    listeExercices.update((l) => [...l.slice(0, indiceExercice), ...l.slice(indiceExercice + 1)])
  }

  function updateDisplay() {
    if (exercice.seed === undefined) exercice.seed = randomInt(1, 9999).toString()
    seedrandom(exercice.seed, { global: true })
    exercice.interactif = interactif
    exercice.nouvelleVersion()
    titre = exercice.titre
    listeQuestions = [...exercice.listeQuestions]
    listeCorrections = [...exercice.listeCorrections]
    consigne = exercice.consigne
    consigneCorrection = exercice.consigneCorrection
  }

  onMount(async () => {
    exercice = await Mathalea.load(directory, filename)
    // Nombre de questions transmis par App.svelte
    if (nbQuestions) exercice.nbQuestions = nbQuestions
    exercice.numeroExercice = indiceExercice
    updateDisplay()
  })

  function switchInteractif() {
    interactif = !interactif
    exercice.interactif = interactif
    updateDisplay()
  }
</script>

<div bind:this={divExercice}>
  <h1 class="border-b border-gray-300 text-orange-600 pl-4 mt-4 pb-2 flex flex-col lg:flex-row lg:justify-between lg:items-center">
    <div class="flex flex-col lg:flex-row lg:justify-start lg:items-center" id="exercice{indiceExercice}">
      <div class="flex font-bold text-3xl md:text-lg">Exercice {indiceExercice + 1}</div>
      <div class="flex font-normal text-lg lg:text-normal"><span class="invisible lg:visible mx-1 font-bold">&middot;</span>{titre}</div>
    </div>
    <div class="flex justify-start text-normal mt-1 lg:justify-end lg:text-xl">
      <button type="button" on:click={switchInteractif}><i class="bx ml-2 {interactif ? 'bxs-mouse' : 'bx-mouse'} {!exercice?.interactifReady ? 'invisible' : ''}" /></button>
      <button type="button" on:click={() => (visible = !visible)}>
        <i class="bx ml-2 {visible ? 'bx-hide' : 'bx-show'}" />
      </button>
      <button type="button" on:click={() => (parametresVisible = !parametresVisible)}>
        <i class="bx ml-2 {parametresVisible ? 'bxs-cog' : 'bx-cog'}" />
      </button>
      <button type="button" on:click={newData}><i class="bx bx-refresh ml-2 {(exercice?.typeExercice === 'statique') ? 'invisible' :''}" /></button>
      <button type="button" on:click={remove}><i class="bx bx-trash ml-2" /></button>
      <BoutonMonter indice={indiceExercice} />
      <BoutonDescendre indice={indiceExercice} {indiceLastExercice} />
      <button class="flew flex-row items-center w-32" type="button" on:click={transitionContenuCorrection}>
        <i class="bx ml-2 {contenuVisible ? 'bxs-toggle-left' : 'bxs-toggle-right'}"> <span class="font-thin text-sm"> {correctionVisible ? "Correction" : "Consigne"} </span> </i></button
      >
    </div>
  </h1>
  {#if visible}
    <div id="exercice{indiceExercice}">
      {#if contenuVisible}
        <Contenu chapeau={consigne} entrees={listeQuestions} />
      {:else}
        <Contenu chapeau={consigneCorrection} entrees={listeCorrections} />
      {/if}
    </div>
  {/if}

  {#if parametresVisible}
    <div transition:fade class="mt-3">
      <Settings {exercice} on:reglages={handleNewSettings} />
    </div>
  {/if}
</div>

<style>
</style>
