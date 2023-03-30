let map;
var carImage = document.getElementById("car");
//var carLocations = [{ "title": 'TmXfkjrFw', "lat": '42.3453', "lng": '-71.0464' }, { "title": 'nZXB8ZHz', "lat": '42.3662', "lng": '-71.0621' }, { "title": 'Tkwu74WC', "lat": '42.3603', "lng": '-71.0547' }, { "title": '5KWpnAJN', "lat": '42.3472', "lng": '-71.0802' }, { "title": 'uf5ZrXYw', "lat": '42.3663', "lng": '-71.0544' }, { "title": 'VMerzMH8', "lat": '42.3542', "lng": '-71.0704' }];
var userLat = '';
var userLng = '';
var params = '';
var userPos = '';
var xhr = new XMLHttpRequest();







async function initMap() {




    console.log("MAP");
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 42.352271, lng: -71.05524200000001 },
        zoom: 8,
    });
    infoWindow = new google.maps.InfoWindow();
    await geoLocate(userPos);
    
    console.log(userPos);
    userLat = userPos.lat;
    userLng = userPos.lng;
    console.log(userLat + "LAT");
    console.log(userLng + "LONG");
    params = "\"username=p5fjWJty&lat=" + userLat + "&lng=" + userLng + "\"";

    carLocations(userLat, userLng, params);

    infoWindow.setPosition(userPos);
    infoWindow.open(map);


    new google.maps.Marker({
        position: userPos,
        map,

    })
    map.setCenter(userPos);

    /*for (var i = 0; i < carLocations.length; i++) {
        var car = carLocations[i]
        var location = new google.maps.LatLng(car.lat, car.lng)
        carImage = new google.maps.MarkerImage('car.png');
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: carImage,
            title: car.title
        })*/
/*    function geoLocate(callback) {
        callback = (callback && typeof callback === 'function' && callback) || function () { };
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {

                    userPos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    callback(userPos)
                },

            );
        } else {
            callback(new Error('Browser does not support geolocation'));
        }
       
        
    }*/

    async function geoLocate(callback) {
        callback = (callback && typeof callback === 'function' && callback) || function () { };
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {

                    userPos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    console.log(userPos);
                    callback(userPos)
                },

            );
        } else {
            callback(new Error('Browser does not support geolocation'));
        }


    }

    async function carLocations(userLat, userLng, params) {

        await geoLocate(userPos);
        console.log(params);
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
        }

        xhr.send(params);
      


}








window.initMap = initMap;

