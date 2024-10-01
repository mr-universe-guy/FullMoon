// Scenes should be loaded into memory
async function loadScenes(actData) {
	//ask server for Scenes file
	const response = await fetch(actData);
	const data = await response.json();
	return data.scenes;
}

const scenes = {};
let currentSceneId = "Ch0-CargoBay"; //This is the starting scenes
const inventory = [];
let lycanthropy = 0.0; //Track how far along the transformation is

function clearDisplayedText(){
	document.getElementById("TextDisplayArea").innerHTML = ""
}

//TODO: Have text be an array that breaks into lines. Also have it typed out for funsies
function displayText(text) {
	const disp = document.createElement('div');
	disp.classList.add("text-entry");
	disp.innerHTML = text;
	const displayArea = document.getElementById("TextDisplayArea");
	displayArea.append(disp);
	if(displayArea.childNodes.length > 25){
		displayArea.removeChild(displayArea.lastChild);
	}
	displayArea.scrollTop = displayArea.scrollHeight;
}

// Attempt to set the current scenes from a given scenesId
function setScene(sceneId) {
	const scene = scenes[sceneId];
	if(scene){
		currentSceneId = sceneId;
		displayText(scene.description);
		//set each available action
		let actionArea = document.getElementById("AvailableActionsArea");
		actionArea.innerHTML = "<ul>"
		console.log(scene.actions);
		for(let x in scene.actions){
			let action = scene.actions[x];
			actionArea.innerHTML +="<li>"+ x + "</li>"
		}
		actionArea.innerHTML += "<li>return</li></ul>"
	} else{
		displayText("Scenes not found. "+sceneId);
	}
}

function runAction(type, value){
	//console.log("Running action :"+type+","+value)
	switch(type){
		case "description":
			displayText(value);
			break;
		case "changeLocation":
			setScene(value);
			break;
		default:
			
	}
}

//read the user input in the text field and attempt to run the action if possible
function parseUserInput(){
	const inputField = document.getElementById("UserInput");
	const input = inputField.value.trim();
	inputField.value = "";
	//display the user input
	displayText("<span class='user-input'>--"+input+"</span>");
	//there are a few inputs that are always available, handle them here
	switch(input){
		case "return":
			setScene(currentSceneId);
			return;
	}
	//if it is not a default input then handle it as an action
	const action = scenes[currentSceneId].actions[input]
	if(action){
		runAction(action.type, action.value)
	} else{
		
	}
}

function detectEnter(e){
	if(e.key === 'Enter'){
		parseUserInput();
	}
}

async function init() {
	clearDisplayedText();
	const loadedScenes = await loadScenes('resources/Act1Data.json');
	Object.assign(scenes, loadedScenes);
	setScene(currentSceneId);
}

init();
console.log("Full Moon script has loaded");