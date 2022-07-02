<script lang="ts">
  import type Exercice from "src/exercices/ExerciceTs"
  import { afterUpdate, createEventDispatcher } from "svelte"

  export let exercice
  let nbQuestions: number
  let sup
  let sup2
  let sup3
  let sup4
  let premierUpdate = true

  afterUpdate(async () => {
    // On ne remplit les champs que la première fois
    if (exercice && premierUpdate) {
      premierUpdate = false
      nbQuestions = exercice.nbQuestions
      sup = exercice.sup
      sup2 = exercice.sup2
      sup3 = exercice.sup3
      sup4 = exercice.sup4
    }
  })

  const dispatch = createEventDispatcher()

  function nouveauxReglages() {
    dispatch("reglages", {
      nbQuestions,
      sup,
      sup2,
      sup3,
      sup4,
    })
  }
</script>

<div class="bg-gray-100 text-2xl lg:text-base ml-2 lg:mx-4 flex flex-col space-y-4 p-3 rounded-md">
  <h3 class="text-coopmaths font-bold">Paramètres</h3>
  {#if !exercice.nbQuestionsModifiable && !exercice.besoinFormulaireCaseACocher && !exercice.besoinFormulaireNumerique && !exercice.besoinFormulaireTexte}
    <div class="italic">Cet exercice ne peut pas être paramétré.</div>
  {/if}
  {#if exercice.nbQuestionsModifiable}
    <div>
      Nombre de questions : <input type="number" bind:value={nbQuestions} on:change={nouveauxReglages} class="w-16 border-2" />
    </div>
  {/if}
  {#if exercice.besoinFormulaireCaseACocher}
    <div>
      {exercice.besoinFormulaireCaseACocher[0]} : <input type="checkbox" class="w-16 border-2" bind:checked={sup} on:change={nouveauxReglages} />
    </div>
  {/if}
  {#if exercice.besoinFormulaireNumerique}
    <div>
      <!-- Il faudra gérer l'absence de tooltip -->
      {exercice.besoinFormulaireNumerique[0]} :
      <input
        type="number"
        class="w-16 border-2"
        min="1"
        max={exercice.besoinFormulaireNumerique[1]}
        data-bs-toggle="tooltip"
        title={exercice.besoinFormulaireNumerique[2] || ""}
        bind:value={sup}
        on:change={nouveauxReglages}
      />
    </div>
  {/if}
  {#if exercice.besoinFormulaireTexte}
    <div>
      {exercice.besoinFormulaireTexte[0]} :
      <input type="text" class="w-16 border-2" data-bs-toggle="tooltip" title={exercice.besoinFormulaireTexte[1] || ""} bind:value={sup} on:change={nouveauxReglages} />
    </div>
  {/if}

  <!-- sup2 -->
  {#if exercice.besoinFormulaire2CaseACocher}
    <div>
      {exercice.besoinFormulaire2CaseACocher[0]} : <input type="checkbox" class="w-16 border-2" bind:checked={sup2} on:change={nouveauxReglages} />
    </div>
  {/if}
  {#if exercice.besoinFormulaire2Numerique}
    <div>
      <!-- Il faudra gérer l'absence de tooltip -->
      {exercice.besoinFormulaire2Numerique[0]} :
      <input
        type="number"
        class="w-16 border-2"
        min="1"
        max={exercice.besoinFormulaire2Numerique[1]}
        data-bs-toggle="tooltip"
        title={exercice.besoinFormulaire2Numerique[2] || ""}
        bind:value={sup2}
        on:change={nouveauxReglages}
      />
    </div>
  {/if}
  {#if exercice.besoinFormulaire2Texte}
    <div>
      {exercice.besoinFormulaire2Texte[0]} :
      <input type="text" class="w-16 border-2" data-bs-toggle="tooltip" title={exercice.besoinFormulaire2Texte[1] || ""} bind:value={sup2} on:change={nouveauxReglages} />
    </div>
  {/if}

  <!-- sup3 -->
  {#if exercice.besoinFormulaire3CaseACocher}
    <div>
      {exercice.besoinFormulaire3CaseACocher[0]} : <input type="checkbox" class="w-16 border-2" bind:checked={sup3} on:change={nouveauxReglages} />
    </div>
  {/if}
  {#if exercice.besoinFormulaire3Numerique}
    <div>
      <!-- Il faudra gérer l'absence de tooltip -->
      {exercice.besoinFormulaire3Numerique[0]} :
      <input
        type="number"
        class="w-16 border-2"
        min="1"
        max={exercice.besoinFormulaire3Numerique[1]}
        data-bs-toggle="tooltip"
        title={exercice.besoinFormulaire3Numerique[2] || ""}
        bind:value={sup3}
        on:change={nouveauxReglages}
      />
    </div>
  {/if}
  {#if exercice.besoinFormulaire3Texte}
    <div>
      {exercice.besoinFormulaire3Texte[0]} :
      <input type="text" class="w-16 border-2" data-bs-toggle="tooltip" title={exercice.besoinFormulaire3Texte[1] || ""} bind:value={sup3} on:change={nouveauxReglages} />
    </div>
  {/if}

  <!-- sup4 -->
  {#if exercice.besoinFormulaire4CaseACocher}
    <div>
      {exercice.besoinFormulaire4CaseACocher[0]} : <input type="checkbox" class="w-16 border-2" bind:checked={sup4} on:change={nouveauxReglages} />
    </div>
  {/if}
  {#if exercice.besoinFormulaire4Numerique}
    <div>
      <!-- Il faudra gérer l'absence de tooltip -->
      {exercice.besoinFormulaire4Numerique[0]} :
      <input
        type="number"
        class="w-16 border-2"
        min="1"
        max={exercice.besoinFormulaire4Numerique[1]}
        data-bs-toggle="tooltip"
        title={exercice.besoinFormulaire4Numerique[2] || ""}
        bind:value={sup4}
        on:change={nouveauxReglages}
      />
    </div>
  {/if}
  {#if exercice.besoinFormulaire4Texte}
    <div>
      {exercice.besoinFormulaire4Texte[0]} :
      <input type="text" class="w-16 border-2" data-bs-toggle="tooltip" title={exercice.besoinFormulaire4Texte[1] || ""} bind:value={sup4} on:change={nouveauxReglages} />
    </div>
  {/if}
</div>
