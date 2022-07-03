import { addElement, get, setStyles } from '../modules/dom'
import type Exercice from '../exercices/ExerciceTs'
import { verifQuestionMathLive } from './mathLive'
import { verifQuestionQcm } from './qcm'
import { verifQuestionListeDeroulante } from './questionListeDeroulante'

export function exerciceInteractif (exercice: Exercice, divScore: HTMLDivElement, buttonScore: HTMLButtonElement) {
  if (exercice.interactifType === 'mathLive') verifExerciceMathLive(exercice, divScore, buttonScore)
  if (exercice.interactifType === 'qcm') verifExerciceQcm(exercice, divScore, buttonScore)
  if (exercice.interactifType === 'listeDeroulante')verifExerciceListeDeroulante(exercice, divScore, buttonScore)
  //   if (exercice.interactifType === 'cliqueFigure')exerciceCliqueFigure(exercice)
  if (exercice.interactifType === 'custom') verifExerciceCustom(exercice, divScore, buttonScore)
//   // Pour les exercices de type custom, on appelle la méthode correctionInteractive() définie dans l'exercice
//   if (exercice.interactifType === undefined) exerciceNonInteractif(exercice)
}

function verifExerciceMathLive (exercice: Exercice, divScore: HTMLDivElement, divButton: HTMLButtonElement) {
  let nbBonnesReponses = 0
  let nbMauvaisesReponses = 0
  const besoinDe2eEssai = false
  let resultat
  for (const i in exercice.autoCorrection) {
    resultat = verifQuestionMathLive(exercice, i)
    if (resultat === 'OK') {
      nbBonnesReponses++
    } else {
      nbMauvaisesReponses++ // Il reste à gérer le 2e essai
    }
  }
  if (!besoinDe2eEssai) {
    afficheScore(exercice, nbBonnesReponses, nbMauvaisesReponses, divScore, divButton)
  }
}

function verifExerciceQcm (exercice: Exercice, divScore: HTMLDivElement, divButton: HTMLButtonElement) {
  // On vérifie le type si jamais il a été changé après la création du listenner (voir 5R20)
  let nbQuestionsValidees = 0
  let nbQuestionsNonValidees = 0
  for (let i = 0; i < exercice.autoCorrection.length; i++) {
    const resultat = verifQuestionQcm(exercice, i)
    resultat === 'OK' ? nbQuestionsValidees++ : nbQuestionsNonValidees++
  }
  const uichecks = document.querySelectorAll(`.ui.checkbox.ex${exercice.numeroExercice}`)
  uichecks.forEach(function (uicheck) {
    uicheck.classList.add('read-only')
  })
  afficheScore(exercice, nbQuestionsValidees, nbQuestionsNonValidees, divScore, divButton)
}

function verifExerciceListeDeroulante (exercice: Exercice, divScore: HTMLDivElement, divButton: HTMLButtonElement) {
  let nbQuestionsValidees = 0
  let nbQuestionsNonValidees = 0
  const uiselects = document.querySelectorAll(`.ui.dropdown.ex${exercice.numeroExercice}`)
  uiselects.forEach(function (uiselect) {
    uiselect.classList.add('disabled')
  })
  for (let i = 0; i < exercice.nbQuestions; i++) {
    const resultat = verifQuestionListeDeroulante(exercice, i)
    resultat === 'OK' ? nbQuestionsValidees++ : nbQuestionsNonValidees++
  }
  afficheScore(exercice, nbQuestionsValidees, nbQuestionsNonValidees, divScore, divButton)
}

function verifExerciceCustom (exercice: Exercice, divScore: HTMLDivElement, buttonScore: HTMLButtonElement) {
  let nbBonnesReponses = 0
  let nbMauvaisesReponses = 0
  // Le get est non strict car on sait que l'élément n'existe pas à la première itération de l'exercice
  let eltFeedback = get(`feedbackEx${exercice.numeroExercice}`, false)
  // On ajoute le div pour le feedback
  if (!eltFeedback) {
    const eltExercice = get(`exercice${exercice.numeroExercice}`)
    eltFeedback = addElement(eltExercice, 'div', { id: `feedbackEx${exercice.numeroExercice}` })
  }
  setStyles(eltFeedback, 'marginBottom: 20px')
  if (eltFeedback) eltFeedback.innerHTML = ''
  // On utilise la correction définie dans l'exercice
  console.log(buttonScore, eltFeedback, exercice.exoCustomResultat)
  if (exercice.exoCustomResultat) {
    for (let i = 0; i < exercice.nbQuestions; i++) {
      exercice.correctionInteractive(i) === 'OK' ? nbBonnesReponses++ : nbMauvaisesReponses++
    }
    afficheScore(exercice, nbBonnesReponses, nbMauvaisesReponses, divScore, buttonScore)
  } else {
    for (let i = 0; i < exercice.nbQuestions; i++) {
      exercice.correctionInteractive(i) === 'OK' ? nbBonnesReponses++ : nbMauvaisesReponses++
    }
    afficheScore(exercice, nbBonnesReponses, nbMauvaisesReponses, divScore, buttonScore)
  }
}

function afficheScore (exercice: Exercice, nbBonnesReponses: number, nbMauvaisesReponses: number, divScore: HTMLDivElement, divButton: HTMLButtonElement) {
  divButton.classList.add('cursor-not-allowed', 'opacity-50', 'pointer-events-none')
  divScore.innerHTML = `${nbBonnesReponses} / ${nbBonnesReponses + nbMauvaisesReponses}`
  divScore.style.color = '#f15929'
  divScore.style.fontWeight = 'bold'
  divScore.style.fontSize = 'x-large'
  divScore.style.display = 'inline'
}
