app.directive('pokedex', function() {
	return {
		restrict: 'E',
		templateUrl: 'app/pokedex/pokedex.html',
		controllerAs: 'pokedex',
		controller: ['$http', function($http) {
			this.pokemons = [];
			this.pokemon = null;
			this.loading = false;

			this.url = 'https://pokeapi.co/api/v2/pokemon?limit=21';

			var pokedex = this;

			this.getPokemons = function() {
				pokedex.loading = true;

				$http.get(pokedex.url).then(
					function(response) {
						pokedex.pokemons = pokedex.pokemons.concat(response.data.results);
						pokedex.url = response.data.next;
						pokedex.loading = false;
					},
					function(error) {
						console.log(error);
					}
				);
			};

			this.getPokemons();

			this.showPokemon = function(pokemonUrl) {
				pokedex.pokemon = null;
				$http.get(pokemonUrl).then(
					function(response) {
						pokedex.pokemon = response.data;
					},
					function(error) {
						console.log(error);
					}
				);
			};

			this.hidePokemon = function() {
				this.pokemonVisible = false;
				this.pokemon = null;
			};

		}]
	};
});