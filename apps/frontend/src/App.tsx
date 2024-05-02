import 'animate.css';
import { css } from '../styled-system/css/css';
import './app.css';
import loadingPokeball from './assets/pokeball-icon.png';
import Loading from './components/Loading.tsx';
import PokemonList from './components/PokemonList.tsx';
import { usePokemonList } from './hooks/usePokemonList.tsx';

function App() {
  const { allPokemons, loop } = usePokemonList();

  return (
    <>
      {loop && <Loading />}
      <div
        className={css({
          bg: '#f6f8fc',
          p: '0 10vw',
          w: '100%',
          minH: '100vh',
          fontFamily: '"Outfit"',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundImage: 'url(./assets/pokeball-icon.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPositionX: '-180px',
          backgroundPositionY: '-80px',
        })}
      >
        <img
          className={css({
            position: 'fixed',
            right: 'calc(10vw - 10px)',
            objectFit: 'contain',
            width: '350px',
            h: '60px',
            filter: 'brightness(70%)',
            top: '175px',
            bottom: '0',
            marginTop: 'auto',
            marginBottom: 'auto',
            zIndex: '1',
            animation: 'rotatePokeBall ease-in-out 3s infinite',
            hideBelow: 'lg',
          })}
          src={loadingPokeball}
          alt=""
        />
        <PokemonList allPokemons={allPokemons} />
      </div>
    </>
  );
}

export default App;
