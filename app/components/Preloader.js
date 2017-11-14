import React from 'react';
import PreloaderIcon, { ICON_TYPE } from 'react-preloader-icon';

const Preloader = () => (
  <PreloaderIcon
    type={ICON_TYPE.OVAL}
    size={60}
    strokeWidth={8}
    strokeColor="#006064"
    duration={800}
  />
);

Preloader.displayName = 'Preloader';

export default Preloader;
