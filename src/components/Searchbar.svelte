<script lang="ts">
    import Chips from "./Chips.svelte"
    import { listeExercices } from "./store"
    import ExercicesData from "./ExercicesData.svelte";
    import data from '../exercicesList.json'
    
    let input: HTMLInputElement
    let listeId = []
  
    const exercices = []
    let selectedColor
    $: {
      listeId = []
      for (const ex of $listeExercices) {
        listeId.push(ex.id)
      }
      listeId = listeId
    }

    /* FILTERING Exercices DATA BASED ON INPUT */	
let filteredExercices = [];
// $: console.log(filteredExercices)	

const filterEx = () => {
	let storageArr = []
	if (inputValue) {
		data.forEach(ex => {
			 if (ex.toLowerCase().startsWith(inputValue.toLowerCase())) {
				 storageArr = [...storageArr, makeMatchBold(ex)];
			 }
		});
	}
	filteredExercices = storageArr;
}	


/* HANDLING THE INPUT */
let searchInput; // use with bind:this to focus element
let inputValue = "";
	
$: if (!inputValue) {
	filteredExercices = [];
	hiLiteIndex = null;
}

const clearInput = () => {
	inputValue = "";	
	searchInput.focus();
}
	
const setInputVal = (countryName) => {
	inputValue = removeBold(countryName);
	filteredExercices = [];
	hiLiteIndex = null;
	document.querySelector('#country-input')//.focus();
}	

const submitValue = () => {
	if (inputValue) {
		console.log(`${inputValue} is submitted!`);
		setTimeout(clearInput, 1000);
	} else {
		alert("You didn't type anything.")
	}
}

const makeMatchBold = (str) => {
	// replace part of (country name === inputValue) with strong tags
    let matched = str.substring(0, inputValue.length);
	let makeBold = `<strong>${matched}</strong>`;
	let boldedMatch = str.replace(matched, makeBold);
	return boldedMatch;
}

const removeBold = (str) => {
	//replace < and > all characters between
	return str.replace(/<(.)*?>/g, "");
	// return str.replace(/<(strong)>/g, "").replace(/<\/(strong)>/g, "");
}	
	

/* NAVIGATING OVER THE LIST OF COUNTRIES W HIGHLIGHTING */	
let hiLiteIndex = null;
//$: console.log(hiLiteIndex);	
$: hiLitedCountry = filteredExercices[hiLiteIndex]; 	
	
const navigateList = (e) => {
	if (e.key === "ArrowDown" && hiLiteIndex <= filteredExercices.length-1) {
		hiLiteIndex === null ? hiLiteIndex = 0 : hiLiteIndex += 1
	} else if (e.key === "ArrowUp" && hiLiteIndex !== null) {
		hiLiteIndex === 0 ? hiLiteIndex = filteredExercices.length-1 : hiLiteIndex -= 1
	} else if (e.key === "Enter") {
		setInputVal(filteredExercices[hiLiteIndex]);
	} else {
		return;
	}
} 
  

    function handleChange2() {
      let newId = inputValue.replace('.js','')
      let ex = newId.split('/')
      const newExercice = {
        directory: ex[0],
        id: ex[1],
      }
      listeExercices.update((l) => [...l, newExercice])
      input.value = ""
    }

  </script>


  <div class="inline-flex space-x-2">
    {#each listeId as id, indice (indice)}
      <Chips text={id} {indice} />
    {/each}
  </div>

  <svelte:window on:keydown={navigateList} />

<form autocomplete="off" on:submit|preventDefault={submitValue}>
  <div class="autocomplete">
    <input id="country-input" 
					 type="text" 
					 placeholder="Search Ex Names" 
					 bind:this={searchInput}
					 bind:value={inputValue} 
					 on:input={filterEx}>
  </div>
	
   <input type="submit" on:click={handleChange2}>
	
	<!-- FILTERED LIST OF COUNTRIES -->
	{#if filteredExercices.length > 0}
		<ul id="autocomplete-items-list">
			{#each filteredExercices as ex, i}
				<ExercicesData itemLabel={ex} highlighted={i === hiLiteIndex} on:click={() => setInputVal(ex)} />
			{/each}			
		</ul>
	{/if}
</form>
	
	
<style>
div.autocomplete {
  /*the container must be positioned relative:*/
  position: relative;
  display: inline-block;
	width: 300px;
}
input {
  border: 1px solid transparent;
  background-color: #f1f1f1;
  padding: 10px;
  font-size: 16px;
	margin: 0;
}
input[type=text] {
  background-color: #f1f1f1;
  width: 100%;
}
input[type=submit] {
  background-color: DodgerBlue;
  color: #fff;
}
	
#autocomplete-items-list {
	position: relative;
	margin: 0;
	padding: 0;
	top: 0;
	width: 297px;
	border: 1px solid #ddd;
	background-color: #ddd;
}	
</style>	