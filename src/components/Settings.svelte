<script lang="ts">
  import type Exercice from 'src/exercices/ExerciceTs';
import { createEventDispatcher, onMount } from 'svelte';

  export let nbQuestions: number
  let inputNbQuestions: HTMLInputElement
 $: {
     if (nbQuestions > 0) nouveauxReglages()
 }

 const dispatch = createEventDispatcher()

 function nouveauxReglages() {
		dispatch('reglages', {
			nbQuestions
		})
	}
</script>

<h3 class="font-bold" >Paramètres</h3>
<div>
    Nombre de questions : <input type="number" bind:this={inputNbQuestions} bind:value={nbQuestions} class="w-12">
</div>
