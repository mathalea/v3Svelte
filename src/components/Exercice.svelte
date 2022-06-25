<script lang="ts">
  import { onMount, tick } from 'svelte';
  import BoutonMonter from './BoutonMonter.svelte';
  import BoutonDescendre from './BoutonDescendre.svelte';
  import { Mathalea } from '../Mathalea';
  import type Exercice from '../exercices/ExerciceTs';

  export let directory: string;
  export let filename: string;
  export let nbQuestions = undefined;
  export let indiceExercice: number;
  export let indiceLastExercice: number;

  let exercice: Exercice;
  let divExercice: HTMLDivElement;
  let visible = true;
  let contenuVisible = true;
  let correctionVisible = true;
  let titre: string = '';
  let contenu: string = '';
  let correction: string = '';

  function renderMath() {
    Mathalea.renderDiv(divExercice);
  }

  async function transitionContenuCorrection() {
    correctionVisible = !correctionVisible;
    contenuVisible = !contenuVisible;
  }

  async function newData() {
    const seed = (Math.random() * 1000).toString();
    exercice.seed = seed;
    exercice.nouvelleVersion();
    // Randomseed
    contenu = exercice.contenu;
    correction = exercice.contenuCorrection;
    refreshDisplay();
  }

  async function refreshDisplay() {
    if (exercice) {
      await tick();
      renderMath();
    }
  }

  $: {
    // Dès qu'une de ces variables change, on réactualise le rendu
    if (visible || correctionVisible || contenuVisible) refreshDisplay();
  }

  onMount(async () => {
    exercice = await Mathalea.load(directory, filename);
    titre = exercice.titre;
    if (nbQuestions) exercice.nbQuestions = nbQuestions;
    exercice.nouvelleVersion();
    contenu = exercice.contenu;
    correction = exercice.contenuCorrection;
    refreshDisplay();
  });
</script>

<div bind:this="{divExercice}">
  <h1
    class="border-b border-gray-300 text-orange-600 font-semibold text-left pl-4 text-xl mt-4 pb-2 flex flex-row items-center"
  >
    Exercice {indiceExercice + 1}
    <button
      type="button"
      on:click="{() => {
        visible = !visible;
      }}"
    >
      {#if visible}
        <i class="bx bx-hide ml-6"></i>
      {:else}
        <i class="bx bx-show ml-6"></i>
      {/if}
    </button>
    <button type="button" on:click="{newData}"
      ><i class="bx bx-refresh ml-6"></i></button
    >
    {#if indiceExercice > 0}
      <BoutonMonter indice="{indiceExercice}" />
    {/if}
    {#if indiceExercice < indiceLastExercice - 1}
      <BoutonDescendre indice="{indiceExercice}" />
    {/if}
    <button type="button" on:click="{transitionContenuCorrection}">
      {#if contenuVisible}
        <i class="bx bxs-toggle-left ml-6"></i>
      {:else}
        <i class="bx bxs-toggle-right ml-6"></i>
      {/if}
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
</div>

<style>
</style>
