// INFO: fetch pokemon name and id
export async function getAllPokemon() {
  try {
    const getPokemonCount = await fetch('https://pokeapi.co/api/v2/pokemon/');
    const pokemonCountResponse = await getPokemonCount.json();
    const totalPokemons = pokemonCountResponse.count;
    const pokemonApiUrl =
      'https://pokeapi.co/api/v2/pokemon/?limit=' + totalPokemons;

    const getPokemonList = await fetch(pokemonApiUrl);
    const responseAsJson = await getPokemonList.json();
    return responseAsJson;
  } catch (error) {
    console.error('Une erreur est survenue :', error);
  }
}

// INFO: fetch pokemon types
export async function getAllTypes() {
  const urls = Array.from(
    { length: 18 },
    (_, i) => `https://pokeapi.co/api/v2/type/${i + 1}`,
  );

  const responses = await Promise.all(urls.map((url) => fetch(url)));
  const jsonResponses = await Promise.all(
    responses.map((response) => response.json()),
  );
  // const pokemonsInTypes = jsonResponses.map((response) => response);

  return jsonResponses;
}

export async function getPokemonInfo(id: number) {
  const urlPokemon = 'https://pokeapi.co/api/v2/pokemon/' + id;
  const urlSpecies = 'https://pokeapi.co/api/v2/pokemon-species/' + id;

  const responsePokemon = await fetch(urlPokemon);
  const responseSpecies = await fetch(urlSpecies);

  const pokemon = await responsePokemon.json();
  const species = await responseSpecies.json();

  const responseEvolutions = await fetch(species.evolution_chain.url);
  const evolution_chain = await responseEvolutions.json();
  return [pokemon, species, evolution_chain];
}

export function dressUpPayloadValue(string: string) {
  const splitStr = string.toLowerCase().split('-');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}

export function getId(url: string) {
  return Number(
    url
      .replace('https://pokeapi.co/api/v2/pokemon-species/', '')
      .replace('/', ''),
  );
}

// export async function getAllTypes(id: number) {
//   const getAllTypes = await fetch('https://pokeapi.co/api/v2/type/' + id);

//   const responseAsJson = await getAllTypes.json();
//   return responseAsJson;
// }
