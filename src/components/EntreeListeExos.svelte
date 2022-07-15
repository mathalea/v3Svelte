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
  /**
   * Tester si un exercice est bien dans la liste des exercices sélectionnés
   * (sur la base de la `listeExercices` présente dans le store)
   * @param code nom de l'exercice (par exemple "6N11-5")
   * @return `true` si le fichier est bien dans la liste (`false` sinon)
   * @author sylvain chambon
   */
  function isPartOfSelectedExercises(code: string) {
    let liste = get(listeExercices)
    let reponse = false
    liste.forEach((exo) => {
      if (code === exo.filename) {
        reponse = true
      }
    })
    return reponse
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
  <div class="flex-1 hover:bg-coopmaths-lightest cursor-pointer">
    <div class="ml-[3px] pl-2 bg-gray-200 hover:bg-gray-100 flex-1">
      <span class="font-bold">{exo.code} - </span>{codeToTitle([...pathToThisNode, exo.id])}
    </div>
  </div>
  {#if isPartOfSelectedExercises(exo.code)}
    <div class="absolute -left-4"><i class="text-coopmaths-lightest bx bxs-tag rotate-180" /></div>
  {/if}
</div>
