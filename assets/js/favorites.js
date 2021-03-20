
var favoritesEl = document.querySelector(".favorites");

// Grab brew names from local storage (array)
var favorites = JSON.parse(localStorage.getItem("brew-name"));
console.log("favorites", favorites)

// Grab brew names from local storage (string)
var barName = localStorage.getItem("brew-name");
console.log("name", barName);

// Function to show brewery name on page

function showBrewToo() {
    favoritesEl.innerHTML = "";
    for (var i = 0; i < favorites.length; i++) {
       favoritesEl.innerHTML = "Brewery: " + favorites;
    }
}


// BUTTON FUNCTION SECTION --------

// clear button section
var clearBtn = document.querySelector("#clearBtn");

clearBtn.addEventListener("click", function() {
    localStorage.clear();
    favorites = [];
    favoritesEl.innerHTML = "";
})


// Refesh/Show button section
var showBtn = document.querySelector("#showBtn");

showBtn.addEventListener("click", function() {
    showBrewToo();
});