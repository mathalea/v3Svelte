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
