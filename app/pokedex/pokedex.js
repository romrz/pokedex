app.directive('pokedex', function() {
	return {
		restrict: 'E',
		templateUrl: 'app/pokedex/pokedex.html',
		controllerAs: 'pokedex',
		controller: ['$http', function($http) {
			// Pokemon list
			this.pokemons = [];

			// Current pokemon being shown
			this.pokemon = null;

			// Whether new pokemons are being loaded
			this.loading = false;

			// The next url to get the pokemons
			this.url = 'https://pokeapi.co/api/v2/pokemon?limit=21';

			// reference to this controller
			var pokedex = this;

			/*
			 * Load pokemons.
			 * It starts loading after the last pokemon loaded and gets
			 * 21 pokemons.
			 */
			this.loadPokemons = function() {
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

			/*
			 * Get the details of the specified pokemon.
			 * @var pokemonUrl string
			 */
			this.loadPokemon = function(pokemonUrl) {
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


			// Load the first bunch of pokemons
			this.loadPokemons();

		}]
	};
});