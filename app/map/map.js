
app.controller('MapController', function(NgMap, $http) {
	this.pokemons = [{position: {lat:15, lng:100}}];
	this.mapPosition = null;
	this.map = null;

	var mapCtrl = this;

	NgMap.getMap().then(function(map) {
		mapCtrl.map = map;

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};

				mapCtrl.mapPosition = pos;
				map.setCenter(pos);
		        mapCtrl.loadPokemons($http);
			}, function() {
				alert("Tu dispositivo no soporta geolocalizacion.")
			});
        }
	});

	var markers = [];

	this.loadPokemons = function($http) {
		for (var i = 0; i < 10; i++) {
			$http.get('https://pokeapi.co/api/v2/pokemon/' + randomInt(1, 800)).then(
				function(response) {
					var pokemon = response.data;

					var lat = mapCtrl.mapPosition.lat + randomInt(-1, 1) * Math.random() * 0.01;
					var lng = mapCtrl.mapPosition.lng + randomInt(-1, 1) * Math.random() * 0.01;

					pokemon.latlng = new google.maps.LatLng(lat, lng);
					mapCtrl.pokemons.push(pokemon);

					markers[i] = new google.maps.Marker({title: pokemon.name});
					markers[i].setPosition(pokemon.latlng);
					markers[i].setIcon(pokemon.sprites.front_default);
					markers[i].setMap(mapCtrl.map);
				},
				function(error) {
					console.log(error);
				}
			);
		}
	};
});

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomFloat(min, max) {
	return Math.random() * 0.01;
}