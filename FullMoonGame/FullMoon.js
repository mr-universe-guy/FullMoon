// Scenes should be loaded into memory
async function loadScenes() {
	//ask server for Scenes file
	const response = await fetch('FullMoonData.json');
	const data = await response.json();
	return data.scenes;
}

const scenes = {};
let currentSceneId = "CargoBayCh1-1"; //This is the starting scenes

//TODO: Have text be an array that breaks into lines. Also have it typed out for funsies
function setText(text) {
	document.getElementById("TextDisplayArea").innerText = text;
}

// Attempt to set the current scenes from a given scenesId
function setScene(sceneId) {
	const scene = scenes[sceneId];
	if(scene){
		currentSceneId = sceneId;
		setText(scene.description);
		//set each available action
		let actionArea = document.getElementById("AvailableActionsArea");
		actionArea.innerText = ""
		console.log(scene.actions);
		for(let x in scene.actions){
			let action = scene.actions[x];
			actionArea.innerHTML += x + "<br>"
		}
	} else{
		setText("Scenes not found. "+sceneId);
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
	Object.assign(scenes, loadedScenes);
	setScene(currentSceneId);
}

init();
console.log("Full Moon script has loaded");