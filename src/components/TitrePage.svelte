<script lang="ts">
  import InputListeExercices from "./InputListeExercices.svelte"
  import Searchbar from "./Searchbar.svelte"
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()
  const dispatch2 = createEventDispatcher()
  export let sideMenuVisible: boolean
  let isListVisible: boolean
  function toggleSideList() {
    isListVisible = !sideMenuVisible
    dispatch("sideMenuChange", {
      isListVisible,
    })
  }
</script>

<h1 class="py-2 px-4 text-white text-2xl font-bold  bg-coopmaths-light flex items-center">
  <button type="button" on:click={toggleSideList}><i class="bx bx-menu-alt-left" /></button>
  <div class="text-gray-700 font-normal ml-8 w-15">
    <Searchbar />
  <!--  <InputListeExercices /> -->
  </div>
</h1>
