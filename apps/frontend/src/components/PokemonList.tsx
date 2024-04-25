type pokemon = {
  pokeId: number;
  id: number;
  name: string;
  types: string[];
};

type pokemonListsProps = {
  allPokemons: pokemon[];
};

function PokemonList({ allPokemons }: pokemonListsProps) {
  return (
    <div>
      <div>
        <div>Header</div>
        <input type="text" />
        <div>
          <i></i>
        </div>
      </div>
      <div>
        {allPokemons.map((value: pokemon) => {
          return (
            <div key={value.id}>
              <h2>{value.name}</h2>
              <p>{value.id}</p>
              <p>{value.types}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PokemonList;
