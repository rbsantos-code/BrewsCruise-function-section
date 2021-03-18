
var favoritesEl = document.querySelector(".favorites");

var favorites = JSON.parse(localStorage.getItem("brew-name")) | [];
console.log("favorites", favorites)

// Grab brew names from local storage
var barName = localStorage.getItem("brew-name");
console.log("name", barName);

// Function to show brewery name on page
function showBrew() {
    // favoritesEl.innerHTML = "";
    favoritesEl.innerHTML = "Brewery: " + barName;

}
showBrew();

// BUTTON FUNCTION SECTION --------

// clear button section
var clearBtn = document.querySelector("#clearBtn");

clearBtn.addEventListener("click", function() {
    // localStorage.clear();
    favoritesEl.innerHTML = "";
})

// refresh page function
function refreshPage() {
    window.location.reload();
}

// Refesh/Show button section
var showBtn = document.querySelector("#showBtn");

showBtn.addEventListener("click", refreshPage);