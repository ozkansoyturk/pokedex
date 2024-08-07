import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { css, cx } from '../../styled-system/css';
import { Center } from '../../styled-system/jsx';
import { dressUpPayloadValue } from '../apis/setup.ts';
import { Pokemon, pokemonListsProps } from '../types/pokemon.ts';
import PokemonInfo from './PokemonInfo.tsx';

const typeColors: { [key: string]: string } = {
  normal: '#BCBCAC',
  fighting: '#BC5442',
  flying: '#669AFF',
  poison: '#AB549A',
  ground: '#DEBC54',
  rock: '#BCAC66',
  bug: '#ABBC1C',
  ghost: '#6666BC',
  steel: '#ABACBC',
  fire: '#FF421C',
  water: '#2F9AFF',
  grass: '#78CD54',
  electric: '#FFCD30',
  psychic: '#FF549A',
  ice: '#78DEFF',
  dragon: '#7866EF',
  dark: '#785442',
  fairy: '#FFACFF',
  shadow: '#0E2E4C',
};

function PokemonList({ allPokemons }: pokemonListsProps) {
  const [maxIndex, setMaxIndex] = useState(30);
  const [search, setSearch] = useState('');
  const [currentPokemon, setCurrentPokemon] = useState<number | null>(null);

  const handleChildUpdate = (newCurrentPokemon: number | null) => {
    setCurrentPokemon(newCurrentPokemon);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight;

      if (isBottom && maxIndex <= allPokemons.length) {
        setMaxIndex(maxIndex + 30);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [maxIndex, allPokemons]);

  const searchBar = css({
    display: 'flex',
    flexDirection: 'row',
    rounded: '3xl',
    boxShadow: '#ededed 0 10px 10px',
    p: '15px',
    backgroundColor: 'white',
    m: '30px 0',
  });

  const concatPokemonDiv = cx(
    css({
      display: 'flex',
      maxH: '150px',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      flex: '0.5',
      minW: '56',
      xsToSm: { minW: '80' },
      m: '10px',
      mt: '60px',
      p: '15px',
      pt: '40px',
      position: 'relative',
      cursor: 'pointer',
      transitionDuration: '100ms',
      border: '2px solid white',
      rounded: '3xl',
      boxShadow: '#ededed 0 10px 10px',
      backgroundColor: 'white',
      _hover: {
        border: '2px solid #e0e0e0',
      },
    }),
    'group',
  );

  return (
    <>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          h: '100%',
          w: '100%',
          lg: { mr: '350px' },
          fontFamily: '"Outfit", sans-serif',
        })}
      >
        <div className={searchBar}>
          <input
            placeholder="Search your Pokemon"
            type="text"
            onChange={(e) => setSearch(e.currentTarget.value)}
            className={css({
              border: 'none',
              outline: 'none',
              fontSize: '18px',
              flex: '1',
            })}
          />
          <Center
            className={css({
              backgroundColor: '#ff5350',
              height: '40px',
              width: '40px',
              rounded: '10px',
              cursor: 'pointer',
              boxShadow: '#ff535088 5px 5px 15px',
              color: 'white',
              fontSize: '18px',
              _hover: {
                opacity: '0.8',
                boxShadow: '#ff53509c 3px 3px 13px',
              },
            })}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Center>
        </div>

        <div
          className={css({
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            w: '100%',
          })}
        >
          {allPokemons
            .filter((value: Pokemon) =>
              dressUpPayloadValue(value.name)
                .toLowerCase()
                .includes(search.toLowerCase()),
            )
            .slice(0, maxIndex)
            .map((value: Pokemon) => {
              return (
                <div
                  onClick={() => setCurrentPokemon(value.id)}
                  key={value.id}
                  className={concatPokemonDiv}
                >
                  <img
                    className={css({
                      _groupHover: { transform: 'scale(1.15)' },
                      position: 'absolute',
                      top: '-55',
                    })}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${value.id}.png`}
                  />
                  <span
                    className={css({
                      fontWeight: 'bold',
                      fontSize: '12px',
                      color: '#8f9396',
                    })}
                  >
                    N° {value.id}
                  </span>
                  <h3
                    className={css({
                      color: '#011030',
                      margin: '5px',
                      textAlign: 'center',
                      display: 'blok',
                      fontSize: '1.17rem',
                      fontWeight: 'bold',
                      unicodeBidi: 'isolate',
                    })}
                  >
                    {dressUpPayloadValue(value.name)}
                  </h3>
                  <div
                    className={css({ display: 'flex', flexDirection: 'row' })}
                  >
                    {value.types.map((type, index) => {
                      const monStyle = {
                        background: typeColors[type],
                      };

                      return (
                        <div
                          className={css({
                            rounded: '5px',
                            p: '3px 7px',
                            color: 'black',
                            m: '5px',
                            mt: '10px',
                            fontWeight: '600',
                            fontSize: '14px',
                            opacity: '0.8',
                          })}
                          style={monStyle}
                          key={index}
                        >
                          {dressUpPayloadValue(type)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <PokemonInfo
        pokemonInfo={currentPokemon}
        handleChildUpdate={handleChildUpdate}
      />
    </>
  );
}

export default PokemonList;
