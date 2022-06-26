<script lang="ts">
    import Chips from './chips.svelte'

    import { listeExercices } from './store'

    let input: HTMLInputElement
    let listeId = []

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
            directory: "6e",
            filename: newId
        }
        listeExercices.update( l => [...l, newExercice])
        input.value = ''
    }
</script>

{#each listeId as id, indice (indice) }
  <Chips text={id} indice={indice}/>  
{/each}

<input type="text" class="inline-flex border" bind:this="{input}" on:change="{handleChange}"/>
