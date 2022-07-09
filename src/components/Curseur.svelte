<script lang="ts">
  export let titre: string
  export let montant: number
  export let nom: string
  export let identifiant: string
  export let max: number
</script>

<div class="flex flex-row justify-start items-center space-x-2">
  <input class="w-1/4 h-2 bg-transparent text-coopmaths cursor-pointer" type="range" step="1" {max} min="0" name={nom} id={identifiant} bind:value={montant} />
  <label class="w-3/4 text-sm" for={nom}>{titre} ({montant})</label>
</div>
