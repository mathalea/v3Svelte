<script>
  let navBarVisible = false
</script>

<nav class="bg-orange-600">
  <!-- container -->
  <div class="container flex flex-wrap px-4 py-2 mx-auto md:space-x-4 md:items-center">
    <!-- logo -->
    <a href="#" class="inline-flex p-2 text-xl font-bold text-white uppercase tracking-wider">Coopmaths</a>
    <!-- bouton menu -->
    <button class=" md:hidden inline-flex ml-auto items-center justify-center text-white font-bold text-xl" on:click={() => (navBarVisible = !navBarVisible)}>
      <i class="bx bx-menu" />
    </button>
    <!-- menu -->
    <div class="w-full mt-2 md:inline-flex md:w-auto md:mt-0 {navBarVisible ? 'hidden' : 'flex'}">
      <ul class="flex flex-col w-full space-y-2 md:w-auto md:flex-row md:space-x-2 md:space-y-0">
        <li>
          <a href="#" class="fex px-4 py-2 font-medium text-white hover:bg-orange-700 rounded-md">Référentiels</a>
        </li>
        <li>
          <a href="#" class="fex px-4 py-2 font-medium text-white hover:bg-orange-700 rounded-md">Calcul mental</a>
        </li>
        <li>
          <a href="#" class="fex px-4 py-2 font-medium text-white hover:bg-orange-700 rounded-md">Professeurs</a>
        </li>
        <li>
          <a href="#" class="fex px-4 py-2 font-medium text-white hover:bg-orange-700 rounded-md">À propos</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<style></style>
