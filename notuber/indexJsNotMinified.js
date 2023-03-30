let map;
var carImage = document.getElementById("car");
var userLat = '';
var userLng = '';
var params = '';
var xhr = new XMLHttpRequest();
var userLoc = '';
var username = "p5fjWJty";




async function initMap() {




    console.log("MAP");
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

    //params = '\"username=' + encodeURIComponent(username) + '&lat=' + encodeURIComponent(userLat) + '&lng=' + encodeURIComponent(userLng) + '\"';
    params = "username=" + username + "&lat=" + userLat + "&lng=" + userLng;

    //params = "username=p5fjWJty&lat=42.789&lng=-71.567";

    carLocations(userLat, userLng, params);

    //infoWindow.setPosition(userPos);
    infoWindow.open(map);


    new google.maps.Marker({
        position: userPos,
        map,

    })
    map.setCenter(userPos);

    async function carLocations(userLat, userLng, params) {

        var url = 'https://jordan-marsh.herokuapp.com/rides';
        console.log(url);

        xhr.open('POST', url, true);

        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                alert(this.responseText);
                console.log("In here");
                data = xhr.responseText;
                console.log(data);
                carData = JSON.parse(data);

            }
        }
        console.log(params);
        xhr.send(params);
    }
  



}








window.initMap = initMap;

