<script lang="ts">
  import { afterUpdate, onMount, tick } from 'svelte';
  import { fade } from 'svelte/transition';
  import { listeExercices } from './store';
  import seedrandom from 'seedrandom';
  import BoutonMonter from './BoutonMonter.svelte';
  import BoutonDescendre from './BoutonDescendre.svelte';
  import { Mathalea } from '../Mathalea';
  import type Exercice from '../exercices/ExerciceTs';
  import Settings from './Settings.svelte';
  import { randomInt } from 'mathjs';
  import Contenu from './Contenu.svelte';
  import { loadMathLive } from '../modules/loaders';
  import { exerciceInteractif } from '../interactif/interactif';

  export let directory: string;
  export let filename: string;
  export let nbQuestions = undefined;
  export let indiceExercice: number;
  export let indiceLastExercice: number;

  let exercice: Exercice;
  let divExercice: HTMLDivElement;
  let divScore: HTMLDivElement;
  let buttonScore: HTMLButtonElement;
  let visible = true;
  let contenuVisible = true;
  let correctionVisible = true;
  let parametresVisible = false;
  let interactif = false;
  let titre: string;
  let consigne: string;
  let consigneCorrection: string;
  let listeQuestions: string[] = [];
  let listeCorrections: string[] = [];
  let spacing: number
  let spacingCorr: number

  afterUpdate(() => {
    Mathalea.renderDiv(divExercice);
    if (interactif) {
      loadMathLive();
      // exerciceInteractif(exercice)
    }
  });

  function handleNewSettings(event: CustomEvent) {
    if (event.detail.nbQuestions) exercice.nbQuestions = event.detail.nbQuestions;
    if (event.detail.sup !== undefined) exercice.sup = event.detail.sup;
    if (event.detail.sup2 !== undefined) exercice.sup2 = event.detail.sup2;
    if (event.detail.sup3 !== undefined) exercice.sup3 = event.detail.sup3;
    if (event.detail.sup4 !== undefined) exercice.sup4 = event.detail.sup4;
    updateDisplay();
  }

  async function transitionContenuCorrection() {
    correctionVisible = !correctionVisible;
    contenuVisible = !contenuVisible;
  }

  async function newData() {
    const seed = (Math.random() * 1000).toString();
    exercice.seed = seed;
    updateDisplay();
  }

  function toggle(flag: boolean) {
    flag !== flag;
  }

  function remove() {
    listeExercices.update((l) => [...l.slice(0, indiceExercice), ...l.slice(indiceExercice + 1)]);
  }

  function updateDisplay() {
    if (exercice.seed === undefined) exercice.seed = randomInt(1, 9999).toString();
    seedrandom(exercice.seed, { global: true });
    exercice.interactif = interactif;
    exercice.nouvelleVersion();
    titre = exercice.titre;
    listeQuestions = [...exercice.listeQuestions];
    listeCorrections = [...exercice.listeCorrections];
    consigne = exercice.consigne;
    consigneCorrection = exercice.consigneCorrection;
    spacing = exercice.spacing
    spacingCorr = exercice.spacingCorr
  }

  onMount(async () => {
    exercice = await Mathalea.load(directory, filename);
    // Nombre de questions transmis par App.svelte
    if (nbQuestions) exercice.nbQuestions = nbQuestions;
    exercice.numeroExercice = indiceExercice;
    updateDisplay();
  });

  function switchInteractif() {
    interactif = !interactif;
    exercice.interactif = interactif;
    updateDisplay();
  }

  function verifExercice() {
    exerciceInteractif(exercice, divScore, buttonScore);
  }
</script>

<div bind:this="{divExercice}">
  <h1 class="border-b border-gray-300 text-orange-600 pl-4 mt-4 pb-2 flex flex-col lg:flex-row lg:justify-between lg:items-center">
    <div class="flex flex-col lg:flex-row lg:justify-start lg:items-center" id="exercice{indiceExercice}">
      <div class="flex font-bold text-3xl md:text-lg">Exercice {indiceExercice + 1}</div>
      <div class="flex font-normal text-lg lg:text-normal"><span class="invisible lg:visible mx-1 font-bold">&middot;</span>{titre}</div>
    </div>
    <div class="flex justify-start text-normal mt-1 lg:justify-end lg:text-xl">
      <button type="button" on:click="{switchInteractif}"><i class="bx ml-2 {interactif ? 'bxs-mouse' : 'bx-mouse'} {!exercice?.interactifReady ? 'invisible' : ''}"></i></button>
      <button type="button" on:click="{() => (visible = !visible)}">
        <i class="bx ml-2 {visible ? 'bx-hide' : 'bx-show'}"></i>
      </button>
      <button type="button" on:click="{() => (parametresVisible = !parametresVisible)}">
        <i class="bx ml-2 {parametresVisible ? 'bxs-cog' : 'bx-cog'}"></i>
      </button>
      <button type="button" on:click="{newData}"><i class="bx bx-refresh ml-2 {exercice?.typeExercice === 'statique' ? 'invisible' : ''}"></i></button>
      <button type="button" on:click="{remove}"><i class="bx bx-trash ml-2"></i></button>
      <BoutonMonter indice="{indiceExercice}" />
      <BoutonDescendre indice="{indiceExercice}" indiceLastExercice="{indiceLastExercice}" />
      <button class="flew flex-row items-center w-32" type="button" on:click="{transitionContenuCorrection}"> <i class="bx ml-2 {contenuVisible ? 'bxs-toggle-left' : 'bxs-toggle-right'}"> <span class="font-thin text-sm"> {correctionVisible ? 'Correction' : 'Consigne'} </span> </i></button>
    </div>
  </h1>
  {#if visible}
    <div id="exercice{indiceExercice}">
      {#if contenuVisible}
        <Contenu chapeau="{consigne}" entrees="{listeQuestions}" spacing="{spacing}" />
      {:else}
        <Contenu chapeau="{consigneCorrection}" entrees="{listeCorrections}" spacing="{spacingCorr}" />
      {/if}
      {#if exercice?.interactif}
        <button
          class="inline-block px-6 py-2.5 mr-10 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out checkReponses"
          type="submit"
          style="margin-bottom: 20px; margin-top: 20px"
          on:click="{verifExercice}"
          bind:this="{buttonScore}"
          >Vérifier les réponses</button
        >
        <div bind:this="{divScore}"></div>
      {/if}
    </div>
  {/if}

  {#if parametresVisible}
    <div transition:fade class="mt-3">
      <Settings exercice="{exercice}" on:reglages="{handleNewSettings}" />
    </div>
  {/if}
</div>

<style>
</style>
