import { verifQuestionMathLive } from './mathLive';
import { verifQuestionQcm } from './qcm';
export function exerciceInteractif(exercice, divScore, buttonScore) {
    if (exercice.interactifType === 'mathLive')
        verifExerciceMathLive(exercice, divScore, buttonScore);
    if (exercice.interactifType === 'qcm')
        verifExerciceQcm(exercice, divScore, buttonScore);
    //   if (exercice.interactifType === 'listeDeroulante')exerciceListeDeroulante(exercice)
    //   if (exercice.interactifType === 'cliqueFigure')exerciceCliqueFigure(exercice)
    //   if (exercice.interactifType === 'custom') exerciceCustom(exercice)
    //   // Pour les exercices de type custom, on appelle la méthode correctionInteractive() définie dans l'exercice
    //   if (exercice.interactifType === undefined) exerciceNonInteractif(exercice)
}
function verifExerciceMathLive(exercice, divScore, divButton) {
    let nbBonnesReponses = 0;
    let nbMauvaisesReponses = 0;
    const besoinDe2eEssai = false;
    let resultat;
    for (const i in exercice.autoCorrection) {
        resultat = verifQuestionMathLive(exercice, i);
        if (resultat === 'OK') {
            nbBonnesReponses++;
        }
        else {
            nbMauvaisesReponses++; // Il reste à gérer le 2e essai
        }
    }
    if (!besoinDe2eEssai) {
        afficheScore(exercice, nbBonnesReponses, nbMauvaisesReponses, divScore, divButton);
    }
}
function verifExerciceQcm(exercice, divScore, divButton) {
    // On active les checkbox
    // $('.ui.checkbox').checkbox()
    // On vérifie le type si jamais il a été changé après la création du listenner (voir 5R20)
    let nbQuestionsValidees = 0;
    let nbQuestionsNonValidees = 0;
    for (let i = 0; i < exercice.autoCorrection.length; i++) {
        const resultat = verifQuestionQcm(exercice, i);
        resultat === 'OK' ? nbQuestionsValidees++ : nbQuestionsNonValidees++;
    }
    const uichecks = document.querySelectorAll(`.ui.checkbox.ex${exercice.numeroExercice}`);
    uichecks.forEach(function (uicheck) {
        uicheck.classList.add('read-only');
    });
    afficheScore(exercice, nbQuestionsValidees, nbQuestionsNonValidees, divScore, divButton);
}
function afficheScore(exercice, nbBonnesReponses, nbMauvaisesReponses, divScore, divButton) {
    divButton.classList.add('cursor-not-allowed', 'opacity-50', 'pointer-events-none');
    divScore.innerHTML = `${nbBonnesReponses} / ${nbBonnesReponses + nbMauvaisesReponses}`;
    divScore.style.color = '#f15929';
    divScore.style.fontWeight = 'bold';
    divScore.style.fontSize = 'x-large';
    divScore.style.display = 'inline';
}
//# sourceMappingURL=interactif.js.map