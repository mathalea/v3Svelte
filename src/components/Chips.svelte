<script lang="ts">
  import { listeExercices } from "./store"
  export let text = ""
  export let indice: number

  function remove() {
    listeExercices.update((l) => [...l.slice(0, indice), ...l.slice(indice + 1)])
  }
</script>

<div class="inline-flex flex-wrap items-center justify-center rounded-full bg-gray-300 text-gray-500 text-xs px-2 py-1 shadow-sm">
  {text}
  <button class="ml-2 bg-transparent hover focus:outline-none cursor-pointer" on:click={remove}>
    <i class="bx bx-x font-semibold text-base" />
  </button>
</div>
