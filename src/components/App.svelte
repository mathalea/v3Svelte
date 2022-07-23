<script lang="ts">
  import { flip } from "svelte/animate"
  import Exercice from "./exercice/Exercice.svelte"
  import NavBar from "./header/NavBar.svelte"
  import Footer from "./Footer.svelte"
  import Header2 from "./header2/Header2.svelte"
  import { listeExercices } from "./store"
  import Recherche from "./Recherche.svelte"
  import NiveauListeExos from "./sidebar/NiveauListeExos.svelte"
  import SearchChoiceOptionsRadio from "./sidebar/SearchChoiceOptionsRadio.svelte"
  import codeList from "../dicos/codeToLevelList.json"
  import referentiel from "../dicos/referentiel2022.json"
  import { Mathalea } from "../Mathalea"
  import { onMount } from "svelte"


  // ToFix fonction à lier avec bugsnag
  window.notify = (arg) => console.log(arg)


  let isInitialUrlHandled = false
  // Récupération des informations de l'URL
  onMount(() => {
    Mathalea.loadExercicesFromUrl()
    isInitialUrlHandled = true
  })

  // Mise à jour de l'URL dès que l'on change listeExercices (sauf pour l'URL d'arrivée sur la page)
  $: {
    if (isInitialUrlHandled) Mathalea.updateUrl($listeExercices)
  }

  /**
   * Transforme un objet en arbre basé sur un type Map.
   * Chaque propriété devient une clé et la valeur correspondante devient :
   * - soit une valeur si la valeur de la propriété est un tableau
   * - soit une autre map dans le cas contraire
   * @param {any} obj
   * @return {Map} l'arbre correspondant à l'objet
   * @author sylvain Chambon
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

  let refTree: Map = toMap(referentiel)
  // ToFix je réordonne le Map pour créer un menu dans l'ordre souhaité
  const refc3 = refTree.get('c3')
  const ref6e = refTree.get('6e')
  const ref5e = refTree.get('5e')
  const ref4e = refTree.get('4e')
  const ref3e = refTree.get('3e')
  const ref2e = refTree.get('2e')
  const ref1e = refTree.get('1e')
  const refPe = refTree.get('PE')
  refTree = new Map()
  refTree.set('c3', refc3)
  refTree.set('6e', ref6e)
  refTree.set('5e', ref5e)
  refTree.set('4e', ref4e)
  refTree.set('3e', ref3e)
  refTree.set('2e', ref2e)
  refTree.set('1e', ref1e)
  refTree.set('PE', refPe)
  /**
   * Retrouve le titre d'un niveau basé sur son
   * @param levelId
   */
  function codeToLevelTitle(code: string) {
    if (codeList[code]) {
      return codeList[code]
    } else {
      return code
    }
  }

  /*---------------------------------------------------------------------
    Gestion du menu de recherche des exercices
  ---------------------------------------------------------------------*/
  let nbExercisesInList: number
  let sideMenuVisible: boolean = false
  $: {
    nbExercisesInList = $listeExercices.length
    if (nbExercisesInList === 0) {
      sideMenuVisible = true
    }
  }
  const searchOptions = [
    {
      value: "list",
      label: "Liste",
    },
    {
      value: "theme",
      label: "Themes",
    },
  ]
  let searchOption
  function handleSideMenu(event: CustomEvent) {
    sideMenuVisible = event.detail.isListVisible
  }
  function toggleSearchType(e) {
    console.log(e.value)
  }
</script>

<div class="h-screen  scrollbar-hide">
  <!-- <Header /> -->
  <NavBar />
  <Header2 {sideMenuVisible} on:sideMenuChange={handleSideMenu} />
  <main class="flex h-full">
    <!-- side menu -->
    {#if sideMenuVisible || nbExercisesInList === 0}
      <aside class="flex flex-col bg-gray-200 w-1/3 p-4  overflow-hidden h-full transition-width transition-slowest ease duration-500">
        <div class="flex-none block overflow-y-scroll overscroll-auto h-full">
          <h2 class="inline-flex items-center font-bold text-xl mb-6">
            <span>Choix des exercices</span>
            <SearchChoiceOptionsRadio options={searchOptions} bind:userSelected={searchOption} />
          </h2>
          {#if searchOption === "list"}
            <ul>
              {#each Array.from(refTree, ([key, obj]) => ({ key, obj })) as item}
                <li>
                  <NiveauListeExos nestedLevelCount={1} pathToThisNode={[item.key]} levelTitle={codeToLevelTitle(item.key)} items={item.obj} />
                </li>
              {/each}
            </ul>
          {:else}
            <Recherche />
          {/if}
        </div>
      </aside>
      <!-- split line -->
      <div class="flex w-1 bg-coopmaths-light hover:bg-coopmaths-lightest" />
    {/if}
    <!-- content -->
    <div class="flex-1 flex flex-col p-6 overflow-hidden h-full">
      <div class="flex-1 overflow-y-scroll overscroll-auto">
        {#each $listeExercices as exercice, i (exercice)}
          <div animate:flip={{ duration: (d) => 30 * Math.sqrt(d) }}>
            <Exercice {...exercice} indiceExercice={i} indiceLastExercice={$listeExercices.length} />
          </div>
        {/each}
      </div>
    </div>
  </main>
  <!-- Modals ne sont pas utilisés pour le moment
  <Modals>
    <div slot="backdrop" class="backdrop" on:click={closeModal} />
  </Modals> -->
  <Footer />
</div>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  /* .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  } */
</style>
