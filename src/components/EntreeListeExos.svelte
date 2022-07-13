<script lang="ts">
  import data from "../dicos/exosDispo.json"

  type Exo = {
    id: string
    code: string
  }
  export let exo: Exo
  export let chemin: string[]

  function toMap(obj: any): Map {
    let dico = new Map()
    for (let cle of Object.keys(obj)) {
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

  const dictionnaire = toMap(data)

  function nomExo(chemin: string[]): string {
    let cheminAChercher = [...chemin]
    let response = dictionnaire.get(cheminAChercher.shift())
    cheminAChercher.forEach((cle) => {
      response = response.get(cle)
    })
    return response.get("titre")
  }
</script>

<div class="text-sm"><span class="font-bold">{exo.code} - </span>{nomExo([...chemin, exo.id])}</div>
