import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { css, cx } from '../../styled-system/css/index';
import { Center } from '../../styled-system/jsx/center';
import { dressUpPayloadValue, getId, getPokemonInfo } from '../apis/setup.ts';
import closePokemonInfo from '../assets/close-icon.png';
import noPokemonSelected from '../assets/no-pokemon-selected-image.png';
import {
  Description,
  PokemonContainerProps,
  PokemonTypes,
  Stats,
} from '../types/pokemon.ts';

function PokemonInfo({ pokemonInfo }: PokemonContainerProps) {
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

  const handleClosePokemon = () => {};

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
    HP: '#df2140',
    ATK: '#ff994d',
    DEF: '#eecd3d',
    SpA: '#85ddff',
    SpD: '#96da83',
    SPD: '#fb94a8',
  };

  const containerImage = css({
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
    h: '18vh',
  });

  const allDiv = css({
    lgTo3xl: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
      rounded: '20px',
      boxShadow: '#ededed 0 10px 10px',
      bg: 'white',
      zIndex: '1',
    },

    xsToLg: {
      position: 'fixed',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      w: '100%',
      h: '',
      rounded: '50px',
      bottom: '0',
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '0',
      bg: 'white',
      zIndex: '3',
    },
  });

  const slideOut = css({
    lgTo3xl: {
      animation: 'slideOut ease-in-out 0.35s forwards',
    },
    xsToLg: {
      animation: 'slideOutResponsive ease-in-out 0.35s forwards',
    },
  });

  const loadingOut = cx(
    allDiv,
    css({ hideBelow: 'lg' }),
    isLoading ? slideOut : '',
  );

  const slideIn = css({
    lgTo3xl: {
      animation: 'slideIn ease-in-out 0.35s forwards',
    },
    xsToLg: {
      animation: 'slideInResponsive ease-in-out 0.35s forwards',
    },
  });

  const loadingIn = cx(allDiv, isSuccess ? slideIn : '');

  const abilityWH = css({
    display: 'flex',
    flexDirection: 'column',
    w: '100%',
    m: '5px',
  });

  const abilityWHbackground = css({
    w: '100%',
    bg: '#F6F8FC',
    p: '8px 0',
    rounded: '30px',
    m: '5px',
  });

  const h4 = css({
    fontWeight: 'bold',
    m: '5px',
    // mt: '15px',
    color: '#011030',
    textAlign: 'center',
  });

  const currentPokemonEvolutionImage = css({
    h: '74px',
    w: '74px',
    cursor: 'pointer',
    rounded: '30%',
    _hover: { bg: 'rgba(0, 0, 0, 0.03)' },
  });

  const currentPokemonEvolutionLevelContainer = css({
    width: '50px',
    bg: '#F6F8FC',
    padding: '8px 0',
    rounded: '30px',
    margin: '5px',
    fontSize: '12px',
    fontWeight: 'bold',
  });

  return (
    <>
      {!isSuccess && (
        <div className={loadingOut}>
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
      )}

      {/* INFO: */}

      {selectedPokemon && data && !isLoading && isSuccess && (
        <>
          <div
            className={css({
              hideFrom: 'lg',
              xsToLg: {
                w: '100vw',
                h: '100vh',
                position: 'fixed',
                zIndex: '2',
                transition: '0.35s',
              },
            })}
            style={{
              backgroundColor: typeColors[data[0].types[0].type.name],
            }}
          ></div>
          <div
            className={css({
              hideFrom: 'lg',
              xsToLg: {
                display: 'unset',
                position: 'fixed',
                top: '10px',
                right: '10px',
                zIndex: '2',
                cursor: 'pointer',
                bgColor: '#F6F8FC',
                p: '10px',
                rounded: '10px',
                h: '42px',
                transition: '0.35s',
              },
            })}
            onClick={handleClosePokemon}
          >
            <img src={closePokemonInfo} />
          </div>

          <div className={loadingIn}>
            {selectedPokemon >= 650 ? (
              <img
                className={containerImage}
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
                      style={{ background: typeColors[type.type.name] }}
                      key={index}
                    >
                      {dressUpPayloadValue(type.type.name)}
                    </div>
                  );
                })}
              </div>

              {/*INFO: <!--description--> */}

              <h4 className={h4}>Pokedex Entry</h4>

              <span className={css({ color: '#8F9396' })}>{description}</span>

              {/*INFO: <!--height and weight--> */}

              <Center>
                <div className={abilityWH}>
                  <h4 className={h4}>Height</h4>
                  <div className={abilityWHbackground}>
                    {data[0].height / 10} m
                  </div>
                </div>
                <div className={abilityWH}>
                  <h4 className={h4}>Weight</h4>
                  <div className={abilityWHbackground}>
                    {data[0].weight / 10} kg
                  </div>
                </div>
              </Center>

              {/*INFO: <!--abilities--> */}
              <Center className={css({ flexDirection: 'column' })}>
                <h4 className={h4}>Abilities</h4>
                <div
                  className={css({
                    display: 'flex',
                    w: '100%',
                    m: '5px',
                  })}
                >
                  <div className={abilityWHbackground}>
                    {dressUpPayloadValue(data[0].abilities[0].ability.name)}
                  </div>
                  {data[0].abilities[1] && (
                    <div className={abilityWHbackground}>
                      {dressUpPayloadValue(data[0].abilities[1].ability.name)}
                    </div>
                  )}
                </div>
              </Center>

              {/*INFO: <!--stats--> */}

              <h4 className={h4}>Stats</h4>
              <Center>
                {data[0].stats.map((current: Stats, i: number) => {
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
                  const colorStatStyle = {
                    background: colorStat[current.stat.name],
                  };

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
                      <h5 className={css({ m: '6px 0' })}>
                        {current.base_stat}
                      </h5>
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
              </Center>

              {/*INFO: <!--Evolution chain--> */}

              {data[2].chain.evolves_to.length !== 0 && (
                <Center className={css({ flexDirection: 'column', w: '100%' })}>
                  <h4 className={h4}>Evolution</h4>
                  <Center className={css({ flexDirection: 'row', w: '100%' })}>
                    <img
                      className={currentPokemonEvolutionImage}
                      src={
                        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
                        getId(data[2].chain.species.url) +
                        '.png'
                      }
                      onClick={handlePokemonClick(
                        getId(data[2].chain.species.url),
                      )}
                    />
                    {data[2].chain.evolves_to[0].evolution_details[0]
                      .min_level ? (
                      <div className={currentPokemonEvolutionLevelContainer}>
                        Lv.{' '}
                        {
                          data[2].chain.evolves_to[0].evolution_details[0]
                            .min_level
                        }
                      </div>
                    ) : (
                      <div className={currentPokemonEvolutionLevelContainer}>
                        ?
                      </div>
                    )}
                    <img
                      className={currentPokemonEvolutionImage}
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
                        {data[2].chain.evolves_to[0].evolves_to[0]
                          .evolution_details[0].min_level ? (
                          <div
                            className={currentPokemonEvolutionLevelContainer}
                          >
                            Lv.{' '}
                            {
                              data[2].chain.evolves_to[0].evolves_to[0]
                                .evolution_details[0].min_level
                            }
                          </div>
                        ) : (
                          <div
                            className={currentPokemonEvolutionLevelContainer}
                          >
                            ?
                          </div>
                        )}
                        <img
                          className={currentPokemonEvolutionImage}
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
                  </Center>
                </Center>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PokemonInfo;
