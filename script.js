// Write your JavaScript code here!

window.addEventListener("load", function() {
    let listedPlanets;
    
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        
    }).then(function () {
        
        // selects random planet
        let randomPlanet = pickPlanet(listedPlanets);
        
        // Takes info of random planet
        const { name, diameter, star, distance, moons, image } = randomPlanet;
        
        // displays info by calling addDestinationInfo()
        addDestinationInfo(document, name, diameter, star, distance, moons, image);
        
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
    });
    
    // Event listener for form submission
    const form = document.querySelector("form[data-testid = 'testForm']");
    
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const pilotInput = document.getElementById("pilotName").value;
        const copilotInput = document.querySelector("input[name='copilotName']").value;
        const fuelLevelInput = document.querySelector("input[name='fuelLevel']").value;
        const cargoMassInput = document.querySelector("input[name='cargoMass']").value;
        const launchChecklist = document.getElementById("faultyItems");
        
        formSubmission(document, launchChecklist, pilotInput,copilotInput,fuelLevelInput, cargoMassInput);
    });
    
    // Fetch planetary data
     myFetch().then(function(planets) {
        let randomPlanet = pickPlanet(planets);
        addDestinationInfo(document, randomPlanet.name, randomPlanet.diameter, randomPlanet.star, randomPlanet.distance, randomPlanet.moons, randomPlanet.image);
    }).catch(function(error) {
        window.alert('Error Fetching planetary data:' + error.message);
    });
});