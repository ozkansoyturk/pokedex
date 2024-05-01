import 'animate.css';
import { useState } from 'react';
import { css, cx } from '../../styled-system/css';
import { Center } from '../../styled-system/jsx';
import loadingPokeball from '../assets/pokeball-icon.png';

function Loading() {
  const [loading, setLoading] = useState(false);

  const loadingBall = css({
    filter: 'brightness(70%)',
    w: 32,
  });

  const concatClass = cx(
    'animate__animated animate__zoomIn animate__infinite animate__slow 2s',
    loadingBall,
  );

  const loadingOut = css({
    animation: 'loadingOut ease-in-out 0.5s forwards',
  });

  const div = css({
    h: '100%',
    position: 'absolute',
    bg: 'white',
    zIndex: 999,
  });

  const loadingClass = cx(div, loading ? loadingOut : '');

  setTimeout(() => {
    setLoading(true);
  }, 1000);

  return (
    <Center h="100%" w="100%" className={loadingClass}>
      <img className={concatClass} src={loadingPokeball} alt="Loading Image" />
    </Center>
  );
}

export default Loading;
