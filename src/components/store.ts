import { writable } from "svelte/store"
import type Exercice from "../exercices/ExerciceTs"

export const listeExercices = writable([])

export function moveExercice(liste: Exercice[], iDepart: number, iArrivee: number): Exercice[] {
  liste.splice(iArrivee, 0, liste.splice(iDepart, 1)[0])
  return liste
}
