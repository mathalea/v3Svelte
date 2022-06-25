
<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { fade } from 'svelte/transition'
  import { Mathalea } from '../Mathalea'
  let count: number = 0
  let divExercice: HTMLDivElement
  let visible = true
  let contenuEtNonCorrection = true
  
  let titre: string = "Chargement..."
  let contenu: string = ""
  let correction: string = ""

  function toogleVisibility() {
    visible = !visible
  }
  function toogleContenuEtNonCorrection() {
    contenuEtNonCorrection = !contenuEtNonCorrection
  }

  onMount(async () => {
    const exercice = await Mathalea.load('6e', '6C10')
    titre = exercice.titre
    exercice.nouvelleVersion()
    contenu = exercice.contenu
    correction = exercice.contenuCorrection
    await tick()
    Mathalea.renderDiv(divExercice)
  })
</script>

<div>
  <button type="button" on:click={toogleVisibility}>{visible ? "Cacher" : "Montrer"}</button>
  <button type="button" on:click={toogleContenuEtNonCorrection}>{contenuEtNonCorrection ? "Voir la correction" : "Voir la consigne"}</button>
  <!-- <button type="button" @click="contenuEtNonCorrection = !contenuEtNonCorrection">{{contenuEtNonCorrection ? "Voir la correction" : "Voir les énoncés"}}</button>
  <button type="button" @click="refresh">Actualiser</button> -->
</div>
{#if visible}
<div bind:this="{divExercice}" transition:fade>
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
