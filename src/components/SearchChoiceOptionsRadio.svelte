<script lang="ts">
  export let options
  export let userSelected = options[0].value
</script>

<!--
    @component
    Groupe de boutons radio

    [Inspiration](https://svelte.dev/repl/a1c9e4be23d746ddba6b7d62d4aad875?version=3.35.0)

    Paramètres :
    - **options** : tableaux des objets {value: "...", label:"..."} 
    correspondant aux différentes options possibles venant du parent
    - **userSelected** : choix de l'utilisateurrenvoyé au parent
    
 -->
<div role="radiogroup" class="ml-8 inline-flex items-center space-x-3">
  {#each options as { value, label }}
    <div class="inline-flex space-x-1 items-center">
      <input class="form-radio text-coopmaths-light text-xs cursor-pointer w-3 h-3" id={label.toLowerCase()} type="radio" bind:group={userSelected} {value} />
      <label for={label.toLowerCase()} class="flex-1 ml-1 text-sm font-normal">{label}</label>
    </div>
  {/each}
</div>
