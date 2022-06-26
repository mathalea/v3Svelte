<script lang="ts">
  import { afterUpdate, onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import seedrandom from 'seedrandom'
  import { Mathalea } from '../Mathalea'
  import type Exercice from '../exercices/ExerciceTs'
  import { listeExercices } from './store'
  import { randomInt } from 'mathjs'
  import BoutonMonter from './BoutonMonter.svelte'
  import BoutonDescendre from './BoutonDescendre.svelte'
  import Settings from './Settings.svelte'

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
  let contenu: string = ''
  let correction: string = ''



  afterUpdate(() => {
    Mathalea.renderDiv(divExercice)
  })

  function handleNewSettings(event: CustomEvent) {
    if (event.detail.nbQuestions) exercice.nbQuestions = (event.detail.nbQuestions)
    if (event.detail.sup !== undefined) exercice.sup = (event.detail.sup)
    if (event.detail.sup2 !== undefined) exercice.sup2 = (event.detail.sup2)
    if (event.detail.sup3 !== undefined) exercice.sup3 = (event.detail.sup3)
    if (event.detail.sup4 !== undefined) exercice.sup4 = (event.detail.sup4)
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

  function remove() {
        listeExercices.update( l => [...l.slice(0, indiceExercice), ...l.slice(indiceExercice + 1)])
  }

  function updateDisplay() {
    if (exercice.seed === undefined) exercice.seed = randomInt(1, 9999).toString()
    seedrandom(exercice.seed, { global: true })
    exercice.interactif = interactif
    exercice.nouvelleVersion()
    contenu = exercice.contenu
    correction = exercice.contenuCorrection
  }


  onMount(async () => {
    exercice = await Mathalea.load(directory, filename)
    // Nombre de questions transmis par App.svelte
    if (nbQuestions) exercice.nbQuestions = nbQuestions
    updateDisplay()
  })

  function switchInteractif () {
    interactif = !interactif
    exercice.interactif = interactif
    updateDisplay()
  }
</script>

<div bind:this="{divExercice}">
  <h1 class="border-b border-gray-300 text-orange-600 font-semibold text-left pl-4 text-xl mt-4 pb-2 flex flex-row justify-between items-center">
    <div class="flex justify-start">
      Exercice {indiceExercice + 1}
    </div>
    <div class="flex justify-end">
      <button type="button" on:click="{switchInteractif}"><i class="bx ml-6 {interactif ? 'bxs-mouse' : 'bx-mouse'}"></i></button>
      <button type="button" on:click="{() => {visible = !visible}}"><i class="bx ml-6 {visible ? 'bx-hide' : 'bx-show'}"></i></button>
      <button type="button" on:click="{() => {parametresVisible = !parametresVisible}}"><i class="bx ml-6 {parametresVisible ? 'bxs-cog' : 'bx-cog'}"></i></button>
      <button type="button" on:click="{newData}"><i class="bx bx-refresh ml-6"></i></button>
      <button type="button" on:click="{remove}"><i class="bx bx-trash ml-6"></i></button>
      <BoutonMonter indice={indiceExercice} />
      <BoutonDescendre indice={indiceExercice} indiceLastExercice={indiceLastExercice} />
      <button class="flex flex-row items-center w-32" type="button" on:click="{transitionContenuCorrection}">
          <i class="bx ml-6 {contenuVisible ? 'bxs-toggle-left' : 'bxs-toggle-right'}">
            <span class="font-thin text-sm">
              {correctionVisible ? 'Correction' : 'Consigne'}
            </span>
      </button>
    </div>
  </h1>
  <p class="pl-4">
    {#if visible}
      {#if contenuVisible}
        <div class="ml-5">{@html contenu}</div>
      {:else}
        <div class="ml-5">{@html correction}</div>
      {/if}
    {/if}
  </p>
  {#if parametresVisible}
  <div transition:fade class="mt-3">
    <Settings exercice={exercice} on:reglages={handleNewSettings}/>
  </div>
  {/if}
</div>

<style>
</style>
