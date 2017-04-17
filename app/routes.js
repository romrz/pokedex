app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'main.html'
	})
	.when('/pokemones', {
		templateUrl: 'pokemons.html'
	})
	.when('/map', {
		templateUrl: 'map.html'
	});
});

