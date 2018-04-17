var country     = document.getElementById("country"),
    state       = document.getElementById("state"),
    city        = document.getElementById("city"),
    positionData = {};

//callback to run after receiving the GEOIP DB data
function callback(ipLocation) {
    //pass the Gathered Geolocation users data to global variable
    positionData = ipLocation;

    //Select the users country
    var countryOption = document.createElement("option");
    var countryOptionText = document.createTextNode(positionData.country_name);
    countryOption.appendChild(countryOptionText);
    country.appendChild(countryOption);

    //Run State and Cities Slection Logic
    displayStatesOptions(positionData);
    displayCitiesOptions(positionData);
}

//Gets the Country code and search for its states
var displayStatesOptions = function(ipLocation){
    admin1Codes.forEach(function(element){
        if (element.countryCode === ipLocation.country_code){
            var stateOption = document.createElement("option");
            stateOption.appendChild(document.createTextNode(element.adminName1));
            stateOption.value = element.admin1Code;
            state.appendChild(stateOption);
        }
    });
}

//Gets the State code (Admin1Code) adn search its cities
var displayCitiesOptions = function (ipLocation) {
    state.addEventListener("change", function(){
        var selectedAdmin1Code = state.options[state.selectedIndex].value;
        while(city.lastChild.value != "default"){
            city.removeChild(city.lastChild);
        }
        city.value = "default";
        cities.forEach(function (element) {
            if (element.countryCode === ipLocation.country_code &&
                element.admin1Code.toString() === selectedAdmin1Code) {
                var cityOption = document.createElement("option");
                cityOption.appendChild(document.createTextNode(element.cityName));
                cityOption.value = '{"lat":'+ element.lat +', "lng":'+ element.lng +'}';
                city.appendChild(cityOption);
            }
        });
    });
}
/**==========================
 * Map related logic
 * ==========================
 */

//Change the location of the map depending on the selected info above
city.addEventListener('change', function(){
    var cityCoordinates = JSON.parse(city.options[city.selectedIndex].value);
    map.panTo(cityCoordinates);
});

// Reverse Geocoding function
function reverseGeocode(geocoder, map, infowindow, marker) {
    var position = {};
        position.lat = marker.getPosition().lat();
        position.lng = marker.getPosition().lng();
    geocoder.geocode({ 'location': position }, function (results, status) {
        if (status === 'OK') {
            if (results[1]) {
                map.setZoom(16);
                infowindow.setContent(results[1].formatted_address);
                infowindow.open(map, marker);
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}
// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}
// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    setMapOnAll(null);
    markers = [];
}
// Adds marker to location
function placeMarker(latLng, map, controlUI) {
    if (controlUI.classList.contains('activeControl')){
        deleteMarkers();
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
        markers.push(marker);
        map.panTo(latLng);
        controlUI.classList.remove('activeControl');
        document.getElementById('devGroundLat').value = marker.getPosition().lat();
        document.getElementById('devGroundLng').value = marker.getPosition().lng();
    }
}

/**
 * The CenterControl adds a control to the map that recenters the map on
 * Chicago.
 * This constructor takes the control DIV as an argument.
 * @constructor
 */
function RightControl(controlDiv, map) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.id = "placePicker";
    controlUI.title = 'Click to select the position of your dev_Ground';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.id = "placePickerText";
    controlText.innerHTML = '<i class="fas fa-map-marker"></i>';
    controlUI.appendChild(controlText);

    // Add and remove active class
    controlUI.addEventListener('click', function () {
        controlUI.classList.toggle('activeControl');
    });
}
// Itinialize map
var map,
    markers = [];
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: positionData.latitude || -34.397,
            lng: positionData.longitude || 150.644
        },
        streetViewControl: false,
        mapTypeControl: false,
        zoom: 10
    });

    // Create the DIV to hold the control and call the RightControl()
    // constructor passing in this DIV.
    var rightControlDiv = document.createElement('div');
    var rightControl = new RightControl(rightControlDiv, map);
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    
    map.controls[google.maps.ControlPosition.RIGHT].push(rightControlDiv); 
    
    map.addListener('click', function (event) {
        var controlUI = document.getElementById('placePicker');
        placeMarker(event.latLng, map, controlUI);
        reverseGeocode(geocoder, map, infowindow, markers[0]);
    });
}