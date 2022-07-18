# Journal des installations, setup, etc.

## Erreurs de `tsconfig.json`

AJout des lignes

```json
"outDir": "./built",
```

et

```json
"exclude": ["./built/**/*"],
```

## Installation de `tailwindcss`

IL y a juste à faire ce qui suit et tout s'installe là où il faut

```bash
npx svelte-add@latest tailwindcss
pnpm install
```

## Configuration de ESLint dans VS Code pour Svelte

Installation de **eslint** et du plugin eslint pour svelte3

```bash
pnpm install --save-dev eslint-plugin-svelte3
```

Puis j'ai suivi ces [instructions](https://kimxilxyong.medium.com/i-gathered-all-the-info-needed-to-setup-eslint-in-vs-code-for-svelte-in-2021-7f1cd2516564)

j'ai un fichier `.eslintrc.json` qui ressemble à ça :

```json
{
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "parserOptions": {
    "ecmaVersion": 9,
    "ecmaFeatures": {
      "impliedStrict": true
    },
    "sourceType": "module"
  },
  "plugins": ["svelte3"],
  "overrides": [
    {
      "files": ["*.svelte"],
      "processor": "svelte3/svelte3"
    }
  ],
  "rules": {
    "semi": "error",
    "no-console": 0
  },
  "extends": "eslint:recommended"
}
```

et un fichier `settings.json` de VS Codium qui ressemble à ça :

```json
{
  "workbench.colorTheme": "Default Dark+",
  // added 2022-01-22 for ESLint
  "eslint.format.enable": true,
  // "editor.codeActionsOnSave": {
  //     "source.fixAll.eslint": true
  // },
  "codestream.email": "chambon.sylvain@gmail.com",
  // added 2022-02-16 for Qasar (from website)
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  "javascript.format.placeOpenBraceOnNewLineForControlBlocks": false,
  "javascript.format.placeOpenBraceOnNewLineForFunctions": false,
  "typescript.format.insertSpaceBeforeFunctionParenthesis": true,
  "typescript.format.placeOpenBraceOnNewLineForControlBlocks": false,
  "typescript.format.placeOpenBraceOnNewLineForFunctions": false,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "vetur.format.defaultFormatter.html": "prettyhtml",
  "vetur.format.defaultFormatter.js": "prettier-eslint",
  "workbench.iconTheme": "vscode-icons",
  "markdown.extension.preview.autoShowPreviewToSide": true,
  "window.zoomLevel": 1,
  "svelte.enable-ts-plugin": true,
  "emmet.includeLanguages": {
    "postcss": "css"
  },
  // ESlint for VS Code extension
  "eslint.options": {
    "ecmaVersion": 9,
    "max-len": [
      {
        "code": 450,
        "tabWidth": 2,
        "ignoreUrls": true
      }
    ],
    "ecmaFeatures": {
      "modules": true,
      "spread": true,
      "restParams": true
    }
  },
  "eslint.validate": ["svelte", "javascript", "css"],
  "eslint.probe": ["svelte", "javascript", "css"],
  "eslint.codeAction.showDocumentation": {
    "enable": true
  },

  // Svelte for VS Code extension
  "svelte-intellisense.trace.server": "verbose",
  "svelte.plugin.svelte.format.enable": true,
  "svelte.plugin.svelte.format.config.svelteSortOrder": "options-markup-styles-scripts",
  "svelte.plugin.css.completions.enable": true,
  "svelte.plugin.css.diagnostics.enable": true,
  "svelte.plugin.svelte.diagnostics.enable": true,
  "svelte.plugin.typescript.diagnostics.enable": false,
  "[svelte]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "svelte.svelte-vscode",
    "editor.formatOnPaste": true,
    "editor.formatOnType": true
  }
}
```

## Svelte

### Passer un paramètre à une fonction

```javascript
on:curseurNotif={submitOnSliderChange("formText1"}         // don't work
on:curseurNotif={() => submitOnSliderChange("formText1")}  // works
```

## Bouts de code non utilisés

Construire une liste où le contenu est récupéré de manière asynchrone

```html
<!-- construireListeExos est asynchrone -->
{#await construireListeExos()} Loading {:then entrees}
<ul>
  {#each Array.from(entrees, ([cle, obj]) => ({ cle, obj })) as entree}
  <li>{entree.cle}</li>
  <ul class="ml-2">
    {#each Array.from(entree.obj, ([cle, obj]) => ({ cle, obj })) as sousEntree}
    <li>{sousEntree.cle}</li>
    {/each}
  </ul>
  {/each}
</ul>
{/await}
```

et la fonction :

```js
async function construireListeExos() {
  let dico: Map
  try {
    const reponse = await import("../dicos/exosDispo.json")
    dico = toMap(reponse)
    return dico.get("default")
  } catch (error) {
    console.error(`Impossible de récupérer les listes : ${error}`)
  }
}
```

```js
/**
   * Tester si un exercice est bien dans la liste des exercices sélectionnés
   * (sur la base de la `listeExercices` présente dans le store)
   * @param code nom de l'exercice (par exemple "6N11-5")
   * @return `true` si le fichier est bien dans la liste (`false` sinon)
   * @author sylvain chambon
   */
  function isPartOfSelectedExercises(code: string) {
    let liste = get(listeExercices)
    let reponse = false
    liste.forEach((exo) => {
      if (code === exo.id) {
        reponse = true
      }
    })
    return reponse
  }
```