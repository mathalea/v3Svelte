import { writable } from 'svelte/store';
export const listeExercices = writable([]);
export function moveExercice(liste, iDepart, iArrivee) {
    liste.splice(iArrivee, 0, liste.splice(iDepart, 1)[0]);
    return liste;
}
//# sourceMappingURL=store.js.map