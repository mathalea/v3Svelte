import { mathalea2d, texteParPosition } from '../../../modules/2d.js'
import Pyramide from '../../../modules/pyramide.js'
import Exercice from '../../Exercice.js'
export const titre = 'Pyramide multiplicative'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '09/05/2022'
/*!
 * @author  Jean-Claude Lhote
 *
 *
 */
export const uuid = 'ffdb1'
export const ref = 'can6C33'
export default function PyramideMul3Etages () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.typeExercice = 'simple'
  this.tailleDiaporama = 2
  this.nouvelleVersion = () => {
    const pyr = new Pyramide({ operation: '*', nombreEtages: 3, rangeData: [2, 5], exclusions: [0] })
    pyr.isVisible = [[false], [false, false], [true, true, true]]
    this.question = `Chaque case contient le produit des deux cases sur lesquelles elle repose. Quel est le nombre qui correspond à * ?<br>
    ${mathalea2d({ xmin: 0, ymin: 0, xmax: 12, ymax: 3.5 }, pyr.representeMoi(0, 0), texteParPosition('*', 6, 2.5))}`
    this.reponse = pyr.valeurs[0][0]
    pyr.isVisible = [[true], [true, true], [true, true, true]]
    this.correction = `Le nombre qui se trouve au sommet de la pyramide est : ${this.reponse}<br>
    ${mathalea2d({ xmin: 0, ymin: 0, xmax: 12, ymax: 3.5 }, pyr.representeMoi(0, 0))}`
  }
}
