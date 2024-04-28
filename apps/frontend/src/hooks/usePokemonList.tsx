import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getAllPokemon, getAllTypes } from '../apis/setup.ts';

type pokemon = {
  pokeId: number;
  id: number;
  name: string;
  types: string[];
};

export function usePokemonList() {
  const [allPokemons, setAllpokemons] = useState<pokemon[]>([]);
  const [loop, setLoop] = useState(true);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['allPokemons'],
    queryFn: getAllPokemon,
  });

  const {
    data: dataType,
    isLoading: TypeisLoading,
    isError: TypeisError,
  } = useQuery({
    queryKey: ['getAllPokemonTypes'],
    queryFn: getAllTypes,
  });

  useEffect(() => {
    const pokemons: pokemon[] = [];

    if (!isLoading && !isError) {
      for (let i = 0; i < data.results.length; i++) {
        const id = Number(
          data.results[i].url
            .replace('https://pokeapi.co/api/v2/pokemon/', '')
            .replace('/', ''),
        );

        pokemons.push({
          pokeId: id,
          id: i + 1,
          name: data.results[i].name,
          types: [],
        });
      }
      if (dataType && !TypeisLoading && !TypeisError) {
        for (let i = 0; i < dataType.length; i++) {
          const pokemonInTypes = dataType[i].pokemon;

          for (let j = 0; j < pokemonInTypes.length; j++) {
            const pokemonId = Number(
              pokemonInTypes[j].pokemon.url
                .replace('https://pokeapi.co/api/v2/pokemon/', '')
                .replace('/', ''),
            );

            const pokemonFind = pokemons.find((p) => p.pokeId === pokemonId);
            if (pokemonFind) {
              pokemonFind.types.push(dataType[i].name);
            }
          }
        }
      }
    }

    setAllpokemons(pokemons);

    const timer = setTimeout(() => {
      setLoop(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [data, isLoading, isError, dataType, TypeisLoading, TypeisError]);

  return { allPokemons, loop };
}

//INFO: ou ce code :
// import { useQueries, useQuery } from '@tanstack/react-query';
// import { useEffect, useState } from 'react';
// import { getAllPokemon, getAllTypes } from '../apis/setup.ts';

// type pokemon = {
//   pokeId: number;
//   id: number;
//   name: string;
//   types: string[];
// };

// export function usePokemonList() {
//   const [allpokemons, setAllpokemons] = useState<pokemon[]>([]);

//   const { data, isLoading, isError, isSuccess } = useQuery({
//     queryKey: ['allPokemons'],
//     queryFn: getAllPokemon,
//   });

//   const getAllPokemonTypes = useQueries({
//     queries: Array.from({ length: 18 }, (_, i) => i + 1).map((id) => ({
//       queryKey: ['type', id],
//       queryFn: () => getAllTypes(id),
//     })),
//   });

//   useEffect(() => {
//     const pokemons: pokemon[] = [];

//     if (!isLoading && !isError && isSuccess) {
//       for (let i = 0; i < data.results.length; i++) {
//         const id = Number(
//           data.results[i].url
//             .replace('https://pokeapi.co/api/v2/pokemon/', '')
//             .replace('/', ''),
//         );

//         pokemons.push({
//           pokeId: id,
//           id: i + 1,
//           name: data.results[i].name,
//           types: [],
//         });
//       }

//       for (let i = 0; i < getAllPokemonTypes.length; i++) {
//         const pokemonInTypes = getAllPokemonTypes[i].data.pokemon;

//         for (let j = 0; j < pokemonInTypes.length; j++) {
//           const pokemonId = Number(
//             pokemonInTypes[j].pokemon.url
//               .replace('https://pokeapi.co/api/v2/pokemon/', '')
//               .replace('/', ''),
//           );

//           const pokemonFind = pokemons.find((p) => p.pokeId === pokemonId);
//           if (pokemonFind) {
//             pokemonFind.types.push(getAllPokemonTypes[i].data.name);
//           }
//         }
//       }
//     }

//     setAllpokemons(pokemons);
//   }, [data, isLoading, isError, isSuccess]);

//   return { allpokemons, isLoading, isError };
// }
