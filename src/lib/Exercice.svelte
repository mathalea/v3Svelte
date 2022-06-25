
<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { Mathalea } from '../Mathalea'
  import type Exercice from "../exercices/ExerciceTs"

  export let directory: string
  export let filename: string
  export let nbQuestions = undefined

  let count: number = 0
  let exercice: Exercice
  let divExercice: HTMLDivElement
  let visible = true
  let contenuEtNonCorrection = true
  let titre: string = ""
  let contenu: string = ""
  let correction: string = ""

  function renderMath() {
    Mathalea.renderDiv(divExercice)
  }

  async function newData() {
    const seed = (Math.random() * 1000).toString()
    exercice.seed = seed
    exercice.nouvelleVersion()
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
    if (visible || contenuEtNonCorrection ||!contenuEtNonCorrection) refreshDisplay()
  }

  onMount(async () => {
    exercice = await Mathalea.load(directory, filename)
    titre = exercice.titre
    if (nbQuestions) exercice.nbQuestions = nbQuestions
    exercice.nouvelleVersion()
    contenu = exercice.contenu
    correction = exercice.contenuCorrection
    await tick()
    renderMath()
   
  })
</script>

<div>
  <button type="button" on:click={() => {visible = !visible}}>{visible ? "Cacher" : "Montrer"}</button>
  <button type="button" on:click={() => {contenuEtNonCorrection = !contenuEtNonCorrection}}>{contenuEtNonCorrection ? "Voir la correction" : "Voir la consigne"}</button>
  <button type="button" on:click={newData}>Actualiser</button>
</div>
{#if visible}
<div bind:this="{divExercice}">
  <h1>{titre}</h1>
  {#if contenuEtNonCorrection}
    <div>{@html contenu}</div>
    {:else}
    <div>{@html correction}</div>
  {/if}
  </div>
{/if}

<style>
 
</style>
