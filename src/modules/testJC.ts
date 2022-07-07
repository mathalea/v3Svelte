import type { Fraction } from 'mathjs'
import type  { ObjetMathalea2D }  from './2d.js'
interface FractionX {
    constructor(any): FractionX
   num: number
   den: number
    type: string
numIrred: number
denIrred: number
pourcentage: number
sign:  number
singeString: string
texFraction: string
texFractionSR: string
texFSD: string
texFractionSignee: string
texFSP: string
texParentheses: string
texFractionSimplifiee: string
ecritureAlgebrique: string
ecritureParentheseSiNegatif: string
valeurDecimale: number
estEntiere: boolean
estParfaite: boolean
estIrreductible: boolean
toLatex(): string
sommeFractions(...FractionX): FractionX
simplifie(): FractionX
toFraction(): Fraction
valeurAbsolue(): FractionX
oppose (): FractionX
reduire (k:number): FractionX
isEqual (f2: FractionX): boolean
differenceFraction (f:FractionX):FractionX
multiplieEntier (n:number): FractionX
entierDivise (n:number):FractionX
ajouteEntier (n:number): FractionX
entierMoinsFraction (n:number): FractionX
superieurLarge (f2:FractionX):boolean
superieurstrict (f2:FractionX):boolean
inferieurstrict (f2:FractionX):boolean
inferieurlarge (f2:FractionX):boolean
estUneSimplification (f2:FractionX):boolean
sommeFraction (f2:FractionX):FractionX
produitFraction (f2:FractionX):FractionX
produitFractions (...FractionX): FractionX
texProduitFraction (f2:FractionX): string
puissanceFraction (n:number): FractionX
inverse (): FractionX | number
diviseFraction (f2:FractionX): FractionX
diviseEntier (n:FractionX): FractionX
texQuotientFraction (f2:FractionX): string
texSimplificationAvecEtapes (): string
fractionDecimale (): FractionX | number
texRacineCarree (detaillee: boolean): string
racineCarree (): FractionX
representationIrred (x: number, y: number, rayon:number, depart: number, type:string, couleur:string, unite0:number, unite1:number, scale:number, label:string): ObjetMathalea2D[]
representation (x: number, y: number, rayon:number, depart: number, type:string, couleur:string, unite0:number, unite1:number, scale:number, label:string): ObjetMathalea2D[]
texArrayReponsesCoupleDeFractionsEgalesEtSimplifiees (n1: number, d1:number, n2:number, d2:number): string[]
texArrayReponsesFractionsEgalesEtSimplifiees (n: number, d:number) : string[]
texArrayReponsesCoupleDeFractions (n1:number, d1:number, n2:number, d2:number, egalesEtSimplifiees:boolean): string[]
texArrayReponsesFraction (numerateur:number, denominateur:number): string[]
listerFractionsSimplifiees (n:number, d:number): number[][]
}
