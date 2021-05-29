// Document variable declarations
let userInput = document.getElementById("searchinput");
let searchBtn = document.getElementById("searchbtn");
let edamamId = "15c45754";
let edamamKey = "27854137d14a75271ecad8471fbc5826";
let titleStorage = [];
let photoStorage = [];
let linkStorage = [];
let sourceStorage = [];
let drinkNameStorage = [];
let drinkPhotoStorage = [];
let drinkGlassStorage = [];
let drinkURLStorage = [];

// Search button event listener
searchBtn.addEventListener("click", function() {
    // Prevents the user from activating the function without input for query
    if (userInput.value < 1) {
        return;
    } else {
        // Clears data from storage for multiple searches
        localStorage.clear();
        // Clears arrays for use in populating localStorage multiple times
        titleStorage = [];
        photoStorage = [];
        linkStorage = [];
        sourceStorage = [];
        drinkNameStorage = [];
        drinkPhotoStorage = [];
        drinkGlassStorage = [];
        drinkURLStorage = [];
        // foodCall(userInput);
        drinkCall(userInput);
    }
})

// Edamam food search API call
function foodCall() {
    fetch("http://api.edamam.com/search?app_id=" + edamamId + "&app_key=" + edamamKey + "&q=" + userInput.value)
    .then (response => response.json())
    .then(data => {
        document.location.href="./results.html";
        console.log(data);
        // Loop to store data for population of results page
        for (let i=0; i < 10; i++) {
            let recipeTitle = data["hits"][i]["recipe"]["label"];
            let recipePhoto = data["hits"][i]["recipe"]["image"];
            let recipeLink = data["hits"][i]["recipe"]["url"];
            let recipeSource = data["hits"][i]["recipe"]["source"];
            titleStorage.push(recipeTitle);
            photoStorage.push(recipePhoto);
            linkStorage.push(recipeLink);
            sourceStorage.push(recipeSource);
        }
        // Storage of returned API call data
        localStorage.setItem("Titles", JSON.stringify(titleStorage));
        localStorage.setItem("Photos", JSON.stringify(photoStorage));
        localStorage.setItem("Links", JSON.stringify(linkStorage));
        localStorage.setItem("Sources", JSON.stringify(sourceStorage));
        }
    )
}

// TheCocktailDB drink search API call
function drinkCall() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + userInput.value)
    .then (response => response.json())
    .then (data => {
        document.location.href="./results.html";
        console.log(data);
        // Loop to store data for population of results page
        for (let x=0; x < data["drinks"].length; x++) {
            let drinkName = data["drinks"][x]["strDrink"];
            let drinkPhoto = data["drinks"][x]["strDrinkThumb"];
            let drinkGlass = data["drinks"][x]["strGlass"];
            let drinkURL = "https://www.thecocktaildb.com/drink/" + data["drinks"][x]["idDrink"];
            drinkNameStorage.push(drinkName);
            drinkPhotoStorage.push(drinkPhoto);
            drinkGlassStorage.push(drinkGlass);
            drinkURLStorage.push(drinkURL);
        }
        // Storage of returned API call data
        localStorage.setItem("drinkNames", JSON.stringify(drinkNameStorage));
        localStorage.setItem("drinkPhotos", JSON.stringify(drinkPhotoStorage));
        localStorage.setItem("drinkGlasses", JSON.stringify(drinkGlassStorage));
        localStorage.setItem("drinkURLs", JSON.stringify(drinkURLStorage));
    })
}

// Suggested search functions
function randomFood() {

}
