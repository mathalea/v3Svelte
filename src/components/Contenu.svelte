<script lang="ts">
  import Consigne from "./Consigne.svelte"
  import Liste from "./Liste.svelte"
  export let chapeau: string
  export let entrees: string[]
</script>

<article class="text-2xl md:text-base">
  <!-- Consigne -->
  <Consigne consigne={chapeau} />
  <!-- Liste des questions -->
  <Liste liste={entrees} />
</article>

<style></style>
