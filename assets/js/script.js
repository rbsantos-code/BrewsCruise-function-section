// (function() {
//     var cors_api_host = 'cors-anywhere.herokuapp.com';
//     var cors_api_url = 'https://' + cors_api_host + '/';
//     var slice = [].slice;
//     var origin = window.location.protocol + '//' + window.location.host;
//     var open = XMLHttpRequest.prototype.open;
//     XMLHttpRequest.prototype.open = function() {
//         var args = slice.call(arguments);
//         var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
//         if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
//             targetOrigin[1] !== cors_api_host) {
//             args[1] = cors_api_url + args[1];
//         }
//         return open.apply(this, args);
//     };
// })();


var inputEl = document.querySelector(".input");

// Modal Section
var searchButton = document.querySelector("#searchBtn");
var modalEl = document.querySelector(".modal");
var modalBg = document.querySelector(".modal-background");
var closeBtn = document.querySelector(".delete");
var closeBtnBottom = document.querySelector("#close");

searchButton.addEventListener("click", function() {
    modalEl.classList.add("is-active");
    var enterCity = inputEl.value.split("").join("");
    findBrewery(enterCity);
});

modalBg.addEventListener("click", function() {
    modalEl.classList.remove("is-active");
});
closeBtn.addEventListener("click", function() {
    modalEl.classList.remove("is-active");
})
closeBtnBottom.addEventListener("click", function() {
    modalEl.classList.remove("is-active");
})


// Brewery API Section
function findBrewery(city) {

    let breweryAPI = "https://api.openbrewerydb.org/breweries?by_city=" + city

    fetch(breweryAPI).then(response => response.json()).then(data => console.log(data));
    // console.log to get API info

    fetch(breweryAPI).then(response => response.json()).then(function(data) {
        data.forEach(element => console.log("data",element.name));
        // console log info for each name element
        var labelsEl = document.querySelectorAll("#brewery");
        for (var i = 0; i < labelsEl.length; i++) {
            labelsEl[i].innerHTML = "";

            var nameData = data[i].name;
            var names = document.createElement("p");

            names.innerHTML = "* Brewery: " + nameData;
            labelsEl[i].append(names);


            // get Brew Type
            var type = data[i].brewery_type;
            var brewType = document.createElement("h2");

            brewType.innerHTML = "Type: " + type;
            labelsEl[i].append(brewType);

            // get Address

            var address = data[i].street;
            var brewAddy = document.createElement('h2');

            brewAddy.innerHTML = "address: " + address;
            labelsEl[i].append(brewAddy);

            // Create Add Button to add to Local Storage

            var localAdd = document.createElement("a");
            localAdd.setAttribute("class", "button is-info");
            localAdd.setAttribute("id", "localAddBtn");

            localAdd.innerHTML = "Add";
            labelsEl[i].append(localAdd);

            // get Website

            var website = data[i].website_url;
            var webAddress = document.createElement("a");
            webAddress.classList.add("button", "is-info");
            webAddress.setAttribute("id", "websiteBtn")
            webAddress.setAttribute("href", data[i].website_url);
           

            webAddress.innerHTML = "Website";
            labelsEl[i].append(webAddress);


            // Dynamic Click Event Section
            var lat = data[i].latitude;
            var lon = data[i].longitude;
            var title = data[i].name;
            localAdd.dataset.lat = lat;
            localAdd.dataset.lon = lon;
            localAdd.dataset.title = title;
            localAdd.dataset.address = address;

            // Click Event to call GetMap on Names
            names.addEventListener("click", function() {
                GetMap(this.dataset.lat,this.dataset.lon,this.dataset.title,this.dataset.address);

            })

            localAdd.addEventListener("click", function() {
                
                var namesValue = [this.dataset.title];
                console.log("namesValue", namesValue);
                var namesArray = JSON.parse(localStorage.getItem("brew-name")) || [];
                console.log("namesArray", namesArray);
                namesArray.push(namesValue);
                
                // set to Local Storage
                localStorage.setItem("brew-name", JSON.stringify(namesArray))
            })

        }


     // Experiement with MAP API---------

     var lat = data[i].latitude;
     var lon = data[i].longitude;
     var locationPoint = [lat, lon];
     console.log("locationPoint",locationPoint);
     var postalCode = data[i].postal_code;
     var barName = data[i].name;
     var street = data[i].street;

     var mapKey = "Ava6c7xEN-FISpqll60LNKEhdYNkr0RGC2jZoFb2l02vg2lTmQ3aLT8BFWivGKEO"

    let mapAPI = `http://dev.virtualearth.net/REST/v1/Locations?countryRegion=us&postalCode=${postalCode}&addressLine=${address}&maxResults=5&key=${mapKey}`;

     console.log("mapAPI", mapAPI);

     fetch(mapAPI).then(response => response.json()).then(map => console.log("map",map));

    // Bing Maps function -------------

    function GetMap(latitude,longitude,barTitle,address) {
        console.log("maplog", latitude,longitude,barTitle,address);
        var map = new Microsoft.Maps.Map('.map', {
            credentials: mapKey,
            center: new Microsoft.Maps.Location(latitude, longitude)
        });
        console.log("map", map);

        var center = map.getCenter();

        //Create custom Pushpin
        var pin = new Microsoft.Maps.Pushpin(center, {
            title: barTitle,
            subTitle: address,
            text: '!'
        });

        //Add the pushpin to the map
        map.entities.push(pin);

    }

    GetMap(lat,lon,barName,street);




     // Experiement with BART API (NOT IN USE)---------

    //  var bartKey = "MW9S-E7SL-26DU-VV8V";
    //  var bartURL = "http://api.bart.gov/api/stn.aspx?cmd=stns&key=" + bartKey + "&json=y";

    //  fetch(bartURL).then(response => response.json()).then(bart => console.log(bart));
    //  // console log to see BART API

    //  fetch(bartURL).then(response => response.json()).then(function(bart) {

    //      var bartStationEl = document.querySelectorAll("#bartData");
    //      for (var j = 0; j < bartStationEl.length; j++) {
    //          bartStationEl[j].innerHTML = "";

    //         // Data for Bart Stations
    //          var stations = bart.root.stations.station[j].name;
    //          var stationsEl = document.createElement("h2");

    //          stationsEl.innerHTML = "Station: " + stations;
    //          bartStationEl[j].append(stationsEl);

    //         // Data for Bart City

    //         var cityStation = bart.root.stations.station[j].city;
    //         console.log(cityStation);
    //         var cityStationEl = document.createElement("p");

    //         cityStationEl.innerHTML = "City: " + cityStation;
    //         bartStationEl[j].append(cityStationEl);
          
    //         }
    //     });

    
    })
 
};

