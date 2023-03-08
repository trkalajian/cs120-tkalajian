let map;

var carLocations = [
    ['TmXfkjrFw', 42.3453, -71.0464],
    ['nZXB8ZHz', 42.3662, -71.0621],
    ['Tkwu74WC', 42.3603, -71.0547],
    ['5KWpnAJN', 42.3472, -71.0802],
    ['uf5ZrXYw', 42.3663, -71.0544],
    ['VMerzMH8', 42.3542, -71.0704]
];
var carLocations = [
    {
        "title": 'TmXfkjrFw',
        "lat": '42.3453',
        "lng": '-71.0464'
    },
    {
        "title": 'nZXB8ZHz',
        "lat": '42.3662',
        "lng": '-71.0621'
    },
    {
        "title": 'Tkwu74WC',
        "lat": '42.3603',
        "lng": '-71.0547'
    },
    {
        "title": '5KWpnAJN',
        "lat": '42.3472',
        "lng": '-71.0802'
    },
    {
        "title": 'uf5ZrXYw',
        "lat": '42.3663',
        "lng": '-71.0544'
    },
    {
        "title": 'VMerzMH8',
        "lat": '42.3542',
        "lng": '-71.0704'
    }
];
var carImage = document.getElementById("car");

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 42.352271, lng: -71.05524200000001},
        zoom: 8,
    });
    for (var i = 0; i < carLocations.length; i++) {
        var car = carLocations[i]
        var location = new google.maps.LatLng(car.lat, car.lng)
        carImage = new google.maps.MarkerImage('car.png');
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: carImage,
            title: car.title
        })

    }
}

window.initMap = initMap;
