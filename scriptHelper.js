
require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, image) {
    const missionTarget = document.getElementById("missionTarget");

    // creates HTML elements to display fetched data
    const htmlContent = `
    <h2>Mission Destination</h2> 
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter:${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons} </li>
    </ol>
    <img src ="${image}"/>
    `;
        
    // Sets HTML content of missionTarget div
    missionTarget.innerHTML = htmlContent
    
 }
 
 function validateInput(testInput) {
    if(testInput === "") {
        return "Empty";
    } else if(!isNaN(testInput)) {
        return "Is a Number";
    } else {
        return "Not a Number";
    }
 }
 
 function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    // checks for empty fields
    if (pilot === "" || copilot === "" || fuelLevel === "" || cargoLevel === "") {
        window.alert("All fields are required!");
        return;
    }

    // // validate input types
    if(!isNaN(pilot) || !isNaN(copilot) || isNaN(fuelLevel) || isNaN(cargoLevel)){
        window.alert("Pilot and Copilot names must be strings. Fuel level and cargo mass must be numbers.");
        return;
    }

    // Updates launch checklist
    const pilotStatusElement = document.getElementById("pilotStatus");
    const copilotStatusElement = document.getElementById("copilotStatus");
    const fuelStatusElement = document.getElementById("fuelStatus");
    const cargoStatusElement = document.getElementById("cargoStatus");
    const launchStatus = document.getElementById("launchStatus");
    
    pilotStatusElement.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatusElement.innerHTML = `Co-pilot ${copilot} is ready for launch`;

    // Changing checklist visibility
    list.style.visibility = "visible";

    // Checks Fuel and cargo levels 
    if(fuelLevel >= 10000 && cargoLevel < 10000) {
        launchStatus.innerHTML = "Shuttle is Ready for Launch"
        launchStatus.style.color = "green"
        fuelStatusElement.innerHTML = "Fuel level high enough for launch";
        cargoStatusElement.innerHTML = "Cargo mass low enough for launch";
    } else if(fuelLevel < 10000 && cargoLevel < 10000) {
        launchStatus.innerHTML = "Shuttle Not Ready for Launch"
        launchStatus.style.color = 'red'
        fuelStatusElement.innerHTML = "Fuel level too low for launch";
        cargoStatusElement.innerHTML = "Cargo mass low enough for launch";        
    } else if(fuelLevel >= 10000 &&  cargoLevel > 10000) {
        launchStatus.innerHTML = "Shuttle Not Ready for Launch"
        launchStatus.style.color = 'red'
        fuelStatusElement.innerHTML = "Fuel level high enough for launch";
        cargoStatusElement.innerHTML = "Cargo mass too heavy for launch";
    } else if(fuelLevel < 10000 && cargoLevel > 10000) {
        launchStatus.innerHTML = "Shuttle Not Ready for Launch"
        launchStatus.style.color = 'red'
        fuelStatusElement.innerHTML = "Fuel level too low for launch";
        cargoStatusElement.innerHTML = "Cargo mass too heavy for launch";
    }

 }
    
//  fetching JSON info
  async function myFetch() {
    const url = 'https://handlers.education.launchcode.org/static/planets.json';

    try{
        const response = await fetch(url);
        let planetsReturned = await response.json();
        return planetsReturned;
    } catch(error) {
        window.alert('Error fetching planetary data:' + error.message);
        return null;
    }
    // let planetsReturned;
 
    //  planetsReturned = await fetch(url).then( function(response) {
    //      });
 
    //  return planetsReturned;
 }

 //  planet randomizer
 function pickPlanet(planets) {
    const randomIndex = Math.floor(Math.random() * planets.length);
    return planets[randomIndex];
 }

 
 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;