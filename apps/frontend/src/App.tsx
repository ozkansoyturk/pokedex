import 'animate.css';
import { css } from '../styled-system/css/css';
// import './app.css';
import Loading from './components/Loading.tsx';
import PokemonContainer from './components/PokemonContainer.tsx';
import PokemonList from './components/PokemonList.tsx';
import { usePokemonList } from './hooks/usePokemonList.tsx';

function App() {
  const { allPokemons, loop } = usePokemonList();

  return (
    <div
      className={css({
        bg: '#f6f8fc',
        p: '0 10vw',
        m: 0,
        w: '100%',
        h: '100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundImage: 'url(./assets/pokeball-icon.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: '-180px',
        backgroundPositionY: '-80px',
      })}
    >
      {loop && <Loading />}
      <PokemonList allPokemons={allPokemons} />
      <PokemonContainer />
    </div>
  );
}

export default App;
