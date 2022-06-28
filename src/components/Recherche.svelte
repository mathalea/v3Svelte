<script lang="ts">
    import Modal from './Modal.svelte'
    let showModal = false

    let ctrlDown = false;
    let commandDown = false;
    let kDown = false;

    function on_key_down(event) {
        console.log(event.key)
        if (event.repeat) return;
        switch (event.key) {
            case "Control":
                ctrlDown = true;
                event.preventDefault();
                break;
            case "Meta":
                commandDown = true;
                event.preventDefault();
                break;
            case "k":
                kDown = true;
                event.preventDefault();
                break;
            case "K":
                kDown = true;
                event.preventDefault();
                break;
        }
        if ((ctrlDown && kDown) || (commandDown && kDown)) showModal = true
    }

    function on_key_up(event) {
        switch (event.key) {
            case "Control":
                ctrlDown = false;
                event.preventDefault();
                break;
            case "Meta":
                commandDown = false;
                event.preventDefault();
                break;
            case "k":
                kDown = false;
                event.preventDefault();
                break;
            case "K":
                kDown = false;
                event.preventDefault();
                break;
        }
    }
</script>

<svelte:window on:keydown={on_key_down} on:keyup={on_key_up}/>

<button
    type="button"
    on:click="{() => (showModal = true)}"
    class="ml-auto mr-auto hidden sm:flex items-center w-80 text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700"
    ><svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-none text-slate-300 dark:text-slate-400" aria-hidden="true"><path d="m19 19-3.5-3.5"></path><circle cx="11" cy="11" r="6"></circle></svg><span
        class="flex-auto">Recherche d'exercices...</span
    ><kbd class="font-sans font-semibold dark:text-slate-500"><abbr title="Command" class="no-underline text-slate-300 dark:text-slate-500">⌘</abbr> K</kbd></button
>


{#if showModal}
    <Modal on:close="{() => (showModal = false)}">
        <h2 slot="header">
           Liste des exercices
        </h2>

        <ol>
            <li>6C10 - Calculer...</li>
            <li>6C10 - Calculer...</li>
            <li>6C10 - Calculer...</li>
            <li>6C10 - Calculer...</li>
            <li>6C10 - Calculer...</li>
            <li>6C10 - Calculer...</li>
            <li>6C10 - Calculer...</li>
        </ol>

    </Modal>
{/if}
