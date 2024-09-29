// Scenes should be loaded into memory
async function loadScenes() {
	//ask server for Scenes file
	const response = await fetch('FullMoonData.json');
	const data = await response.json();
	return data.Scenes;
}

const Scenes = {};
let currentScenesId = "CargoBayCh1-1"; //This is the starting scenes

//TODO: Have text be an array that breaks into lines. Also have it typed out for funsies
function setText(text) {
	document.getElementById("TextDisplayArea").innerText = text;
}

function listAvailableActions(scenesId) {
	const scenes 
}

// Attempt to set the current scenes from a given scenesId
function setScenes(scenesId) {
	const scenes = Scenes[scenesId];
	if(scenes){
		currentScenesId = scenesId;
		setText(scenes.description);
		
	} else{
		setText("Scenes not found. "+scenesId);
	}
}

//read the user input in the text field and attempt to run the action if possible
function parseUserInput(){
	const inputField = document.getElementById("UserInput");
	const input = inputField.value.trim();
	inputField.value = "";
}

async function init() {
	const loadedScenes = await loadScenes();
	Object.assign(Scenes, loadedScenes);
	setScenes(currentScenesId);
}

init();
console.log("Full Moon script has loaded");