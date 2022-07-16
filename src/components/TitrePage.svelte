<script lang="ts">
  import InputListeExercices from "./InputListeExercices.svelte"
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()
  const dispatch2 = createEventDispatcher()
  export let sideMenuVisible: boolean
  let isListVisible: boolean
  let searchChoice = "liste"
  function toggleSideList() {
    isListVisible = !sideMenuVisible
    dispatch("sideMenuChange", {
      isListVisible,
    })
  }
  function toggleSearchType() {
    dispatch2("searchTypeChange", {
      searchChoice,
    })
  }
</script>

<h1 class="py-2 px-6 text-white text-2xl font-bold  bg-coopmaths-light flex items-center">
  <span>Choix des exercices</span>
  <div class="ml-8">
    <form action="">
      <fieldset class="flex flex-col justify-start text-xs">
        <div class="flex-1 inline-flex items-centers">
          <input
            class="form-radio text-coopmaths-light text-xs cursor-pointer w-3 h-3"
            id="searchChoice1"
            type="radio"
            name="searchChoice"
            bind:group={searchChoice}
            value="liste"
            on:change={toggleSearchType}
          />
          <label for="searchChoice1" class="flex-1 ml-1">Liste</label>
        </div>
        <div class="flex-1 inline-flex items-centers">
          <input
            class="form-radio text-coopmaths-light  text-xs cursor-pointer w-3 h-3"
            id="searchChoice2"
            type="radio"
            name="searchChoice"
            bind:group={searchChoice}
            value="themes"
            on:change={toggleSearchType}
          />
          <label for="searchChoice2" class="flex-1 ml-1">Thèmes</label>
        </div>
      </fieldset>
    </form>
  </div>
  <button type="button" on:click={toggleSideList}><i class="bx bx-search-alt-2 ml-2" /></button>
  <div class="text-gray-700 font-normal ml-8">
    <InputListeExercices />
  </div>
</h1>
