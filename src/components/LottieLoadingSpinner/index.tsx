import Lottie from 'react-lottie-player';

import data from './loadingLottie.json';

const styles = {
  lottie: {
    width: '50px',
    height: '50px',
    display: 'inline-block',
  },
};

export const LottieLoadingSpinner = () => {
  const optLottie = {
    loop: true,
    play: true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return <Lottie {...optLottie} style={styles.lottie} />;
};
