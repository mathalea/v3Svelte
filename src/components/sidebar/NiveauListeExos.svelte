<script lang="ts">
  import { slide } from "svelte/transition"
  import EntreeListeExos from "./EntreeListeExos.svelte"

  export let expanded: boolean = false
  export let levelTitle: string
  export let items: any
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

  import themesList from "../../dicos/levelsThemesList.json"
  const themes = toMap(themesList)
  /**
   * Recherche dans la liste des thèmes si le thème est référencé
   * et si oui, renvoie son intitulé
   * @param {string} themeCode code du thème
   * @return {string} intitulédu thème
   * @author sylvain chambon
   */
  function themeTitle(themeCode: string) {
    if (themes.has(themeCode)) {
      return [" : ", themes.get(themeCode).get("titre")].join("")
    } else {
      return ""
    }
  }

  /**
   * Basculer le flag pour l'affichage du contenu
   */
  function toggleContent() {
    expanded = !expanded
  }
</script>

<!-- 
  @component
  Écrire la liste des exercices disponibles 
  à partir des entrées de l'arbre du référentiel 
  convertion du fichier `referentiel2022.json`.

  Paramètres :
  - **expanded** : booléen indiquant si le contenu du niveau est affiché ou pas
  - **levelTitle** : titre du niveau
  - **items** : entrées du contenu du niveau
  - **pathToThisNode** : chemin amenant à ce niveau
  - **nestedLevelCount** : compteur pour connaître le nombre d'imbrication (utilisé pour l'indentation de la ligne)
 -->
<div
  class="flex flex-row items-center justify-between {expanded
    ? 'bg-gray-300'
    : 'bg-gray-200'} font-bold text-coopmaths  hover:bg-gray-100 hover:text-coopmaths-light cursor-pointer pl-{nestedLevelCount * 2}"
  on:click={toggleContent}
>
  <div class="text-base ">{levelTitle} <span class="font-normal">{themeTitle(levelTitle)}</span></div>
  <i class=" text-xl bg-transparent bx {expanded ? 'bx-plus rotate-[225deg]' : 'bx-plus'} transition-transform duration-500 ease-in-out" />
</div>
{#if expanded}
  <ul transition:slide={{ duration: 500 }}>
    {#each Array.from(items, ([key, obj]) => ({ key, obj })) as item}
      <li>
        {#if typeof item.obj === "string"}
          <EntreeListeExos nestedLevelCount={nestedLevelCount + 1} {pathToThisNode} exo={{ id: item.obj, code: item.key }} />
        {:else}
          <svelte:self nestedLevelCount={nestedLevelCount + 1} pathToThisNode={[...pathToThisNode, item.key]} levelTitle={item.key} items={item.obj} />
        {/if}
      </li>
    {/each}
  </ul>
{/if}
