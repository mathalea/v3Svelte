<script lang="ts">
  import { afterUpdate, onMount, tick } from 'svelte'
  import { fade } from 'svelte/transition'
  import seedrandom from 'seedrandom'
  import BoutonMonter from './BoutonMonter.svelte'
  import BoutonDescendre from './BoutonDescendre.svelte'
  import { Mathalea } from '../Mathalea'
  import type Exercice from '../exercices/ExerciceTs'
  import Settings from './Settings.svelte'
  import { randomInt } from 'mathjs'

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
  let contenu: string = ''
  let correction: string = ''



  afterUpdate(() => {
    Mathalea.renderDiv(divExercice)
  })

  function handleNewSettings(event: CustomEvent) {
    if (event.detail.nbQuestions) exercice.nbQuestions = (event.detail.nbQuestions)
    if (event.detail.sup !== undefined) exercice.sup = (event.detail.sup)
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

  function updateDisplay() {
    if (exercice.seed === undefined) exercice.seed = randomInt(1, 9999).toString()
    seedrandom(exercice.seed, { global: true })
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
</script>

<div bind:this="{divExercice}">
  <h1 class="border-b border-gray-300 text-orange-600 font-semibold text-left pl-4 text-xl mt-4 pb-2 flex flex-row items-center">
    Exercice {indiceExercice + 1}
    <button type="button" on:click="{() => {visible = !visible}}"><i class="bx ml-6 {visible ? 'bx-hide' : 'bx-show'}"></i></button>
    <button type="button" on:click="{() => {parametresVisible = !parametresVisible}}"><i class="bx ml-6 {parametresVisible ? 'bxs-cog' : 'bx-cog'}"></i></button>
    <button type="button" on:click="{newData}"><i class="bx bx-refresh ml-6"></i></button>
    {#if indiceExercice > 0}
      <BoutonMonter indice="{indiceExercice}" />
    {/if}
    {#if indiceExercice < indiceLastExercice - 1}
      <BoutonDescendre indice="{indiceExercice}" />
    {/if}
    <button type="button" on:click="{transitionContenuCorrection}">
        <i class="bx ml-6 {contenuVisible ? 'bxs-toggle-left' : 'bxs-toggle-right'}">
        {correctionVisible ? 'Correction' : 'Consigne'}
    </button>
  </h1>
  {#if visible}
    {#if contenuVisible}
      <div>{@html contenu}</div>
    {:else}
      <div>{@html correction}</div>
    {/if}
  {/if}
  {#if parametresVisible}
  <div transition:fade class="mt-3">
    <Settings exercice={exercice} on:reglages={handleNewSettings}/>
  </div>
  {/if}
</div>

<style>
</style>
