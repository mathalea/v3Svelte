<script lang="ts">
  import { boolean } from "mathjs"

  export let entrees: string[]
  export let isMenuOpen: boolean
  export let titre: string
  export let isNavBarVisible: boolean
  function closeMenu() {
    isMenuOpen = false
    isNavBarVisible = false
  }
</script>

<div class="group inline-block lg:relative">
  <button class="bg-coopmaths text-white text-xl font-medium py-2 px-4 inline-flex items-center" on:click={() => (isMenuOpen = !isMenuOpen)}>
    <span class="mr-1">{titre}<i class="ml-2 bx bx-caret-down" /></span>
  </button>
  <ul class="lg:absolute lg:hidden  lg:group-hover:block {isMenuOpen ? 'block' : 'hidden'} text-white pt-1">
    {#each entrees as entree}
      <li class="">
        <a class="bg-coopmaths hover:bg-coopmaths-light py-2 px-4 block whitespace-no-wrap" href={"#"} on:click={closeMenu}>{entree}</a>
      </li>
    {/each}
  </ul>
</div>
