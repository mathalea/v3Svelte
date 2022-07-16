<script lang="ts">
  import { get } from "svelte/store"
  import { listeExercices } from "./store"

  type Exo = {
    id: string
    code: string
  }
  export let exo: Exo
  export let pathToThisNode: string[]
  export let nestedLevelCount: number
  /*--------------------------------------------------------------
    Gestions de l'affichage du titre de l'exercice
   ---------------------------------------------------------------*/
  /**
   * Transforme un objet en arbre basé sur un type Map.
   * Chaque propriété devient une clé et la valeur correspondante devient :
   * - soit une valeur si la valeur de la propriété est un tableau
   * - soit une autre map dans le cas contraire
   * @param {any} obj
   * @return {Map} l'arbre correspondant à l'objet
   * @author sylvain chambon
   */
  function toMap(obj: any): Map {
    let dico = new Map()
    for (let cle of Object.keys(obj)) {
      if (obj[cle] instanceof Object) {
        if (obj[cle] instanceof Array) {
          dico.set(cle, obj[cle])
        } else {
          dico.set(cle, toMap(obj[cle]))
        }
      } else {
        dico.set(cle, obj[cle])
      }
    }
    return dico
  }

  import data from "../dicos/exosDispo.json"
  const dictionnaire = toMap(data)

  /**
   * Cherche dans l'arbre des exercices disponibles
   * un exercice connaissant son chemin
   * (c'est-à-dire par exemple 1e>1AN>UUID)
   * et renvoie son titre
   * @param {string[]} chemin tableau des nœuds représentant
   * le chemin dans le JSON des exos dispos
   * @return {string} titre de l'exercice
   * @author sylvain chambon
   */
  function codeToTitle(chemin: string[]): string {
    let cheminAChercher = [...chemin]
    let response = dictionnaire.get(cheminAChercher.shift())
    cheminAChercher.forEach((cle) => {
      response = response.get(cle)
    })
    return response.get("titre")
  }

  /*--------------------------------------------------------------
    Gestions des exercices via la liste
   ---------------------------------------------------------------*/
  const isPresent = (code) => code === exo.code
  let selectedCount = 0
  let listeCodes = []
  // on compte réactivement le nombre d'occurences
  // de l'exercice dans la liste des sélectionnés
  $: {
    listeCodes = []
    for (const exo of $listeExercices) {
      listeCodes.push(exo.filename)
    }
    listeCodes = listeCodes
    selectedCount = listeCodes.filter(isPresent).length
  }
  /**
   * Ajouter l'exercice courant à la liste
   */
  function addToList() {
    const newExercise = {
      directory: exo.code[0] + "e",
      filename: exo.code,
    }
    listeExercices.update((list) => [...list, newExercise])
  }
  /**
   * Retirer l'exercice de la liste (si plusieurs occurences
   * la première est retirée)
   */
  function removeFromList() {
    let matchingIndex = listeCodes.findIndex(isPresent)
    console.log("exo " + exo.code + " est en position " + matchingIndex)
    listeExercices.update((list) => [...list.slice(0, matchingIndex), ...list.slice(matchingIndex + 1)])
  }

  /*--------------------------------------------------------------
    Gestions des icônes en début de ligne
   ---------------------------------------------------------------*/
  let icon = "bxs-message-alt"
  let rotation = "-rotate-90"
  let mouseIsOut = true
  function handleMouseOver() {
    icon = "bx-trash"
    rotation = "rotate-0"
    mouseIsOut = false
  }
  function handleMouseOut() {
    icon = "bxs-message-alt"
    rotation = "-rotate-90"
    mouseIsOut = true
  }
</script>

<!-- 
  @component
  Écrit le nom d'un exercice sur le format : code + titre

  Par exemple : *5A12-1 - Primalité ou pas*

  Ajoute un tag en tête de ligne si le fichier est présent
  dans la liste des exercices sélectionnés

  Paramètres :
  - **exo** : objet de type *Exo* (`{"id": UUID de l'exo, "code": nom de l'exo (par exemple "6N12-3")}`)
  - **pathToThisNode** : chemin amenant à cet exercice (utlisé dans la recherche du titre)
  - **nestedLevelCount** : compteur pour connaître le nombre d'imbrication (utilisé pour l'indentation de la ligne)
  
 -->
<div class="relative flex flex-row items-center text-sm text-gray-600 bg-gray-400 ml-{nestedLevelCount * 2}">
  <div class="flex-1 hover:bg-coopmaths-lightest cursor-pointer" on:click={addToList}>
    <div class="ml-[3px] pl-2 bg-gray-200 hover:bg-gray-100 flex-1">
      <span class="font-bold">{exo.code} - </span>{codeToTitle([...pathToThisNode, exo.id])}
    </div>
  </div>
  {#if selectedCount >= 1}
    <button type="button" class="absolute -left-4" on:mouseover={handleMouseOver} on:mouseout={handleMouseOut} on:click={removeFromList}
      ><i class="text-coopmaths-lightest text-base bx {icon} {rotation}" /></button
    >
  {/if}
  {#if (selectedCount >= 2) & mouseIsOut}
    <div class="absolute -left-[12.5px] text-[0.6rem] font-bold text-white">{selectedCount}</div>
  {/if}
</div>
