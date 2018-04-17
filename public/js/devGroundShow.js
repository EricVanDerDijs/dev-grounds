
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
// Adds marker to location
function placeMarker(latLng, map) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
    markers.push(marker);
}
// Itinialize map
var map,
    mapMobile,
    markers = [],
    mapOptions = {
        center: devGroundPos,
        streetViewControl: false,
        mapTypeControl: false,
        zoom: 10
    };
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    mapMobile = new google.maps.Map(document.getElementById('mapMobile'), mapOptions);

    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow({
        disableAutoPan: true,
        maxWidth: 120
    });    
    placeMarker(devGroundPos, map);
    reverseGeocode(geocoder, map, infowindow, markers[0]);
    placeMarker(devGroundPos, mapMobile);
    reverseGeocode(geocoder, mapMobile, infowindow, markers[1]);
}