<script lang="ts">
    import Chips from "./Chips.svelte"
    import { listeExercices } from "./store"
    import AutoComplete from "simple-svelte-autocomplete"
    import data from '../exercicesList.json'
    import data2 from '../levelsThemesList.json'
    
    let input: HTMLInputElement
    let listeId = []
  
    const exercices = []
    let selectedColor
    $: {
      listeId = []
      for (const ex of $listeExercices) {
        listeId.push(ex.filename)
      }
      listeId = listeId
    }
  
    function handleChange() {
      let newId = input.value
      const newExercice = {
        directory: newId[0] + 'e',
        filename: newId,
      }
      listeExercices.update((l) => [...l, newExercice])
      input.value = ""
    }

    function handleChange2() {
      let newId = selectedColor.replace('.js','')
      let ex = newId.split('/')
      const newExercice = {
        directory: ex[0],
        filename: ex[1],
      }
      listeExercices.update((l) => [...l, newExercice])
      input.value = ""
    }

    async function searchExercice() {
    return await data.map(x => x.replace('.js',''));
}
  </script>
<div>
  <AutoComplete
  searchFunction={searchExercice}
  items={exercices}
  bind:selectedItem={selectedColor}   
  />
  <button class="button is-info" on:click={handleChange2}>>></button>
</div>
  <div class="inline-flex space-x-2">
    {#each listeId as id, indice (indice)}
      <Chips text={id} {indice} />
    {/each}
  </div>