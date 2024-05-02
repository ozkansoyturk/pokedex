import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { css, cx } from '../../styled-system/css';
import { dressUpPayloadValue, getId, getPokemonInfo } from '../apis/setup.ts';
import noPokemonSelected from '../assets/no-pokemon-selected-image.png';
import {
  Description,
  PokemonContainerProps,
  PokemonTypes,
  Stats,
} from '../types/pokemon.ts';

function PokemonContainer({ pokemonInfo }: PokemonContainerProps) {
  const [selectedPokemon, setSelectedPokemon] = useState<number | null>(null);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['selectedPokemon', selectedPokemon],
    queryFn: () =>
      selectedPokemon !== null
        ? getPokemonInfo(selectedPokemon)
        : Promise.resolve(null),
    enabled: !!selectedPokemon,
  });

  useEffect(() => {
    setSelectedPokemon(pokemonInfo);
  }, [pokemonInfo]);

  const handlePokemonClick = (id: number) => {
    return () => {
      setSelectedPokemon(id);
    };
  };

  let description = '';
  if (data && selectedPokemon) {
    data[1].flavor_text_entries.find((p: Description) =>
      p.language.name === 'fr' ? (description = p.flavor_text) : null,
    );
  }

  // INFO: CSS STYLE ---->
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

  const colorStat: { [key: string]: string } = {
    hp: '#df2140',
    attack: '#ff994d',
    defense: '#eecd3d',
    'special-attack': '#85ddff',
    'special-defense': '#96da83',
    speed: '#fb94a8',
  };

  const imageEvolutionStyle = css({
    cursor: 'pointer',
  });

  const containerImage = css({
    h: '288px',
    position: 'absolute',
    right: '0',
    left: '0',
    bottom: '77vh',
    mr: 'auto',
    ml: 'auto',
    objectFit: 'contain',
    imageRendering: 'pixelated',
    maxW: '350px',
    maxH: '22vh',
  });

  const allDiv = css({
    display: 'flex',
    hideBelow: 'lg',
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'column',
    w: '350px',
    h: '82vh',
    m: '10px',
    position: 'fixed',
    right: 'calc(10vw - 20px)',
    p: '0 15px',
    textAlign: 'center',
    bottom: '0',
    marginBottom: '0',
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0',
    // zIndex: '2',
    // left: '50%',
    // transform: 'translateX(-50%)',
    rounded: '20px',
    boxShadow: '#ededed 0 10px 10px',
    backgroundColor: 'white',
    zIndex: '2',
  });

  const slideOut = css({
    animation: 'slideOut ease-in-out 0.35s forwards',
  });

  const loadingOut = cx(allDiv, isLoading ? slideOut : '');

  const slideIn = css({
    animation: 'slideIn ease-in-out 0.35s forwards',
  });

  const loadingIn = cx(allDiv, isSuccess ? slideIn : '');

  return (
    <>
      {!isSuccess && (
        <div className={loadingOut}>
          <div>
            <img
              className={css({
                position: 'absolute',
                right: '0',
                left: '0',
                bottom: '77vh',
                marginRight: 'auto',
                marginLeft: 'auto',
                objectFit: 'contain',
                imageRendering: 'pixelated',
                maxWidth: '350px',
                maxHeight: '22vh',
              })}
              src={noPokemonSelected}
            />
            <span
              className={css({ fontSize: '18px !important', color: '#8f9396' })}
            >
              Select a Pokemon
              <br />
              to display here.
            </span>
          </div>
        </div>
      )}

      {/* INFO: */}

      {selectedPokemon && data && !isLoading && isSuccess && (
        <div className={loadingIn}>
          {selectedPokemon >= 650 ? (
            <img
              className={containerImage}
              id="current-pokemon-image"
              src={
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/' +
                selectedPokemon +
                '.png'
              }
            />
          ) : (
            <img
              className={containerImage}
              src={
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/' +
                selectedPokemon +
                '.gif'
              }
            />
          )}
          <div
            className={css({
              marginTop: '12vh',
              h: '100%',
              display: 'flex',
              flexDirection: 'column',
              scrollbarWidth: 'none',
              overflowY: 'scroll',
            })}
          >
            {/*INFO: <!--Id--> */}
            <span
              className={css({
                fontWeight: 'bold',
                fontSize: '12px',
                color: '#8f9396',
              })}
            >
              N° {selectedPokemon}
            </span>

            {/*INFO: <!--name--> */}

            <h2
              className={css({
                color: '#011030',
                margin: '5px',
                textAlign: 'center',
                display: 'blok',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                unicodeBidi: 'isolate',
              })}
            >
              {dressUpPayloadValue(data[0].name)}
            </h2>

            {/*INFO: <!--types--> */}
            <div
              className={css({
                display: 'flex',
                justifyContent: 'center',
              })}
            >
              {data[0].types.map((type: PokemonTypes, index: number) => {
                const monStyle = {
                  background: typeColors[type.type.name],
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
                    {dressUpPayloadValue(type.type.name)}
                  </div>
                );
              })}
            </div>

            {/*INFO: <!--description--> */}

            <h4 className={css({ fontWeight: 'bold' })}>Pokedex Entry</h4>

            <span id="current-pokemon-description">{description}</span>

            {/*INFO: <!--height and weight--> */}

            <div className="row center">
              <div className="width-100 column center margin-5">
                <h4 className={css({ fontWeight: 'bold' })}>Height</h4>
                <div
                  id="current-pokemon-height"
                  className="pokemon-info-variable-container"
                >
                  {data[0].height / 10} m
                </div>
              </div>
              <div className="width-100 column center margin-5">
                <h4 className={css({ fontWeight: 'bold' })}>Weight</h4>
                <div
                  id="current-pokemon-weight"
                  className="pokemon-info-variable-container"
                >
                  {data[0].weight / 10} kg
                </div>
              </div>
            </div>

            {/*INFO: <!--abilities--> */}

            <div className="column">
              <h4 className={css({ fontWeight: 'bold' })}>Abilities</h4>
              <div className="row">
                <div
                  id="current-pokemon-abilitiy-0"
                  className="pokemon-info-variable-container"
                >
                  {dressUpPayloadValue(data[0].abilities[0].ability.name)}
                </div>
                {data[0].abilities[1] && (
                  <div
                    id="current-pokemon-abilitiy-1"
                    className="pokemon-info-variable-container"
                  >
                    {dressUpPayloadValue(data[0].abilities[1].ability.name)}
                  </div>
                )}
              </div>
            </div>

            {/*INFO: <!--stats--> */}

            <h4 className={css({ fontWeight: 'bold' })}>Stats</h4>
            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              })}
            >
              {data[0].stats.map((current: Stats, i: number) => {
                const colorStatStyle = {
                  background: colorStat[current.stat.name],
                };

                switch (current.stat.name) {
                  case 'hp':
                    current.stat.name = 'HP';
                    break;
                  case 'attack':
                    current.stat.name = 'ATK';
                    break;
                  case 'defense':
                    current.stat.name = 'DEF';
                    break;
                  case 'special-attack':
                    current.stat.name = 'SpA';
                    break;
                  case 'special-defense':
                    current.stat.name = 'SpD';
                    break;
                  case 'speed':
                    current.stat.name = 'SPD';
                    break;
                }

                return (
                  <div
                    className={css({
                      display: 'flex',
                      flexDirection: 'column',
                      p: '5px',
                      m: '5px',
                      bg: '#F6F8FC',
                      rounded: '30px',
                    })}
                    key={i}
                  >
                    <div
                      className={css({
                        rounded: '50%',
                        h: '25px',
                        w: '25px',
                        color: 'white',
                        fontWeight: 'bold',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '10px',
                      })}
                      style={colorStatStyle}
                    >
                      {current.stat.name}
                    </div>
                    <h5 className={css({ m: '6px 0' })}>{current.base_stat}</h5>
                  </div>
                );
              })}

              <div
                className={css({
                  display: 'flex',
                  flexDirection: 'column',
                  p: '5px',
                  m: '5px',
                  bg: '#F6F8FC',
                  rounded: '30px',
                })}
              >
                <div
                  className={css({
                    rounded: '50%',
                    h: '25px',
                    w: '25px',
                    color: 'white',
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '10px',
                    bg: '#7195dc',
                  })}
                >
                  TOT
                </div>
                <h5 className={css({ m: '6px 0' })}>
                  {data[0].stats[0].base_stat +
                    data[0].stats[1].base_stat +
                    data[0].stats[2].base_stat +
                    data[0].stats[3].base_stat +
                    data[0].stats[4].base_stat +
                    data[0].stats[5].base_stat}
                </h5>
              </div>
            </div>

            {/*INFO: <!--Evolution chain--> */}

            {data[2].chain.evolves_to.length !== 0 && (
              <div>
                <h4 className={css({ fontWeight: 'bold' })}>Evolution</h4>
                <div
                  className={css({
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  })}
                >
                  <img
                    className={imageEvolutionStyle}
                    src={
                      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
                      getId(data[2].chain.species.url) +
                      '.png'
                    }
                    onClick={handlePokemonClick(
                      getId(data[2].chain.species.url),
                    )}
                  />
                  <div>Lv. 16</div>
                  <img
                    className={imageEvolutionStyle}
                    src={
                      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
                      getId(data[2].chain.evolves_to[0].species.url) +
                      '.png'
                    }
                    onClick={handlePokemonClick(
                      getId(data[2].chain.evolves_to[0].species.url),
                    )}
                  />
                  {data[2].chain.evolves_to[0].evolves_to[0] && (
                    <>
                      <div>Lv. 36</div>
                      <img
                        className={imageEvolutionStyle}
                        src={
                          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
                          getId(
                            data[2].chain.evolves_to[0].evolves_to[0].species
                              .url,
                          ) +
                          '.png'
                        }
                        onClick={handlePokemonClick(
                          getId(
                            data[2].chain.evolves_to[0].evolves_to[0].species
                              .url,
                          ),
                        )}
                      />
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default PokemonContainer;
