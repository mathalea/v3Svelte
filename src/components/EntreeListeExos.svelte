<script lang="ts">
  import { get } from "svelte/store"
  import { listeExercices } from "./store"

  import data from "../dicos/exosDispo.json"

  type Exo = {
    id: string
    code: string
  }
  export let exo: Exo
  export let chemin: string[]
  export let compteurImbrication: number

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
  function nomExo(chemin: string[]): string {
    let cheminAChercher = [...chemin]
    let response = dictionnaire.get(cheminAChercher.shift())
    cheminAChercher.forEach((cle) => {
      response = response.get(cle)
    })
    return response.get("titre")
  }

  function estDansLaListe(code: string) {
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

<div class="relative flex flex-row items-center text-sm text-gray-600 bg-gray-400 ml-{compteurImbrication * 2}">
  <div class="flex-1 hover:bg-coopmaths-lightest cursor-pointer">
    <div class="ml-[3px] pl-2 bg-gray-200 hover:bg-gray-100 flex-1">
      <span class="font-bold">{exo.code} - </span>{nomExo([...chemin, exo.id])}
    </div>
  </div>
  {#if estDansLaListe(exo.code)}
    <div class="absolute -left-4"><i class="text-coopmaths-lightest bx bxs-tag rotate-180" /></div>
  {/if}
</div>
