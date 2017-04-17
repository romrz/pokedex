
app.controller('MapController', function(NgMap, $http) {
	// Marker list
	this.markers = [];

	// Current map location
	this.position = null;

	// Map's reference
	this.map = null;

	// Reference to this controller 
	var mapCtrl = this;

	// Get the map instance and set the center position to the
	// current user's location
	NgMap.getMap().then(function(map) {
		mapCtrl.map = map;

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};

				mapCtrl.position = pos;
				map.setCenter(pos);
		        mapCtrl.loadPokemons($http);
			}, function(error) {
				alert(error)
			});
        }
	});

	/*
	 * Load ten random pokemons to show them on the map
	 */
	this.loadPokemons = function($http) {
		mapCtrl.removeMarkers();

		for (var i = 0; i < 10; i++) {
			mapCtrl.loadPokemon();
		}
	};

	/*
	 * Load a random pokemon and adds it to the map
	 */
	this.loadPokemon = function() {
		$http.get('https://pokeapi.co/api/v2/pokemon/' + randomInt(1, 800)).then(
			function(response) {
				var pokemon = response.data;
				mapCtrl.addMarker(pokemon);
			},
			function(error) {
				console.log(error);
			}
		);
	}

	/*
	 * Add a marker to the map with the pokemon's information
	 * @var pokemon Pokemon
	 */
	this.addMarker = function(pokemon) {
		var marker = new google.maps.Marker({
			title: pokemon.name,
			position: mapCtrl.getRandomLocation(),
			icon: pokemon.sprites.front_default,
			map: mapCtrl.map,
		});

		mapCtrl.markers.push(marker);
	}

	/*
	 * Remove all the markers from the map
	 */
	this.removeMarkers = function() {
		for (var i = mapCtrl.markers.length - 1; i >= 0; i--) {
			mapCtrl.markers[i].setMap(null);
		}

		mapCtrl.markers = [];
	};

	/*
	 * Get a random location near the user's position
	 */
	this.getRandomLocation = function() {
		return new google.maps.LatLng({
			lat: mapCtrl.position.lat + randomInt(-1, 1) * Math.random() * 0.01,
			lng: mapCtrl.position.lng + randomInt(-1, 1) * Math.random() * 0.01
		});
	}
});

/*
 * Returns a random integer between min and max
 * @var min int
 * @var max int
 */
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
