<script>
  import NavBarMenu from "./NavBarMenu.svelte"
  let navBarVisible = false
  $: menuGeneralOuvert = navBarVisible
  const menus = {
    referentiels: {
      titre: "Référentiels",
      entrees: ["Sixième", "Cinquième", "Quatrième", "Troisième", "Seconde", "CRPE"],
      menuOuvert: false,
    },
    professeurs: {
      titre: "Professeurs",
      entrees: [
        "Exercices en ligne",
        "Comment utiliser MathALEA",
        "Générateur LaTeX/PDF",
        "Export vers Moodle",
        "Programmation de figures géométriques",
        "Animations avec des instruments de géométrie",
        "Outils",
        "Scores des éleves",
      ],
      menuOuvert: false,
    },
    aPropos: {
      titre: "À Propos",
      entrees: ["Objectifs généraux", "Présentation du logiciel", "Nous contacter", "Documentation pour les développeurs"],
      menuOuvert: false,
    },
  }
</script>

<nav class="bg-coopmaths sticky top-0">
  <!-- container -->
  <div class="container flex flex-wrap px-4 py-2 mx-auto lg:space-x-6 lg:items-center">
    <!-- logo -->
    <a href={"#"} class="inline-flex p-2 text-2xl font-bold text-white uppercase tracking-wider">Coopmaths</a>
    <!-- bouton menu -->
    <button class=" lg:hidden inline-flex ml-auto items-center justify-center text-white font-bold text-xl" on:click={() => (navBarVisible = !navBarVisible)}>
      <i class="bx bx-menu" />
    </button>
    <!-- menu -->
    <div class="w-full mt-2 lg:inline-flex lg:w-auto lg:mt-0 {navBarVisible ? 'flex' : 'hidden'}">
      <ul class="flex flex-col w-full space-y-2 lg:w-auto lg:flex-row lg:space-x-2 lg:space-y-0">
        <li>
          <NavBarMenu {...menus.referentiels} bind:navBarVisible />
        </li>
        <li>
          <a href={"#"} class="flex px-4 py-2 text-xl font-medium text-white hover:text-orange-200 rounded-sm">Calcul mental</a>
        </li>
        <li>
          <NavBarMenu {...menus.professeurs} bind:navBarVisible />
        </li>
        <li>
          <NavBarMenu {...menus.aPropos} bind:navBarVisible />
        </li>
      </ul>
    </div>
  </div>
</nav>

<style></style>
