
const fs = require('fs')
const path = require('path')
const requireImport = require('esm')(module)
const isVerbose = /-(-verbode|v)/.test(process.argv)
const logIfVerbose = (...args) => { if (isVerbose) console.log(...args) }
const jsDir = path.resolve(__dirname, '..')
const dictFile = path.resolve(jsDir, 'modules', 'exercicesDisponiblesReferentiel2022.json')
const uuidToUrlFile = path.resolve(jsDir, 'modules', 'uuidsToUrl.json')
const referentiel2022File = path.resolve(jsDir, 'modules', 'referentiel2022.json')
let dictionnaire, referentiel2022, uuidToUrl

/**
 * @author Sylvain Chambon
 * @param {object} obj
 * @returns {Map}
 */
function toMap(obj) {
    const dico = new Map()
    for (const cle of Object.keys(obj)) {
        if (obj[cle] instanceof Object) {
            if (obj[cle] instanceof Array) {
                dico.set(cle, obj[cle])
            } else {
                dico.set(cle, toMap(obj[cle]))
            }
        } else {
            dico.set(cle, obj[cle])
        }
    }
    return dico
}

/**
 *
 * @param {Map} dico
 * @returns {object}
 */
function toObjet(dico) {
    const obj = {}
    for (const [cle, valeur] of dico) {
        if (valeur instanceof Map) {
            obj[cle] = toObjet(valeur)
        } else {
            obj[cle] = valeur
        }
    }
    return obj
}

/**
 * Crée une Uuid de 5 caractères hexadécimaux (1M de possibilités)
 * @returns {string}
 */
