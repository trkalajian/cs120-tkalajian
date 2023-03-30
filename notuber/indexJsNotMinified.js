let map;
var carImage = document.getElementById("car");
var userLat = '';
var userLng = '';
var params = '';
var xhr = new XMLHttpRequest();
var userLoc = '';
var username = "p5fjWJty";

var car = '';

async function initMap() {
    const { Geometry } = await google.maps.importLibrary("geometry");
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 42.352271, lng: -71.05524200000001 },
        zoom: 8,
    });
    infoWindow = new google.maps.InfoWindow();

    async function geoLocate() {
        if (navigator.geolocation) {
            const pos = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject)
            });
            return await {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            };
        } else {
            (new Error('Browser does not support geolocation'));
        }

    }
    userPos = await geoLocate();
    userLat = userPos.lat.toString();
    userLng = userPos.lng.toString();
    params = "username=" + username + "&lat=" + userLat + "&lng=" + userLng;
    carLocations(params);
    infoWindow.open(map);
    new google.maps.Marker({
        position: userPos,
        map,

    })
    map.setCenter(userPos);

    async function carLocations(params) {

        var url = 'https://jordan-marsh.herokuapp.com/rides';

        xhr.open('POST', url, true);

        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                alert(this.responseText);
                data = xhr.responseText;
                carData = JSON.parse(data);
                var minDistance = Number.MAX_SAFE_INTEGER;
                var minLat = '';
                var minLng = '';
                var minCar = '';
                for (var i = 0; i < carData.length; i++) {
                    var car = carData[i]
                    var location = new google.maps.LatLng(car.lat, car.lng)
                    distance = google.maps.geometry.spherical.computeDistanceBetween(location, userPos);
                    if (minDistance > distance) {
                        minDistance = distance;
                        minLat = car.lat;
                        minLng = car.lng;
                        minCar = car.username;
                    }
                    carImage = new google.maps.MarkerImage('car.png'); var marker = new google.maps.Marker({ position: location, map: map, icon: carImage, title: car.username })


                    google.maps.event.addListener(marker, 'click', (function (marker) {
                        var contentString = '<div id="infoWindow">'
                            + '<div id="bodyContent">'
                            + '<p>'
                            + "This vehicale is "
                            + distance
                            + " miles away" + '</p>'
                            + '</div>'
                            + '</div>';

                        return function () {
                            infoWindow.setContent(boxList[this.id]);
                            infoWindow.open(map, marker);
                        }
                    }));
                }
                const distanceLineCoordinates = [{ lat: minLat, lng: minLng }, { lat: Number(userLat), lng: Number(userLng) }];
                const distanceLine = new google.maps.Polyline({
                    path: distanceLineCoordinates,
                    geodesic: true,
                    strokeColor: "#FF0000",
                    strokeOpacity: 1.0,
                    strokeWeight: 2,

                });
                distanceLine.setMap(map);
            }
        }
        xhr.send(params);


    }






}








window.initMap = initMap;

