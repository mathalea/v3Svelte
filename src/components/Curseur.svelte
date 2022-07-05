<script lang="ts">
  export let titre: string
  export let montant: number
  export let nom: string
  export let identifiant: string
  export let max: number
</script>

<div class="flex flex-row justify-start items-center space-x-2">
  <div class="w-3/12">{montant} {montant > 1 ? "nombres " : "nombre "}</div>
  <label class="w-5/12" for={nom}>{titre.toLowerCase()}</label>
  <input class="form-range w-4/12 h-2 bg-transparent text-coopmaths cursor-pointer" type="range" step="1" {max} min="0" name={nom} id={identifiant} bind:value={montant} />
</div>
