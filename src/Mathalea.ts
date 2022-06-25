import { renderMathInElement } from 'mathlive'
import Exercice from './exercices/ExerciceTs'

export type Settings = { sup?: boolean | string | number, sup2?: boolean | string | number, sup3?: boolean | string | number, sup4?: boolean | string | number, nbQuestions?: number, seed?: string }

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
  static async load (directory: string, filename: string): Promise<Exercice> {
    try {
      // L'import dynamique ne peut descendre que d'un niveau, les sous-répertoires de directory ne sont pas pris en compte
      // cf https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#globs-only-go-one-level-deep
      const module = await import(`./exercices/${directory}/${filename}.js`)
      const exercice: Promise<Exercice> = new module.default()
      return exercice
    } catch (error) {
      console.log(`Chargement de l\'exercice ${directory}/${filename} impossible`)
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
  static async changeSettings (promiseExercice: Promise<Exercice>, settings?: Settings): Promise<void> {
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

  static renderDiv (div: HTMLDivElement): void {
    // Si on veut remplacer MathLive par KaTeX, il suffira de le modifier ici
    renderMathInElement(div, {
      TeX: {
        delimiters: {
          display: [['\\(', '\\)']],
          inline: [['$', '$']]
        }
      },
      fontsDirectory: '/fonts'
    })
  }
}
