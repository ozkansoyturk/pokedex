export type Pokemon = {
  pokeId: number;
  id: number;
  name: string;
  types: string[];
};

export type PokemonContainerProps = {
  pokemonInfo: number | null;
};

export type Description = {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
};

export type Stats = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type pokemonListsProps = {
  allPokemons: Pokemon[];
};

export type PokemonTypes = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};
