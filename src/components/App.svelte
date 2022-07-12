<script lang="ts">
  import { flip } from "svelte/animate"
  import Exercice from "./Exercice.svelte"
  import Header from "./Header.svelte"
  import NavBar from "./NavBar.svelte"
  import Footer from "./Footer.svelte"
  import TitrePage from "./TitrePage.svelte"
  import { listeExercices } from "./store"
  import InputListeExercices from "./InputListeExercices.svelte"
  import Recherche from "./Recherche.svelte"
  // import { Modals, closeModal } from "svelte-modals"
  const dico = {
    "1e": {
      "1AN": {
        "29311": {
          titre: "Dérivée d'une composée affine",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "58718": {
          titre: "Dérivée d'un quotient",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        fdfd3: {
          titre: "Nombre dérivé de fonctions de références",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        d9fd1: {
          titre: "Equation de tangente",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        e1845: {
          titre: "Dérivée d'un produit",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "1E1": {
        "37608": {
          titre: "Calculer le discriminant d'un polynôme du second degré",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "60393": {
          titre: "Lecture graphique d'éléments caractéristiques d'un trinôme",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        f4ca9: {
          titre: "Calcul du discriminant d'une équation du second degré",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "4e906": {
          titre: "Résoudre une équation du second degré",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        dc18b: {
          titre: "Déterminer la forme canonique d'un polynôme du second degré",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        f812e: {
          titre: "Résoudre une équation du second degré à partir de la forme canonique",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        c8fcd: {
          titre: "Résoudre une équation du second degré avec le discriminant.",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        b0404: {
          titre: "Résoudre une équation du second degré",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "92cd4": {
          titre: "Trouver l'équation d'une parabole",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        cf8d9: {
          titre: "Factoriser, si possible, un polynôme du second degré",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "0ea25": {
          titre: "Factoriser un polynôme du second degré avec racines entières",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "01648": {
          titre: "Equation du second degré avec paramètre",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "5bae7": {
          titre: "Résoudre une inéquation du second degré",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "1F1": {
        "0a2a1": {
          titre: "Calculs de dérivées",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "1G1": {
        "51278": {
          titre: "cos et sin associés à un réel x ",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "6155a": {
          titre: "Valeurs remarquables du cosinus et sinus",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        aa7e4: {
          titre: "Mesure principale d'un angle",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "1N1": {
        "82375": {
          titre: "Déterminer les termes d'une suite définie par récurrence",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "3f63f": {
          titre: "Déterminer les termes d'une suite définie de façon explicite",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "1P1": {
        e2941: {
          titre: "Probabilités conditionnelles",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "1F": {
        "9142a": {
          titre: "Déterminer les coordonnées sommet parabole à partir de la forme canonique",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        d77ec: {
          titre: "Déterminer le sens de variation d’un pôlynome du second degré",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "74ab9": {
          titre: "Lire graphiquement le signe de $a$ et de $\\Delta$",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "8fa0b": {
          titre: "Lire graphiquement le signe de $b$ dans $ax^2+bx+c$",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "17f01": {
          titre: "Lire graphiquement les valeurs de $b$ et $c$ avec une parabole",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "37aaf": {
          titre: "Lire graphiquement les valeurs de $a$ et $b$ dans $ax^2+b$",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        acdc4: {
          titre: "Déterminer une équation de l’axe de symétrie d’une parabole",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "1G": {
        "79a7e": {
          titre: "Déterminer les valeurs remarquables du cosinus et sinus",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        c5675: {
          titre: "Déterminer les valeurs remarquables du cosinus et sinus*",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "462e3": {
          titre: "Simplifier les sinus et cosinus des angles associés",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "1L": {
        "17928": {
          titre: "Résoudre une équation du second degré",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        baf2a: {
          titre: "Calculer un discriminant",
          tags: {
            AMC: true,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "0e28b": {
          titre: "Déterminer le nombre de solutions d’une équation du second degré",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        a40ba: {
          titre: "Trouver les racines à partir d’une forme factorisée",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        cfff6: {
          titre: "Résoudre une équation du second degré*",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        cac7d: {
          titre: "Déterminer une forme canonique",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        e5b51: {
          titre: "Déterminer un coefficient dans un développement",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        caf0f: {
          titre: "Déterminer un coefficient dans un développement*",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "1P": {
        "69f8a": {
          titre: "Calculer des probabilités à partir d’un arbre",
          tags: {
            AMC: true,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "1S": {
        "43117": {
          titre: "Donner le résultat d’un programme Python",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "45352": {
          titre: "Calculer la raison d’une suite arithmétique/géométrique*",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        b7b65: {
          titre: "Calculer un terme d’une suite explicite",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        f7a72: {
          titre: "Calculer un terme d’une suite récurrente",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "89bd3": {
          titre: "Calculer un terme d’une suite récurrente*",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "003a5": {
          titre: "Donner la nature d’une suite (formule de récurrence)",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        f7961: {
          titre: "Donner la nature d’une suite (formule explicite)",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "8da71": {
          titre: "Donner la forme explicite d’une suite arithmétique/géométrique",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "6f244": {
          titre: "Calculer la raison d’une suite arithmétique/géométrique",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        f4da9: {
          titre: "Déterminer une relation de récurrence",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "669c6": {
          titre: "Trouver le sens de variation d’une suite (QCM)",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
    },
    "2e": {
      "2F1": {
        cb99e: {
          titre: "Reconnaître une fonction affine.",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        e0e6d: {
          titre: "Lecture graphique d'une fonction affine",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        c7fe0: {
          titre: "Représentation graphique d'une fonction affine",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "04953": {
          titre: "Déterminer une fonction affine à partir de deux images.",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "24fa1": {
          titre: "Déterminer le signe d'une fonction affine",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "796d2": {
          titre: "Déterminer le sens de variation d'une fonction affine",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "53b5f": {
          titre: "Déterminer l'image d'un nombre par une fonction de référence.",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "428c6": {
          titre: "Résoudre algébriquement une équation f(x)=k avec une fonction de référence.",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "2F2": {
        "8d56d": {
          titre: "Montrer qu'un point appartient ou non à une courbe",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "10c25": {
          titre: "Propriétés graphiques de la parité d'une fonction.",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "75a0f": {
          titre: "Étudier la parité d'une fonction",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "2F3": {
        "17439": {
          titre: "Déterminer graphiquement les extremums",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "478de": {
          titre: "Utiliser les variations des fonctions de référence pour comparer des images",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "9de89": {
          titre: "Utiliser les variations des fonctions de référence pour comparer ou encadrer",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "3abd5": {
          titre: "Comparaison d'images dans un tableau de variations",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "33a3c": {
          titre: "Déterminer un extremum ou encadrer par lecture d'un tableau de variations",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "2G1": {
        "3823c": {
          titre: "Déterminer des angles en utilisant les cas d'égalité",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "952b2": {
          titre: "Natures de parallélogrammes",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "6de7e": {
          titre: "Problèmes utilisant le théorème de Pythagore",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "9c4e5": {
          titre: "Problèmes utilisant le théorème de Thalès",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "3f57b": {
          titre: "Problèmes utilisant la trigonométrie",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "9213d": {
          titre: "Calculs de volumes",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "7446b": {
          titre: "Utiliser la distance entre deux points dans un repère orthonormé",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "085c0": {
          titre: "Déterminer les coordonnées milieu d'un segment dans un repère",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "1c579": {
          titre: "Démontrer qu'un quadrilatère est ou non un parallélogramme",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "80c50": {
          titre: "Déterminer la nature d'un polygone",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "2G2": {
        aeb0b: {
          titre: "Construire les images de points par une translation",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        e01c5: {
          titre: "Représenter un vecteur dans un repère, à partir de ses coordonnées.",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        d7701: {
          titre: "Coordonnées de vecteurs et translations.",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        a9b22: {
          titre: "Déterminer les coordonnées d'un vecteur à partir des coordonnées de deux points",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "2G3": {
        "57b68": {
          titre: "Déterminer le coefficient directeur d'une droite.",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        ad385: {
          titre: "Déterminer une équation réduite de droite",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        d510f: {
          titre: "Déterminer une équation cartésienne de droite à partir de deux points.",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        fd9ae: {
          titre: "Déterminer une équation cartésienne de droite à partir d'un point et d'un vecteur directeur.",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        ad8f1: {
          titre: "Déterminer une équation cartésienne à partir d'un point et de la pente.",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        edc80: {
          titre: "Alignement de 3 points.",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        b5585: {
          titre: "Déterminer si des droites $(d)$ et $(d')$ sont parallèles, sécantes ou confondues :",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "5e0ef": {
          titre: "Lecture graphique des coefficients d'une équation réduite ",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "2N1": {
        "5e35b": {
          titre: "Lire l’abscisse décimale d’un point repéré par une fraction",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        c1e7c: {
          titre: "Placer un point d'abscisse décimale",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "46cc1": {
          titre: "Utiliser les abscisses fractionnaires",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "337c6": {
          titre: "Associer un intervalle de  $\\mathbb{R}$ à une inéquation et son schéma sur une droite graduée",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "9ff4d": {
          titre: "Utiliser et comprendre les symboles $\\cup $ et $\\cap $ avec les intervalles de $\\mathbb{R}$",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "1c7b5": {
          titre: "Encadrer une fraction entre deux nombres entiers",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "0802c": {
          titre: "Encadrer avec des puissances de 10",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "8acbb": {
          titre: "Arrondir une valeur",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "4d6c9": {
          titre: "Déterminer le plus petit ensemble de nombres dans lequel le nombre proposé appartient",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "9fd8f": {
          titre: "Utiliser la notion de valeur absolue d'une quantité",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "50f61": {
          titre: "Résoudre une équation avec des valeurs absolues",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "2N2": {
        "99951": {
          titre: "Division Euclidienne - Diviseurs - Multiples",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        af94e: {
          titre: "Écrire la liste de tous les diviseurs d'un entier",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        c1f21: {
          titre: "Critères de divisibilité (plusieurs possibles)",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        df9de: {
          titre: "Primalité ou pas",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "384ca": {
          titre: "Décomposition en facteurs premiers",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "3bd3e": {
          titre: "Compter/lister les diviseurs d'un entier à partir de sa décomposition en facteurs premiers",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        f35a2: {
          titre: "Engrenages",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        cd77e: {
          titre: "Déterminer la parité d'une expression",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "2N3": {
        e9cab: {
          titre: "Décomposer une fraction (partie entière +fraction inférieure à 1) puis donner l'écriture décimale",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "53a02": {
          titre: "Additionner ou soustraire deux fractions",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "5f7ff": {
          titre: "Multiplier des fractions",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        f4048: {
          titre: "Diviser des fractions",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        ff71d: {
          titre: "Fractions et priorités opératoires",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "330b0": {
          titre: "Fractions irréductibles",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "96d2e": {
          titre: "Problèmes additifs et de comparaison sur les fractions",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "628b3": {
          titre: "Puissances : écriture décimale ou fractionnaire",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "14/06/2022",
          dateModification: "",
        },
        "2e085": {
          titre: "Notation scientifique",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "4dd84": {
          titre: "Puissances : le sens des règles de calculs",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "934d5": {
          titre: "Puissances : Calculs automatisés et règles de calculs",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        ff7a4: {
          titre: "Calculs utilisant les priorités opératoires et les puissances",
          tags: {
            AMC: true,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "8cc1d": {
          titre: "Existence d'une racine carrée",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        d4922: {
          titre: "Connaître les propriétés calculatoires des racines carrées",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        c4741: {
          titre: "Écrire le nombre proposé sous la forme $a\\sqrt{b}$",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        b0c36: {
          titre: "Simplifier une somme de racines carrées",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "850c7": {
          titre: "Appliquer la double distributivité avec les racines carrées",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        f52a2: {
          titre: "Développer les identités remarquables avec des racines carrées",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "6fc47": {
          titre: "Rendre entier le dénominateur d'une fraction.",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "2N4": {
        "28717": {
          titre: "Utiliser la distributivité (simple ou double) et réduire",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        d0192: {
          titre: "Traduire un programme de calcul par une expression littérale",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "55d0e": {
          titre: "Calculer la valeur d'une expression littérale.",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "35ef5": {
          titre: "Écrire une expression littérale",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        e2dd9: {
          titre: "Factoriser une expression",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "32d52": {
          titre: "Calcul mental et calcul littéral",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "49a7e": {
          titre: "Factoriser une expression complexe",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        b223a: {
          titre: "Factoriser a²-b²",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "90a7c": {
          titre: "Développer (a-b)(a+b)",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        d919f: {
          titre: "Développer (a+b)²",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        c11a6: {
          titre: "Développer (a-b)²",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        f2afc: {
          titre: "Développer avec les identités remarquables",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        dd398: {
          titre: "Factoriser avec les identités remarquables (niveau II)",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "5c012": {
          titre: "Factoriser avec les identités remarquables",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "2N5": {
        "29151": {
          titre: "Équations du type x/a=b/c (v2)",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "41584": {
          titre: "Résoudre les équations produit-nul",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "52065": {
          titre: "Trouver l'erreur dans une résolution d'équation du premier degré",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "76739": {
          titre: "Tester si un nombre est solution d'une équation",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "09610": {
          titre: "Mettre en équation un problème sans objectif de résolution",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "9ceea": {
          titre: "Produire une forme littérale en introduisant une lettre pour désigner une valeur inconnue",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "8ffa8": {
          titre: "Modéliser une situation  à l'aide d'une équation",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        eee89: {
          titre: "Modéliser une situation géométrique à l'aide d'une équation",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        f7bc1: {
          titre: "Equations du type $\\dfrac{x}{a}=\\dfrac{b}{c}$",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "4845c": {
          titre: "Équations du premier degré",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "9ecd2": {
          titre: "Équations du premier degré (utilisant la distributivité)",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "10f05": {
          titre: "Résoudre des équations carrées.",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        a73e2: {
          titre: "Résoudre des équations se ramenant au produit-nul.",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "2N6": {
        "4a12a": {
          titre: "Inéquation du premier degré",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "1c650": {
          titre: "Résoudre une inéquation-produit",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "03/04/2022",
        },
        cb59e: {
          titre: "Résoudre une inéquation quotient",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "03/04/2022",
        },
      },
      "2S1": {
        a4ade: {
          titre: "Calculer une proportion ou appliquer un pourcentage",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "25c3a": {
          titre: "Calculer un CM à partir d'un taux d'évolution et inversement",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "82d30": {
          titre: "Variations en pourcentage",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "969ef": {
          titre: "Déterminer un taux d'évolution global",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        d841a: {
          titre: "Déterminer un taux d'évolution réciproque",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "2S2": {
        "62657": {
          titre: "Calculer des étendues",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        dcf59: {
          titre: "Calculer des effectifs et des fréquences",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "44ef2": {
          titre: "Calculer des médianes",
          tags: {
            AMC: false,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "2S3": {
        "253a3": {
          titre: "Calculer des probabilités dans une expérience aléatoire à une épreuve",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "27ff5": {
          titre: "Calculer des probabilités simples",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "7ac25": {
          titre: "Calculer des probabilités dans une expérience aléatoire à deux épreuves",
          tags: {
            AMC: false,
            Interactif: false,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "2645c": {
          titre: "Expérience aléatoire à deux épreuves",
          tags: {
            AMC: true,
            Interactif: true,
            Can: false,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "2a": {
        cb54c: {
          titre: "CAN Seconde sujet 2021",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "2C": {
        "14124": {
          titre: "Calculer avec les identités remarquables - Guidé",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "92031": {
          titre: "Trouver le nombre d’entiers entre deux valeurs",
          tags: {
            AMC: true,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "0384f": {
          titre: "Calculer une différence de deux carrés",
          tags: {
            AMC: true,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        f9696: {
          titre: "Calculer avec  des puissances",
          tags: {
            AMC: true,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "54c3e": {
          titre: "Calculer avec les identités remarquables - simple",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        dd28e: {
          titre: "Simplifier des racines carrées",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "4de73": {
          titre: "Calculer avec une racine carrée",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        cf8ef: {
          titre: "Calculer avec une racine carrée*",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "55c90": {
          titre: 'Calculer le "milieu" entre 1 et une fraction',
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "1f5ce": {
          titre: "Passer du taux d’évolution au coefficient multiplicateur",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        cb503: {
          titre: "Passer du coefficient multiplicateur au taux d’évolution",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        ad93d: {
          titre: "Déterminer un taux global d’évolution",
          tags: {
            AMC: true,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "2F": {
        "44976": {
          titre: "Résoudre une équation avec une fonction de référence*",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        bbe09: {
          titre: "Calculer une image avec le second degré",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "0a8af": {
          titre: "Calculer une image avec un quotient",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "76e52": {
          titre: "Déterminer le signe d’une fonction affine (V/F)",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "05ebd": {
          titre: "Trouver les valeurs interdites d’une fonction",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "207cf": {
          titre: "Déterminer un antécédent avec la racine carrée",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "6d4d3": {
          titre: "Dresser le tableau de signes d’une fonction affine",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "1891c": {
          titre: "Lire les extremums dans un tableau de variations",
          tags: {
            AMC: true,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "038cf": {
          titre: "Encadrer en utilisant un tableau de variations",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        f36a9: {
          titre: "Résoudre une équation avec une fonction de référence",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        a4d3d: {
          titre: "Utiliser la fonction carré pour comparer deux images",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "559c1": {
          titre: "Utiliser une fonction de référence (inverse, cube, racine) pour comparer deux images",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "34a95": {
          titre: "Déterminer l’image d’un nombre par une fonction de référence.",
          tags: {
            AMC: true,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "2G": {
        "87680": {
          titre: "Calculer la norme d’un vecteur",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "76ff2": {
          titre: "Déterminer un agrandissement/réduction avec fraction",
          tags: {
            AMC: true,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "00b00": {
          titre: "Calculer une longueur avec le théorème de Pythagore",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        a274d: {
          titre: "Calculer l’hypoténuse avec le théorème de Pythagore",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "7afe5": {
          titre: "Calculer les coordonnées du milieu",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        aadd7: {
          titre: "Calculer une distance avec les coordonnées",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        a0a47: {
          titre: "Déterminer le coefficient directeur d'une droite",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        e9a3f: {
          titre: "Déterminer les coordonnées d’un vecteur",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        ee4dd: {
          titre: "Déterminer les coordonnées d’un vecteur (bis)",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "4b84f": {
          titre: "Déterminer le coefficient de colinéarité entre deux vecteurs",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "1b4d2": {
          titre: "Utiliser la relation de Chasles/réductions vectorielles",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        c7f41: {
          titre: "Utiliser la relation de Chasles/réductions vectorielles*",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "1a5e8": {
          titre: "Reconnaître des vecteurs colinéaires (V/F)",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        e5e19: {
          titre: "Déterminer les coordonnées d'un point avec une translation",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        b9631: {
          titre: "Déterminer le déterminant de deux vecteurs.",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "2L": {
        a968f: {
          titre: "Déterminer le nombre de solutions d’une équation se ramenant à $x^2=a$",
          tags: {
            AMC: true,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        dee75: {
          titre: "Calculer les coordonnées d’un point sur une droite",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "0c0e3": {
          titre: "Calculer les coordonnées du point d’intersection entre l’axe des abscisses/droite",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        a441e: {
          titre: "Calculer les coordonnées du point d’intersection entre l’axe des ordonnées/droite",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "2b941": {
          titre: "Résoudre une inéquation (QCM)",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        eff70: {
          titre: "Développer avec les égalités remarquables",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "9b7b3": {
          titre: "Factoriser une expression",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        "6a428": {
          titre: "Résoudre une équation du type $\\dfrac{x+a}{b}=c$",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "2N": {
        b90c7: {
          titre: "Utiliser les intervalles",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        bf024: {
          titre: "Déterminer le plus petit ensemble de nombres",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
      "2P": {
        d1c8a: {
          titre: "Calculer une probabilité",
          tags: {
            AMC: true,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
        a7a15: {
          titre: "Dénombrer dans une situation concrète",
          tags: {
            AMC: false,
            Interactif: true,
            Can: true,
          },
          themes: [],
          datePublication: "",
          dateModification: "",
        },
      },
    },
  }
  const exercice1 = {
    directory: "6e",
    filename: "6G10-3",
    nbQuestions: 2,
  }
  const exercice2 = {
    directory: "5e",
    filename: "5N13",
    nbQuestions: 3,
  }
  const exercice3 = {
    directory: "6e",
    filename: "6N10",
    nbQuestions: 3,
  }

  const exercice4 = {
    directory: "5e",
    filename: "5L10",
    nbQuestions: 3,
  }
  const exercice5 = {
    directory: "6e",
    filename: "6C11",
    nbQuestions: 3,
  }
  const exercice6 = {
    directory: "6e",
    filename: "6N11",
    nbQuestions: 3,
  }

  const exercice7 = {
    directory: "exercicesStatiques",
    filename: "dnb_2021_06_ameriquenord_1",
  }

  const exercice8 = {
    directory: "exercicesStatiques",
    filename: "e3c_2021_01_specimen1_1",
  }

  const exercice9 = {
    directory: "exercicesStatiques",
    filename: "bac_2021_01_sujet0_1",
  }

  const exercice10 = {
    directory: "exercicesStatiques",
    filename: "crpe_2019-g5-pb-1",
  }
  listeExercices.set([exercice1, exercice2, exercice3, exercice4, exercice5, exercice6, exercice7, exercice8, exercice9, exercice10])
  // listeExercices.set([exercice3])
</script>

<div class="h-screen">
  <!-- <Header /> -->
  <NavBar />
  <TitrePage />
  <main class="flex h-full">
    <!-- side menu -->
    <aside class="flex flex-col bg-gray-100 w-1/3 p-4 border-r-2 border-r-coopmaths-light overflow-hidden h-full">
      <div class="flex-none block">
        <!-- <InputListeExercices />
        <Recherche /> -->
        <h2 class="font-bold text-xl">Liste des exercices</h2>
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item border-t-0 border-l-0 border-r-0 rounded-none bg-white border border-gray-200">
            <h2 class="accordion-header mb-0" id="flush-headingOne">
              <button
                class="accordion-button
    relative
    flex
    items-center
    w-full
    py-4
    px-5
    text-base text-gray-800 text-left
    bg-white
    border-0
    rounded-none
    transition
    focus:outline-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                Accordion Item #1
              </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse border-0 collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body py-4 px-5">
                Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.
              </div>
            </div>
          </div>
          <div class="accordion-item border-l-0 border-r-0 rounded-none bg-white border border-gray-200">
            <h2 class="accordion-header mb-0" id="flush-headingTwo">
              <button
                class="accordion-button
    collapsed
    relative
    flex
    items-center
    w-full
    py-4
    px-5
    text-base text-gray-800 text-left
    bg-white
    border-0
    rounded-none
    transition
    focus:outline-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                Accordion Item #2
              </button>
            </h2>
            <div id="flush-collapseTwo" class="accordion-collapse border-0 collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body py-4 px-5">
                Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled
                with some actual content.
              </div>
            </div>
          </div>
          <div class="accordion-item border-l-0 border-r-0 border-b-0 rounded-none bg-white border border-gray-200">
            <h2 class="accordion-header mb-0" id="flush-headingThree">
              <button
                class="accordion-button
    collapsed
    relative
    flex
    items-center
    w-full
    py-4
    px-5
    text-base text-gray-800 text-left
    bg-white
    border-0
    rounded-none
    transition
    focus:outline-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree"
              >
                Accordion Item #3
              </button>
            </h2>
            <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body py-4 px-5">
                Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening
                here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
    <!-- content -->

    <div class="flex-1 flex flex-col p-6 overflow-hidden h-full">
      <div class="flex-1 overflow-y-scroll overscroll-auto">
        {#each $listeExercices as exercice, i (exercice)}
          <div animate:flip={{ duration: (d) => 30 * Math.sqrt(d) }}>
            <Exercice {...exercice} indiceExercice={i} indiceLastExercice={$listeExercices.length} />
          </div>
        {/each}
      </div>
    </div>
  </main>
  <!-- Modals ne sont pas utilisés pour le moment
  <Modals>
    <div slot="backdrop" class="backdrop" on:click={closeModal} />
  </Modals> -->
  <Footer />
</div>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  /* .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  } */
</style>
