import TableauxEtPourcentages from './_Tableaux_et_pourcentages.js'

export const titre = 'Tableaux et pourcentages - prix constant'

/**
 * * Tableaux et pourcentages prix constant
 * * numéro de l'exo ex : 5N11-1 fils de 5N11-pere
 * * publication initiale le 25/11/2020
 * @author Sébastien Lozano
 */

export const uuid = '8c4b1'
export const ref = '5N11-1'
export default function TableauxEtPourcentagesPrixConstant () {
  this.exo = '5N11-1'
  this.titre = titre
  TableauxEtPourcentages.call(this)
};
