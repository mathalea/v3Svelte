<script lang="ts">
  import type Exercice from 'src/exercices/ExerciceTs';
import { afterUpdate, createEventDispatcher } from 'svelte';

  export let exercice
  let nbQuestions: number
  let sup
  let sup2
  let sup3
  let sup4
  let premierUpdate = true

  afterUpdate(async () => {
    // On ne remplit les champs que la première fois
    if(exercice && premierUpdate) {
      premierUpdate = false
      nbQuestions = exercice.nbQuestions
      sup = exercice.sup
    }
  })
 


 const dispatch = createEventDispatcher()

 function nouveauxReglages() {
		dispatch('reglages', {
			nbQuestions, sup
		})
	}
</script>

<h3 class="font-bold" >Paramètres</h3>
<div>
    Nombre de questions : <input type="number" bind:value={nbQuestions} on:change={nouveauxReglages} class="w-12">
</div>
{#if exercice.besoinFormulaireCaseACocher}
  <div>
    {exercice.besoinFormulaireCaseACocher[0]} : <input type="checkbox" bind:checked={sup} on:change={nouveauxReglages}>
  </div>
{/if}
{#if exercice.besoinFormulaireNumerique}
  <div>
    {exercice.besoinFormulaireNumerique[0]} : <input type="number" min="1" max={exercice.besoinFormulaireNumerique[1]} title={exercice.besoinFormulaireNumerique[2] || ''} bind:value={sup} on:change={nouveauxReglages} class="w-12">
  </div>
{/if}
