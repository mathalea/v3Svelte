<script lang="ts">
import Exercice from './lib/Exercice.svelte';

const exercice1 = {
    directory: '6e',
    filename: '6C10',
    nbQuestions: 3
  }
</script>

<main>
  
  <Exercice {...exercice1}/>
  <Exercice directory={'6e'} filename='6G10'  />
  <Exercice {...exercice1}/>

</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>
