
<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { fade } from 'svelte/transition'
  import BoutonMonter from './BoutonMonter.svelte'
  import BouttonDescendre from './BoutonDescendre.svelte'
  import { Mathalea } from '../Mathalea'
  import type Exercice from "../exercices/ExerciceTs"


  export let directory: string
  export let filename: string
  export let nbQuestions = undefined
  export let indiceExercice: number
  export let indiceLastExercice: number

  let exercice: Exercice
  let divExercice: HTMLDivElement
  let visible = true
  let contenuVisible = true
  let correctionVisible = false
  let titre: string = ""
  let contenu: string = ""
  let correction: string = ""

  function renderMath() {
    Mathalea.renderDiv(divExercice)
  }

  async function transitionContenuCorrection() {
      correctionVisible = !correctionVisible
      contenuVisible = !contenuVisible
    }

  async function newData() {
    const seed = (Math.random() * 1000).toString()
    exercice.seed = seed
    exercice.nouvelleVersion()
    // Randomseed
    contenu = exercice.contenu
    correction = exercice.contenuCorrection
    refreshDisplay()
}

async function refreshDisplay() {
  if (exercice) {
    await tick()
    renderMath()
  }

}

  $: {
    // Dès qu'une de ces variables change, on réactualise le rendu
    if (visible || correctionVisible || contenuVisible) refreshDisplay()
  }

  onMount(async () => {
    exercice = await Mathalea.load(directory, filename)
    titre = exercice.titre
    if (nbQuestions) exercice.nbQuestions = nbQuestions
    exercice.nouvelleVersion()
    contenu = exercice.contenu
    correction = exercice.contenuCorrection
    refreshDisplay()
   
  })
</script>

<div>
  <button type="button" on:click={() => {visible = !visible}}>{visible ? "Cacher" : "Montrer"}</button>
  <button type="button" on:click={transitionContenuCorrection}>{contenuVisible ? "Voir la correction" : "Voir la consigne"}</button>
  <button type="button" on:click={newData}>Actualiser</button>
  {#if indiceExercice > 0}
    <BoutonMonter indice={indiceExercice} />
  {/if}
  {#if indiceExercice < indiceLastExercice - 1}
    <BouttonDescendre indice={indiceExercice} />
  {/if}
</div>
{#if visible}
<div bind:this="{divExercice}">
  <h1>Exercice {indiceExercice + 1} - {titre}</h1>
  {#if contenuVisible}
    <div>{@html contenu}</div>
  {/if}
  {#if correctionVisible}
    <div>{@html correction}</div>
  {/if}
  </div>
{/if}

<style>
 
</style>
