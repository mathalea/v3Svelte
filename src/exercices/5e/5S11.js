import LectureDiagrammeBarre from '../6e/6S10.js'
export const titre = 'Lire un diagramme en barre'

export { interactifReady, interactifType } from '../6e/6S10.js'
export { amcReady, amcType } from '../6e/6S10.js'

/**
 * Lire un diagramme en barre
 * @author Guillaume Valmont
 * reference 5S11
 * Publié le 08/08/2021
 * Fix export interactif et AMC Sébastien LOZANO
 */
export const uuid = '8ed97'
export const ref = '5S11'
export default function LectureDiagrammeBarre5e () {
  LectureDiagrammeBarre.call(this)
  // this.titre = titre
  this.sup = 3
  this.sup2 = 2
}
