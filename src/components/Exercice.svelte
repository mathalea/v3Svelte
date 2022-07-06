<script lang="ts">
  import { afterUpdate, onMount, tick } from "svelte"
  import { linear } from "svelte/easing"
  import { listeExercices } from "./store"
  import seedrandom from "seedrandom"
  import BoutonMonter from "./BoutonMonter.svelte"
  import BoutonDescendre from "./BoutonDescendre.svelte"
  import { Mathalea } from "../Mathalea"
  import type Exercice from "../exercices/ExerciceTs"
  import Settings from "./Settings.svelte"
  import { randomInt } from "mathjs"
  import Contenu from "./Contenu.svelte"
  import { loadMathLive } from "../modules/loaders"
  import { exerciceInteractif, prepareExerciceCliqueFigure } from "../interactif/interactif"

  export let directory: string
  export let filename: string
  export let nbQuestions = undefined
  export let indiceExercice: number
  export let indiceLastExercice: number

  let exercice: Exercice
  let divExercice: HTMLDivElement
  let divScore: HTMLDivElement
  let buttonScore: HTMLButtonElement
  let isVisible = true
  let isContenuVisible = true
  let isCorrectionVisible = true
  let isParametresVisible = false
  let isInteractif = false
  let titre: string
  let consigne: string
  let consigneCorrection: string
  let listeQuestions: string[] = []
  let listeCorrections: string[] = []
  let spacing: number
  let spacingCorr: number

  // transitions options
  // let transitionOptions = { duration: 300, easing: linear }

  afterUpdate(async () => {
    if (isInteractif) {
      loadMathLive()
      // Evènement indispensable pour pointCliquable par exemple
      const exercicesAffiches = new window.Event('exercicesAffiches', { bubbles: true })
      document.dispatchEvent(exercicesAffiches)
      if (exercice.interactifType === 'cliqueFigure') {
      prepareExerciceCliqueFigure(exercice)
    }
    // Ne pas être noté sur un exercice dont on a déjà vu la correction
    if (window.localStorage.getItem(`${exercice.id}|${exercice.seed}`)) {
      newData()
    } 
  }
  if (exercice) {
    await tick()
    Mathalea.renderDiv(divExercice)
  }
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
    isCorrectionVisible = !isCorrectionVisible
    isContenuVisible = !isContenuVisible

    if (isCorrectionVisible) {
      window.localStorage.setItem(`${exercice.id}|${exercice.seed}`, true)
    }
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
    exercice.interactif = isInteractif
    exercice.nouvelleVersion()
    titre = exercice.titre
    listeQuestions = [...exercice.listeQuestions]
    listeCorrections = [...exercice.listeCorrections]
    consigne = exercice.consigne + exercice.introduction
    consigneCorrection = exercice.consigneCorrection
    spacing = exercice.spacing
    spacingCorr = exercice.spacingCorr
  }

  onMount(async () => {
    exercice = await Mathalea.load(directory, filename)
    // Nombre de questions transmis par App.svelte
    if (nbQuestions) exercice.nbQuestions = nbQuestions
    exercice.numeroExercice = indiceExercice
    updateDisplay()
  })

  function switchInteractif() {
    isInteractif = !isInteractif
    exercice.interactif = isInteractif
    updateDisplay()
  }

  function verifExercice() {
    exerciceInteractif(exercice, divScore, buttonScore)
  }
</script>

<div bind:this={divExercice}>
  <h1 class="border-b border-gray-300 text-orange-600 pl-4 mt-4 pb-2 flex flex-col lg:flex-row lg:justify-between lg:items-center">
    <div class="flex flex-col lg:flex-row lg:justify-start lg:items-center" id="exercice{indiceExercice}">
      <div class="flex font-bold text-3xl md:text-lg">Exercice {indiceExercice + 1}</div>
      <div class="flex font-normal text-lg lg:text-normal"><span class="invisible lg:visible mx-1 font-bold">&middot;</span>{titre}</div>
    </div>
    <div class="flex justify-start text-normal mt-1 lg:justify-end lg:text-xl">
      <button type="button" on:click={switchInteractif}><i class="bx ml-2 {isInteractif ? 'bxs-mouse' : 'bx-mouse'} {!exercice?.interactifReady ? 'invisible' : ''}" /></button>
      <button type="button" on:click={() => (isVisible = !isVisible)}>
        <i class="bx ml-2 {isVisible ? 'bx-hide' : 'bx-show'}" />
      </button>
      <button type="button" on:click={() => (isParametresVisible = !isParametresVisible)}>
        <i class="bx ml-2 {isParametresVisible ? 'bxs-cog' : 'bx-cog'}" />
      </button>
      <button type="button" on:click={newData}><i class="bx bx-refresh ml-2 {exercice?.typeExercice === 'statique' ? 'invisible' : ''}" /></button>
      <button type="button" on:click={remove}><i class="bx bx-trash ml-2" /></button>
      <BoutonMonter indice={indiceExercice} />
      <BoutonDescendre indice={indiceExercice} {indiceLastExercice} />
      <button class="flew flex-row items-center w-32" type="button" on:click={transitionContenuCorrection}>
        <i class="bx ml-2 {isContenuVisible ? 'bxs-toggle-left' : 'bxs-toggle-right'}"> <span class="font-thin text-sm"> {isCorrectionVisible ? "Correction" : "Consigne"} </span> </i></button
      >
    </div>
  </h1>
  <div class="flex flex-col-reverse lg:flex-row space-x-4 items-start">
    <!-- {#if isParametresVisible}
      <div in:fly={{ ...transitionOptions, x: -400 }} out:fly={{ ...transitionOptions, x: -400 }} class="mt-3">
        <Settings {exercice} on:reglages={handleNewSettings} />
      </div>
    {/if} -->
    {#if isVisible}
      <div class="bg-gray-100 {isParametresVisible ? 'w-1/4' : 'w-0'} h-full duration-500">
        <div class="overflow-hidden">
          {#if isParametresVisible}
            <Settings {exercice} on:reglages={handleNewSettings} />
          {/if}
        </div>
      </div>
      <div id="exercice{indiceExercice}">
        {#if isContenuVisible}
          <Contenu chapeau={consigne} entrees={listeQuestions} {spacing} {indiceExercice} type={'enonce'} />
        {:else}
          <Contenu chapeau={consigneCorrection} entrees={listeCorrections} spacing={spacingCorr} {indiceExercice} type={'correction'} />
        {/if}
        {#if exercice?.interactif && !isCorrectionVisible && isContenuVisible}
          <button
            class="inline-block px-6 py-2.5 mr-10 my-5 ml-6 bg-coopmaths text-white font-medium text-xs leading-tight uppercase rounded shadow-md transform hover:scale-110 hover:bg-coopmaths-dark hover:shadow-lg focus:bg-coopmaths-dark focus:shadow-lg focus:outline-none focus:ring-0 active:bg-coopmaths-dark active:shadow-lg transition duration-150 ease-in-out checkReponses"
            type="submit"
            on:click={verifExercice}
            bind:this={buttonScore}>Vérifier les réponses</button
          >
          <div bind:this={divScore} />
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
</style>
