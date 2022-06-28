<script lang="ts">
  let visible = true;
  let contenuVisible = true;
  let correctionVisible = true;
  let parametresVisible = false;
  import BoutonMonter from "./BoutonMonter.svelte";
  import BoutonDescendre from "./BoutonDescendre.svelte";


  async function transitionContenuCorrection() {
    correctionVisible = !correctionVisible;
    contenuVisible = !contenuVisible;
  }

  async function newData() {
    const seed = (Math.random() * 1000).toString();
    exercice.seed = seed;
    updateDisplay();
  }

  function remove() {
        listeExercices.update( l => [...l.slice(0, indiceExercice), ...l.slice(indiceExercice + 1)])
  }
  </script>
le
<div class="flex justify-end">
    <button
      type="button"
      on:click={() => {
        visible = !visible;
      }}><i class="bx ml-6 {visible ? 'bx-hide' : 'bx-show'}" /></button
    >
    <button
      type="button"
      on:click={() => {
        parametresVisible = !parametresVisible;
      }}
      ><i
        class="bx ml-6 {parametresVisible ? 'bxs-cog' : 'bx-cog'}"
      /></button
    >
    <button type="button" on:click={newData}><i class="bx bx-refresh ml-6" /></button>
    <button type="button" on:click="{remove}"><i class="bx bx-trash ml-6"></i></button>
    <BoutonMonter indice={indiceExercice} />
    <BoutonDescendre indice={indiceExercice} indiceLastExercice={indiceLastExercice} />
    <button
      class="flew flex-row items-center w-32"
      type="button"
      on:click={transitionContenuCorrection}
    >
      <i
        class="bx ml-6 {contenuVisible
          ? 'bxs-toggle-left'
          : 'bxs-toggle-right'}"
      >
        <span class="font-thin text-sm">
          {correctionVisible ? "Correction" : "Consigne"}
        </span>
      </i></button
    >
  </div>