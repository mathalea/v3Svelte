<script>
  import NavBarMenu from "./NavBarMenu.svelte"
  let isNavBarVisible = false
  const menus = {
    referentiels: {
      titre: "Référentiels",
      entrees: ["Sixième", "Cinquième", "Quatrième", "Troisième", "Seconde", "CRPE"],
      isMenuOpen: false,
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
      isMenuOpen: false,
    },
    aPropos: {
      titre: "À Propos",
      entrees: ["Objectifs généraux", "Présentation du logiciel", "Nous contacter", "Documentation pour les développeurs"],
      isMenuOpen: false,
    },
  }
</script>

<nav class="bg-coopmaths top-0">
  <!-- container -->
  <div class="flex flex-wrap w-full px-4 py-2 mx-auto lg:space-x-6 lg:items-center">
    <!-- bouton menu -->
    <div class="flex flex-row justify-start space-x-2">
      <button class=" lg:hidden inline-flex ml-auto items-center justify-center text-white font-bold text-xl" on:click={() => (isNavBarVisible = !isNavBarVisible)}>
        <i class="bx bx-menu" />
      </button>
      <!-- logo -->
      <a href={"#"} class="inline-flex p-2 text-2xl font-bold text-white uppercase tracking-wider">Coopmaths</a>
    </div>
    <!-- menu -->
    <div class="flex flex-col mt-2 lg:inline-flex lg:grow lg:flex-row lg:mt-0 {isNavBarVisible ? 'flex' : 'hidden'}">
      <ul class="flex flex-col space-y-2   lg:flex-row lg:space-x-2 lg:space-y-0">
        <li>
          <NavBarMenu {...menus.referentiels} bind:isNavBarVisible />
        </li>
        <li>
          <a href={"#"} class="flex px-4 py-2 text-xl font-medium text-white hover:text-orange-200 rounded-sm">Calcul mental</a>
        </li>
        <li>
          <NavBarMenu {...menus.professeurs} bind:isNavBarVisible />
        </li>
        <li>
          <NavBarMenu {...menus.aPropos} bind:isNavBarVisible />
        </li>
      </ul>
      <div class="flex flex-1 pt-6 lg:pt-0 px-4 space-x-3 items-center justify-start lg:justify-end">
        <div class="{isNavBarVisible ? 'inline-flex' : 'hidden'}  text-white text-xl font-medium ">Export</div>
        <i class="bx bx-export text-white text-2xl" />
      </div>
    </div>
  </div>
</nav>

<style></style>
