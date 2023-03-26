import React from 'react';
import ReactModernAudioPlayer from 'react-modern-audio-player';

const CustomAudioPlayer = ({ url, title, artist }) => {
  const audioFiles = [
    {
      src: url,
      title: title,
      artist: artist
    }
  ];

  const playerOptions = {
    loop: false,
    autoplay: false,
    preload: 'auto'
  };

  const theme = {
    mainColor: '#D94F1C',
    bgColor: '#FFFFFF',
    textColor: '#FFFFFF',
    secondaryColor: '#D94F1C'
  };

  return (
    <ReactModernAudioPlayer audioFiles={audioFiles} options={playerOptions} theme={theme} />
  );
};

export default CustomAudioPlayer;
