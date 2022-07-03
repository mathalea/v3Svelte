<script lang="ts">
  import { parse } from "mathjs"

  import type Exercice from "src/exercices/ExerciceTs"
  import { afterUpdate, createEventDispatcher } from "svelte"

  export let exercice
  let nbQuestions: number
  let sup
  let sup2
  let sup3
  let sup4
  let premierUpdate = true
  // pour récupérer les tooltips de l'exercice
  let formNum1
  let formNum2
  let formNum3
  let formNum4

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
  /**
   * Transforme le tableau des tooltips d'un exercice en un objet
   * constitué d'un titre (celui du paramètre) et soit d'un tableau
   * des options, soit d'un nombre correspond à la valeur maximale.
   * <i>Référence :</i> commentaire du fichier Exercice.ts sur la propriété
   * <code>besoinFormulaireNumérique</code> (<code>false</code>
   * sinon this.besoinFormulaireNumerique = [texte, max, tooltip facultatif])
   * @param {string[]} entreesFormulaire Typiquement la valeur de la propriété
   * <code>besoinFormulaireNumérique</code>
   * @author sylvain chambon
   */
  function parseFormEntries(entreesFormulaire: string[]) {
    let entrees = [...entreesFormulaire]
    let titre = entrees.shift() // le titre du paramètre est le 1er elt
    let champs: string[] | number
    if (entrees.length > 1) {
      // il y a une liste de tooltips qui deviendront les entrées
      champs = entrees
        .pop()
        .split("\n")
        .map((x) => x.replace(/(?:\d *: *)/i, ""))
    } else {
      // les champs se résument à un seul nombre correspondant au maximum
      champs = entrees[0]
    }
    return { titre, champs }
  }
  // fabrication des objets correspondant aux paramètres numériques.
  if (exercice.besoinFormulaireNumerique) {
    formNum1 = parseFormEntries(exercice.besoinFormulaireNumerique)
  }
  if (exercice.besoinFormulaire2Numerique) {
    formNum2 = parseFormEntries(exercice.besoinFormulaire2Numerique)
  }
  if (exercice.besoinFormulaire3Numerique) {
    formNum3 = parseFormEntries(exercice.besoinFormulaire3Numerique)
  }
  if (exercice.besoinFormulaire4Numerique) {
    formNum4 = parseFormEntries(exercice.besoinFormulaire4Numerique)
  }
</script>