function create_UUID() {
    let dt = new Date().getTime()
    const uuid = 'xxxxx'.replace(/[xy]/g, function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0
        dt = Math.floor(dt / 16)
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
    return uuid
}
/**
 *
 * @returns un tableau de tous les fichiers js ou ts d'un dossier (ne parcours pas les dossiers si il y en a)
 * @author Jean-Claude Lhote
 */
function getAllFilesOfDir(dir) {
    const files = []
    fs.readdirSync(dir).forEach(entry => {
        if (entry === 'Exercice.js' || entry === 'ExerciceTs.ts' || entry === 'beta' || entry === 'Profs') return
        const fullEntry = path.join(dir, entry)
        if (fs.statSync(fullEntry).isDirectory()) return
        else if ((/\.js$/.test(entry) || (/\.ts$/.test(entry))) && !/^_/.test(entry)) {
            files.push(fullEntry)
        } // sinon on ignore
    })
    return files
}
/**
 *
 * @param {string} dir
 * @returns {string[]} un tableau de tous les fichiers contenus dans le dossier et tous les sous-dossiers
 */
function getAllFiles(dir) {
    const files = []
    fs.readdirSync(dir).forEach(entry => {
        if (entry === 'Exercice.js' || entry === 'ExerciceTs.ts') return
        const fullEntry = path.join(dir, entry)
        if (fs.statSync(fullEntry).isDirectory()) {
            getAllFiles(fullEntry).forEach(file => files.push(file))
        } else if ((/\.js$/.test(entry) || (/\.ts$/.test(entry))) && !/^_/.test(entry)) {
            files.push(fullEntry)
        } // sinon on ignore
    })
    return files
}
/***************************************************/
/** ************ fonctions de recherche *************/
/***************************************************/
/**
 *
 * @param {string} ref : la référence cherchée dans le référentiel2022
 * @returns {string} l'uuid de l'exercice dont la référence dans le référentiel2022 est ref
 */
function uuidFromRef(ref) {
    if (!referentiel2022 instanceof Map) {
        console.log('referentiel2022 non valide ou non initialisé')
        return false
    }
    for ([niv, chaps] of referentiel2022) {
        for ([chap, exos] of chaps) {
            if (exos.get(ref)) return exos.get(ref)
        }
    }
    return false
}
/**
 *
 * @param {string} uuid : l'uuid cherchée
 * @returns {string} la référence correspondante dans le référentiel2022
 */
function urlFromUuid(uuid) {
    if (!uuidToUrl instanceof Map) {
        console.log('dictionnaire uurlToUuid non valide ou non initialisé')
        return false
    }
    const cheminFichier = uuidsToUrl.get(uuid)
    if (cheminFichier) return cheminFichier[0] + '/' + cheminFichier[1]
    else return false
}
/**
 *
 * @param {string} level : le niveau ('1e', '6e', ...) duquel on veut la liste des références (can comprises)
 * @returns {array} la liste des uuids des exercices du niveau charché.
 */
function listeChapitresDuNiveau(level) {
    if (!referentiel2022 instanceof Map) {
        console.log('referentiel2022 non valide ou non initialisé')
        return false
    }
    const chaps = referentiel2022.get(level)
    const listeChapitres = []
    if (chaps) {
        chaps.forEach((value, key, map) => listeChapitres.push(key))
    }
    return listeChapitres
}
/**
 *
 * @param {string} chap : le chapitre ('1AN', '1E1', '6C1', ...) dont on veut la liste des exercices
 * @returns la liste des uuids des exercices du chapitre cherché
 */
function listeExosDuChapitre(chap) {
    const listeExos = []
    if (!referentiel2022 instanceof Map) {
        console.log('referentiel2022 non valide ou non initialisé')
        return listeExos
    }
    for ([niv, chaps] of referentiel2022) {
        if (chaps.get(chap)) {
            chaps.get(chap).forEach((value, key) => listeExos.push([key, value]))
        }
    }
    return listeExos
}
/**
 *
 * @param {string} tag : Le mot clé cherché dans les thèmes d'exercice
 * @returns la liste des uuids des exercices qui ont le mot clé dans leur thèmes
 */
function listeExosAvecTag(tag) {
    const listeExos = []
    if (!dictionnaire instanceof Map) {
        console.log('dictionnaire des exercices disponibles non valide ou non initialisé')
        return listeExos
    }
    for ([niv, chaps] of dictionnaire) {
        for ([chap, exos] of chaps) {
            exos.forEach((value, key, exos) => {
                try {
                    if (value.get('themes').includes(tag)) listeExos.push(key)
                } catch (error) {
                    console.log(`erreur avec le chapitre ${chap} et l'uuid ${key}`, error)
                }
            })
        }
    }
    return listeExos
}

function ecrireUuidDansFichier(uuid, name, file) {
    let fichier = fs.readFileSync(file, 'utf-8', (err, data) => { console.log('data') })
    if (fichier) {
        fichier = `export const uuid = '${uuid}'\nexport const ref = '${name}'\n` + fichier
        fs.writeFileSync(file, fichier, 'utf-8')
        return false
    } else {
        console.log(`Le fichier ${file} n\'a pas pu être ouvert en lecture`)
        return false
    }
}
function collecteUuidsDico(dico) {
    let listeUUID = []
    dico.forEach((groupeSousNiveau, niveauID) => {
        groupeSousNiveau.forEach((groupeExos, sousNiveauID) => {
            listeUUID = [...listeUUID, ...groupeExos.keys()]
        })
    })
    return listeUUID
}

function ajouteExoReferentiel({ uuid, name, level, chap, referentiel }) {
    if (!referentiel instanceof Map) {
        console.log('référentiel non valide')
        return false
    }
    let refLevel = referentiel.get(level)
    if (!refLevel) {
        referentiel.set(level, new Map())
        refLevel = referentiel.get(level)
    }
    let refChap = refLevel.get(chap)
    if (!refChap) {
        refLevel.set(chap, new Map())
        refChap = refLevel.get(chap)
    }
    refChap.set(name, uuid)
}
function ajouteExoDico({ uuid = '', name = '', titre = '', level = '', chap = '', themes = [], tags = {}, datePublication = '', dateModification = '', dico }) {
    if (!dico instanceof Map) {
        console.log('dictionnaire non valide')
        return false
    }
    let dicoLevel = dico.get(level)
    if (!dicoLevel) {
        dico.set(level, new Map())
        dicoLevel = dico.get(level)
    }
    let dicoChap = dicoLevel.get(chap)
    if (!dicoChap) {
        dicoLevel.set(chap, new Map())
        dicoChap = dicoLevel.get(chap)
    }
    const exo = { titre, tags, themes, datePublication, dateModification }
    dicoChap.set(uuid, exo)
}

function mettreAJourFichierDico(file, dico) {
    const objDico = toObjet(dico)
    const contenuFichier = JSON.stringify(objDico, null, 2)
    const dictFile = path.resolve('src', 'modules', file)
    fs.writeFileSync(dictFile, contenuFichier, 'utf-8')
}

/**
 * Fonction qui génère ou maintient à jour le dictionnaire de tous les exercices.
 * Elle parcourt l'ensemble des fichiers exercice
 * vérifie si la constante uuid existe (signe que l'exercice est déjà dans le dictionnaire)
 * Si elle existe, on passe au fichier suivant
 * Sinon, on génère une uuid nouvelle qu'on écrit dans le fichier : export const uuid = 'xxxxx' à la première ligne
 * Puis on ajoute l'exercice dans le dictionnaire avec son uuid
 * En même temps, on alimente le fichier uuidToUrl.json qui stocke les url des fichiers référencés par leur uuid.
 * @author Jean-Claude Lhote
 */
function builJsonDictionnaireExercices() {
    // on charge le dictionnaire si il existe et on génère la liste des UUID déjà prises
    let listOfUuids = []
    // On prépare les fichiers que l'on va alimenter : listOfUuids, dictionnaire, uuidsToUrl
    if (fs.existsSync(dictFile)) {
        const contenuFichierDico = fs.readFileSync(dictFile, 'utf-8', (err, data) => { console.log('data') })
        if (contenuFichierDico === '') {
            console.log('Le fichier est vide ou n\'existe pas')
            dictionnaire = new Map()
        } else {
            dictionnaire = toMap(JSON.parse(contenuFichierDico))
            listOfUuids = collecteUuidsDico(dictionnaire)
        }
    } else {
        dictionnaire = new Map()
    }
    if (fs.existsSync(uuidToUrlFile)) {
        uuidsToUrl = toMap(JSON.parse(fs.readFileSync(uuidToUrlFile, 'utf-8', (err, data) => { console.log('data') })))
    } else {
        uuidsToUrl = new Map()
    }
    if (fs.existsSync(referentiel2022File)) {
        referentiel2022 = toMap(JSON.parse(fs.readFileSync(referentiel2022File, 'utf-8', (err, data) => { console.log('data') })))
    } else {
        referentiel2022 = new Map()
    }
    // On charge la liste des exercices
    const exercicesDir = path.resolve(jsDir, 'exercices')
    const prefixLength = jsDir.length
    const exercicesList = getAllFiles(exercicesDir)
    let uuid, module
    for (const file of exercicesList) {
        if (file.indexOf('beta') !== -1) continue
        if (file.indexOf('Prof') !== -1) continue
        const name = path.basename(file, path.extname(file))
        let titre, isAmcReady, isInteractifReady
        const isCan = file.indexOf('\\can\\') !== -1
        let level, chap
        let themes, tags, datePublication, dateDeModification
        try {
            module = requireImport(file)
        } catch (error) { // error sans doute du à l'usage de typescript... On cherche les paramètres dans le texte du fichier.
            module = fs.readFileSync(file, 'utf8')
            if (module.indexOf('export const uuid =') === -1) {
                do {
                    uuid = create_UUID()
                } while (listOfUuids.indexOf(uuid) !== -1)
                let chunks = /export const titre *= *(['"])([^'"]+)\1/.exec(module)
                titre = chunks[2]
                isAmcReady = /export +const +amcReady *= *true/.test(module)
                isInteractifReady = /export +const +interactifReady *= *true/.test(module)
                chunks = /export const themes *= *(['"])([^'"]+)\1/.exec(module)
                themes = chunks ? chunks[2] : []
                chunks = /export const dateDePublication *= *(['"])([^'"]+)\1/.exec(module)
                datePublication = chunks ? chunks[2] : ''
                chunks = /export const dateModificationImportante *= *(['"])([^'"]+)\1/.exec(module)
                dateModification = chunks ? chunks[2] : ''
                console.log(`Problème dans ${name} : import impossible, on gère avec des chaînes de caractères`)
            } else continue
        }
        if (typeof module !== 'string' && module.uuid !== undefined) continue
        if (typeof module !== 'string') {
            try {
                do {
                    uuid = create_UUID()
                } while (listOfUuids.indexOf(uuid) !== -1)
                titre = module.titre
                isAmcReady = Boolean(module.amcReady)
                isInteractifReady = Boolean(module.interactifReady)
                themes = module.themes ? module.themes : []
                datePublication = module.dateDePulication
                dateModification = module.dateDeModificationImportante
            } catch (error) {
                console.log(`Erreur avec ${name} : ${error}`)
            }
        }
        if (isCan) {
            if (['1', '2', '3', '4', '5', '6', 'T'].indexOf(name[3]) !== -1) {
                level = name[3] + 'e'
                chap = name.substring(3, 5)
            } else {
                level = name.substring(3, 5)
                chap = name.substring(3, 6)
            }
        } else {
            if (['1', '2', '3', '4', '5', '6', 'T'].indexOf(name[0]) !== -1) {
                level = name[0] + 'e'
                chap = name.substring(0, 3)
            } else if (name.substring(0, 7) === 'techno1') {
                level = name.substring(0, 7)
                chap = name.substring(7, 8)
            } else {
                level = name[0] + name[1]
                chap = name.substring(0, 4)
            }
        }
        tags = { AMC: !!isAmcReady, Interactif: !!isInteractifReady, Can: !!isCan }
        ecrireUuidDansFichier(uuid, name, file)
        ajouteExoDico({ uuid, name, titre, level, chap, themes, tags, datePublication, dateModification, dico: dictionnaire })
        ajouteExoReferentiel({ uuid, name, level, chap, referentiel: referentiel2022 })
        if (isCan) {
            uuidsToUrl.set(uuid, [`can/${level}`, name])
        } else {
            uuidsToUrl.set(uuid, [level, name])
        }
    }
    mettreAJourFichierDico('exercicesDisponiblesReferentiel2022.json', dictionnaire)
    mettreAJourFichierDico('uuidsToUrl.json', uuidsToUrl)
    mettreAJourFichierDico('referentiel2022.json', referentiel2022)
}
/**
 * Fonction qui extrait les exercices d'un niveau pour créer un dictionnaire de ce niveau
 * Les niveaux possibles sont '1e', '2e', '3e', '4e', '5e', '6e', 'c3', 'CM', 'Ex', 'HP', 'PE', 'Te'
 * @param {string} level
 * @author Jean-Claude Lhote
 */
function buildJsonExercicesOfLevel(level) { // level contient la première lettre du niveau
    let listeExosLevel
    if (dictionnaire === undefined) dictionnaire = toMap(JSON.parse(fs.readFileSync(dictFile, 'utf-8', (err, data) => { console.log('data') })))
    const entrées = Object.entries(toObjet(dictionnaire))
    const listeExos = []
    for (const [clé, liste] of entrées) {
        if (clé === level) {
            for (const [key, data] of Object.entries(liste)) {
                exos = Object.entries(data)
                for (const [key2, value] of Object.entries(exos)) {
                    listeExos.push([value[0], value[1]])
                }
            }
        }
    }

    const dicoLevel = Object.fromEntries(listeExos)
    const dicoLevelFile = path.resolve('src', 'modules', `exercicesDisponiblesNiveau${level}Referentiel2022.json`)
    fs.writeFileSync(dicoLevelFile, JSON.stringify(dicoLevel, null, 2))
}
/**
 *
 * @param {string} exercice
 * @returns {object} {level, chap, isCan, ref}
 * @author Jean-Claude Lhote
 */
function extraitLevelExercice(exercice) {
    let exo = exercice
    const structure = { level: '', chap: '', isCan: false, ref: '' }
    if (exo.substring(0, 3) === 'can') {
        structure.isCan = true
        exo = exo.substring(3)
    }
    if (['1', '2', '3', '4', '5', '6', 'T'].indexOf(exo[0]) !== -1) {
        structure.level = exo.substring(0, 1) + 'e'
        exo = exo.substring(1)
    } else {
        structure.level = exo.substring(0, 2)
        exo = exo.substring(2)
    }
    structure.chap = exo.substring(0, 1)
    structure.ref = exo
    return structure
}

// main script
builJsonDictionnaireExercices()
/* buildJsonExercicesOfLevel('1e')
buildJsonExercicesOfLevel('2e')
buildJsonExercicesOfLevel('3e')
buildJsonExercicesOfLevel('4e')
buildJsonExercicesOfLevel('5e')
buildJsonExercicesOfLevel('6e')
buildJsonExercicesOfLevel('techno1')
buildJsonExercicesOfLevel('CM')
buildJsonExercicesOfLevel('HP')
buildJsonExercicesOfLevel('PE')
buildJsonExercicesOfLevel('Ex')
buildJsonExercicesOfLevel('c3')
*/
console.log(uuidFromRef('4C35'))
console.log(urlFromUuid('17927'))
console.log(listeChapitresDuNiveau('1e'))
console.log(listeExosDuChapitre('4G1'))
console.log(listeExosAvecTag('Pythagore'))
// buildJsonExercicesOfLevel('Te')

/* const donneesJSON = fs.readFileSync(path.resolve('src', 'modules', 'exercicesDisponiblesReferentiel2022.json'));
let donnees = JSON.parse(donneesJSON);

const dictionnaire = toMap(donnees);
console.log(dictionnaire.get("b5f8a"))
*/
// console.log(dictionnaire.get("15446").get("tags").get("AMC"));
// console.log(toObjet(dictionnaire));
