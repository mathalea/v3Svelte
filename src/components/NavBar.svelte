<script>
  import { clickOutside } from "./clickOutside.js"
  let navBarVisible = false
  let referentielsMenuOpen = false
  let professeursMenuOpen = false
  let aProposMenuOpen = false
</script>

<nav class="bg-orange-600 sticky top-0">
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
        <li class="relative">
          <button href={"#"} class="w-full flex flex-row items-center px-4 py-2 text-xl font-medium text-white hover:text-orange-200" on:click={() => (referentielsMenuOpen = !referentielsMenuOpen)}>
            Référentiels<i class="ml-2 bx bx-caret-down" />
          </button>
          <!-- menu dropdown referentiel -->
          <div class="lg:absolute bg-orange-600 right-0 pt-3 pb-3 {referentielsMenuOpen ? 'flex flex-col' : 'hidden'} lg:w-32">
            <ul class="space-y-2 w-full">
              <li>
                <a href={"#"} class="w-full flex px-2 py-1 ml-4 lg:ml-0 font-medium text-white hover:text-gray-100 hover:bg-orange-500">Sixième</a>
              </li>
              <li>
                <a href={"#"} class="w-full flex px-2 py-1 ml-4 lg:ml-0 font-medium text-white hover:text-gray-100 hover:bg-orange-500">Cinquième</a>
              </li>
              <li>
                <a href={"#"} class="w-full flex px-2 py-1 ml-4 lg:ml-0 font-medium text-white hover:text-gray-100 hover:bg-orange-500">Quatrième</a>
              </li>
              <li>
                <a href={"#"} class="w-full flex px-2 py-1 ml-4 lg:ml-0 font-medium text-white hover:text-gray-100 hover:bg-orange-500">Troisième</a>
              </li>
              <li>
                <a href={"#"} class="w-full flex px-2 py-1 ml-4 lg:ml-0 font-medium text-white hover:text-gray-100 hover:bg-orange-500">Seconde</a>
              </li>
              <li>
                <a href={"#"} class="w-full flex px-2 py-1 ml-4 lg:ml-0 font-medium text-white hover:text-gray-100 hover:bg-orange-500">CRPE</a>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <a href={"#"} class="flex px-4 py-2 text-xl font-medium text-white hover:text-orange-200 rounded-sm">Calcul mental</a>
        </li>
        <li class="relative">
          <button href={"#"} class="w-full flex flex-row items-center px-4 py-2 text-xl font-medium text-white hover:text-orange-200" on:click={() => (professeursMenuOpen = !professeursMenuOpen)}>
            Professeurs <i class="ml-2 bx bx-caret-down" />
          </button>
          <!-- menu dropdown professeurs -->
          <div class="lg:absolute bg-orange-600 right-0 pt-3 pb-3 {professeursMenuOpen ? 'flex flex-col' : 'hidden'} lg:w-48">
            <ul class="space-y-2 w-full">
              <li>
                <a href={"#"} class="w-full flex px-2 py-1 ml-4 lg:ml-0 font-medium text-white hover:text-gray-100 hover:bg-orange-500">Exercices en ligne</a>
              </li>
              <li>
                <a href={"#"} class="w-full flex px-2 py-1 ml-4 lg:ml-0 font-medium text-white hover:text-gray-100 hover:bg-orange-500">Comment utiliser MathALEA</a>
              </li>
              <li>
                <a href={"#"} class="w-full flex px-2 py-1 ml-4 lg:ml-0 font-medium text-white hover:text-gray-100 hover:bg-orange-500">Générateur LaTeX/PDF</a>
              </li>
              <li>
                <a href={"#"} class="w-full flex px-2 py-1 ml-4 lg:ml-0 font-medium text-white hover:text-gray-100 hover:bg-orange-500">Export vers Moodle</a>
              </li>
              <li>
                <a href={"#"} class="w-full flex px-2 py-1 ml-4 lg:ml-0 font-medium text-white hover:text-gray-100 hover:bg-orange-500">Programmation de figures géométriques</a>
              </li>
              <li>
                <a href={"#"} class="w-full flex px-2 py-1 ml-4 lg:ml-0 font-medium text-white hover:text-gray-100 hover:bg-orange-500">Animations avec des instruments de géométrie</a>
              </li>
              <li>
                <a href={"#"} class="w-full flex px-2 py-1 ml-4 lg:ml-0 font-medium text-white hover:text-gray-100 hover:bg-orange-500">Outils</a>
              </li>
              <li>
                <a href={"#"} class="w-full flex px-2 py-1 ml-4 lg:ml-0 font-medium text-white hover:text-gray-100 hover:bg-orange-500">Scores des éleves</a>
              </li>
            </ul>
          </div>
        </li>
        <li class="relative">
          <button href={"#"} class="w-full flex flex-row items-center px-4 py-2 text-xl font-medium text-white hover:text-orange-200" on:click={() => (aProposMenuOpen = !aProposMenuOpen)}>
            À propos<i class="ml-2 bx bx-caret-down" />
          </button>
          <!-- menu dropdown referentiel -->
          <div class="lg:absolute bg-orange-600 right-0 pt-3 pb-3 {aProposMenuOpen ? 'flex flex-col' : 'hidden'} lg:w-32">
            <ul class="space-y-2 w-full">
              <li>
                <a href={"#"} class="w-full flex px-2 py-1 ml-4 lg:ml-0 font-medium text-white hover:text-gray-100 hover:bg-orange-500">Objectifs généraux</a>
              </li>
              <li>
                <a href={"#"} class="w-full flex px-2 py-1 ml-4 lg:ml-0 font-medium text-white hover:text-gray-100 hover:bg-orange-500">Présentation du logiciel</a>
              </li>
              <li>
                <a href={"#"} class="w-full flex px-2 py-1 ml-4 lg:ml-0 font-medium text-white hover:text-gray-100 hover:bg-orange-500">Nous contacter</a>
              </li>
              <li>
                <a href={"#"} class="w-full flex px-2 py-1 ml-4 lg:ml-0 font-medium text-white hover:text-gray-100 hover:bg-orange-500">Documentation pour les développeurs</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</nav>

<style></style>
