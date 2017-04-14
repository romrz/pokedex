
var app = angular.module('PokedexApp', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/main.html'
	})
	.when('/pokemones', {
		templateUrl: '/pokemons.html'
	});
});

