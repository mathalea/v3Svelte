<script lang="ts">
  import Consigne from "./Consigne.svelte"
  import Liste from "./Liste.svelte"
  export let chapeau: string
  export let entrees: string[]
  export let spacing: number
  export let indiceExercice: number
  export let type: "enonce" | "correction"
</script>

<article class="text-2xl lg:text-base">
  <!-- Consigne -->
  <Consigne consigne={chapeau} />
  <!-- Liste des questions -->
  <Liste liste={entrees} {spacing} {indiceExercice} {type} />
</article>

<style></style>
