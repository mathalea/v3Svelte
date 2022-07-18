import renderMathInElement from 'katex/dist/contrib/auto-render.js'
import 'katex/dist/katex.min.css'
import Exercice from './exercices/Exercice.js'
// export type Settings = { sup?: boolean | string | number, sup2?: boolean | string | number, sup3?: boolean | string | number, sup4?: boolean | string | number, nbQuestions?: number, seed?: string }

/**
 * Ensemble de méthodes statiques pourgérer les exercices
 */
export class Mathalea {
  /**
 * Charge un exercice
 * Exemple : const exercice = loadExercice('./exercices/6e/6C10')
 * @param {string} url
 * @returns {Promise<Exercice>} exercice
 */
  static async load (directory /** string */, filename /** string */) /** Promise<Exercice> */ {
    try {
      // L'import dynamique ne peut descendre que d'un niveau, les sous-répertoires de directory ne sont pas pris en compte
      // cf https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#globs-only-go-one-level-deep
      if (directory !== 'exercicesStatiques') {
        const module = await import(`./exercices/${directory}/${filename}.js`)
        const ClasseExercice = module.default
        const exercice /** Promise<Exercice> */= new ClasseExercice()
        ;['titre', 'amcReady', 'amcType', 'interactifType', 'interactifReady'].forEach((p) => {
          if (module[p] !== undefined) exercice[p] = module[p]
        })
        ;(await exercice).id = filename
        return exercice
      } else {
        const exercicePromise /** Exercice */= new Exercice()
        const exercice = await exercicePromise
        if (filename.includes('dnb')) {
          exercice.titre = 'Exercice type DNB'
        }
        if (filename.includes('e3c')) {
          exercice.titre = 'Exercice type E3C'
        }
        if (filename.includes('bac')) {
          exercice.titre = 'Exercice type BAC'
        }
        if (filename.includes('crpe')) {
          exercice.titre = 'Exercice type CRPE'
        }
        const cutFilename = filename.split('_')
        let type, year
        if (filename.includes('dnb') || filename.includes('e3c') || filename.includes('bac')) {
          type = cutFilename[0]
          year = cutFilename[1]
        }
        if (filename.includes('crpe')) {
          type = cutFilename[0]
          year = cutFilename[1].split('-')[0]
        }

        const subDir = `${type}/${year}/tex/png`
        exercice.consigne = `<img src="./src/${directory}/${subDir}/${filename}.png" width="50%"></img>`
        exercice.consigneCorrection = `<img src="./src/${directory}/${subDir}/${filename}_cor.png" width="50%"></img>`
        exercice.typeExercice = 'statique'
        exercice.interactifReady = false
        exercice.nbQuestionsModifiable = false
        return exercice
      }
    } catch (error) {
      console.log(`Chargement de l'exercice ${directory}/${filename} impossible`)
      const exercice = new Exercice()
      exercice.contenu = `<h3>La référence ${directory}/${filename} n'existe pas !</h3>`
      return exercice
    }
  }

  /**
   * Change les paramètres d'un exercice
   * Exemple : changeSettingsExercice(exercice2, { sup: true, nbQuestions: 3 })
   * @param {Promise<Exercice>} promiseExercice
   * @param {Settings }settings
   */
  static async changeSettings (promiseExercice/**  Promise<Exercice> */, settings)/** Promise<void> */ {
    const exercice = await promiseExercice
    if (settings !== undefined) {
      if (settings.sup !== undefined) exercice.sup = settings.sup
      if (settings.sup2 !== undefined) exercice.sup2 = settings.sup2
      if (settings.sup3 !== undefined) exercice.sup3 = settings.sup3
      if (settings.sup4 !== undefined) exercice.sup4 = settings.sup4
      if (settings.nbQuestions !== undefined) exercice.nbQuestions = settings.nbQuestions
      if (settings.seed !== undefined) exercice.seed = settings.seed
    }
  }

  static renderDiv (div/** HTMLDivElement */)/** void */ {
    // KaTeX à remplacer par MathLive ?
    // renderMathInElement(div, {
    //   TeX: {
    //     delimiters: {
    //       display: [['\\(', '\\)']],
    //       inline: [['$', '$']]
    //     }
    //   },
    //   fontsDirectory: '/fonts'
    // })

    renderMathInElement(div, {
      delimiters: [
        { left: '\\[', right: '\\]', display: true },
        { left: '$', right: '$', display: false }
      ],
      preProcess: (chaine) => chaine.replaceAll(String.fromCharCode(160), '\\,'),
      throwOnError: true,
      errorColor: '#CC0000',
      strict: 'warn',
      trust: false
    })
  }

  static updateUrl (listeExercices) {
    const url = new URL(window.location.protocol + '//' + window.location.host + window.location.pathname)
    for (const ex of listeExercices) {
      url.searchParams.append('ex', ex.filename)
      if (ex.nbQuestions !== undefined) url.searchParams.append('n', ex.nbQuestions)
      if (ex.sup !== undefined) url.searchParams.append('s', ex.sup)
      if (ex.sup2 !== undefined) url.searchParams.append('s2', ex.sup2)
      if (ex.sup3 !== undefined) url.searchParams.append('s3', ex.sup3)
      if (ex.sup4 !== undefined) url.searchParams.append('s4', ex.sup4)
    }
    window.history.pushState({}, '', url)
  }
}