<div class="bg-gray-100 text-2xl lg:text-base ml-2 lg:mx-4 flex flex-col space-y-4 p-3 rounded-md">
  <h3 class="text-coopmaths font-bold">Paramètres</h3>
  {#if !exercice.nbQuestionsModifiable && !exercice.besoinFormulaireCaseACocher && !exercice.besoinFormulaireNumerique && !exercice.besoinFormulaireTexte}
    <div class="italic">Cet exercice ne peut pas être paramétré.</div>
  {/if}
  {#if exercice.nbQuestionsModifiable}
    <div>
      <span class="text-coopmaths-lightest">Nombre de questions :</span> <input type="number" bind:value={nbQuestions} on:change={nouveauxReglages} class="w-16 border-2" />
    </div>
  {/if}
  {#if exercice.besoinFormulaireCaseACocher}
    <div>
      <label class="text-coopmaths-lightest" for="check1">
        {exercice.besoinFormulaireCaseACocher[0]} :
      </label>
      <input name="check1" type="checkbox" class="w-16 border-2 text-coopmaths-lightest" bind:checked={sup} on:change={nouveauxReglages} />
    </div>
  {/if}
  {#if exercice.besoinFormulaireNumerique}
    {#if isNaN(formNum1.champs)}
      <div class="flex flex-col">
        <form action="">
          <label class="text-coopmaths-lightest" for="formNum1">{formNum1.titre}</label>
          <select class="flex flex-auto" name="formNum1" id="formNum1-select" bind:value={sup} on:change={nouveauxReglages}>
            {#each formNum1.champs as entree, i}
              <option value={i + 1}>{entree}</option>
            {/each}
          </select>
        </form>
      </div>
    {:else}
      <div>
        <!-- Il faudra gérer l'absence de tooltip -->
        <label class="text-coopmaths-lightest" for="formNum1">{exercice.besoinFormulaireNumerique[0]} :</label>
        <input
          name="formNum1"
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
  {/if}
  {#if exercice.besoinFormulaireTexte}
    <div>
      <label class=" text-coopmaths-lightest" for="formText1">{exercice.besoinFormulaireTexte[0]} :</label>
      <input name="formText1" type="text" class="w-16 border-2" data-bs-toggle="tooltip" title={exercice.besoinFormulaireTexte[1] || ""} bind:value={sup} on:change={nouveauxReglages} />
    </div>
  {/if}

  <!-- sup2 -->
  {#if exercice.besoinFormulaire2CaseACocher}
    <div>
      <label class=" text-coopmaths-lightest" for="check2">{exercice.besoinFormulaire2CaseACocher[0]} : </label>
      <input name="check2" type="checkbox" class="w-16 border-2 text-coopmaths-lightest" bind:checked={sup2} on:change={nouveauxReglages} />
    </div>
  {/if}
  {#if exercice.besoinFormulaire2Numerique}
    {#if isNaN(formNum2.champs)}
      <div class="flex flex-col">
        <form action="">
          <label class="text-coopmaths-lightest" for="formNum2">{formNum2.titre}</label>
          <select class="flex flex-auto" name="formNum2" id="formNum2-select" bind:value={sup2} on:change={nouveauxReglages}>
            {#each formNum2.champs as entree, i}
              <option value={i + 1}>{entree}</option>
            {/each}
          </select>
        </form>
      </div>
    {:else}
      <div>
        <!-- Il faudra gérer l'absence de tooltip -->
        <label class="text-coopmaths-lightest" for="formNum2">{exercice.besoinFormulaire2Numerique[0]} :</label>
        <input
          name="formNum2"
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
  {/if}
  {#if exercice.besoinFormulaire2Texte}
    <div>
      <label class="text-coopmaths-lightest" for="formText2">{exercice.besoinFormulaire2Texte[0]} :</label>
      <input name="formText2" type="text" class="w-16 border-2" data-bs-toggle="tooltip" title={exercice.besoinFormulaire2Texte[1] || ""} bind:value={sup2} on:change={nouveauxReglages} />
    </div>
  {/if}

  <!-- sup3 -->
  {#if exercice.besoinFormulaire3CaseACocher}
    <div>
      <label class="text-coopmaths-lightest" for="check3">{exercice.besoinFormulaire3CaseACocher[0]} : </label>
      <input name="check3" type="checkbox" class="w-16 border-2" bind:checked={sup3} on:change={nouveauxReglages} />
    </div>
  {/if}
  {#if exercice.besoinFormulaire3Numerique}
    {#if isNaN(formNum3.champs)}
      <div class="flex flex-col">
        <form action="">
          <label class="text-coopmaths-lightest" for="formNum3">{formNum3.titre}</label>
          <select class="flex flex-auto" name="formNum3" id="formNum3-select" bind:value={sup3} on:change={nouveauxReglages}>
            {#each formNum3.champs as entree, i}
              <option value={i + 1}>{entree}</option>
            {/each}
          </select>
        </form>
      </div>
    {:else}
      <div>
        <!-- Il faudra gérer l'absence de tooltip -->
        <label class="text-coopmaths-lightest" for="formNum3">{exercice.besoinFormulaire3Numerique[0]} :</label>
        <input
          name="formNum3"
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
  {/if}
  {#if exercice.besoinFormulaire3Texte}
    <div>
      <label class="text-coopmaths-lightest" for="formText3">{exercice.besoinFormulaire3Texte[0]} :</label>
      <input name="formText3" type="text" class="w-16 border-2" data-bs-toggle="tooltip" title={exercice.besoinFormulaire3Texte[1] || ""} bind:value={sup3} on:change={nouveauxReglages} />
    </div>
  {/if}

  <!-- sup4 -->
  {#if exercice.besoinFormulaire4CaseACocher}
    <div>
      <label class="text-coopmaths-lightest" for="check4">{exercice.besoinFormulaire4CaseACocher[0]} : </label>
      <input name="check4" type="checkbox" class="w-16 border-2" bind:checked={sup4} on:change={nouveauxReglages} />
    </div>
  {/if}
  {#if exercice.besoinFormulaire4Numerique}
    {#if isNaN(formNum4.champs)}
      <div class="flex flex-col">
        <form action="">
          <label class="text-coopmaths-lightest" for="formNum4">{formNum4.titre}</label>
          <select class="flex flex-auto" name="formNum4" id="formNum4-select" bind:value={sup4} on:change={nouveauxReglages}>
            {#each formNum4.champs as entree, i}
              <option value={i + 1}>{entree}</option>
            {/each}
          </select>
        </form>
      </div>
    {:else}
      <div>
        <!-- Il faudra gérer l'absence de tooltip -->
        <label class="text-coopmaths-lightest" for="formNum4">{exercice.besoinFormulaire4Numerique[0]} :</label>
        <input
          name="formNum4"
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
  {/if}
  {#if exercice.besoinFormulaire4Texte}
    <div>
      <label class="text-coopmaths-lightest" for="formText4">{exercice.besoinFormulaire4Texte[0]} :</label>
      <input name="formText4" type="text" class="w-16 border-2" data-bs-toggle="tooltip" title={exercice.besoinFormulaire4Texte[1] || ""} bind:value={sup4} on:change={nouveauxReglages} />
    </div>
  {/if}
</div>
