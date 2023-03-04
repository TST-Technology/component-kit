import React from 'react';
import { LinearProgress } from '@mui/material';
import Image from 'material-ui-image';

const ImageWithLoadingEffect = ({ id, onClick, src, className, alt }) => {
  return (
    <>
      <Image
        id={id}
        onClick={onClick}
        src={src}
        className={className}
        alt={alt}
        loading={
          <LinearProgress
            color="inherit"
            className={className}
            style={{
              position: 'absolute',
              zIndex: '1',
              width: '100%',
              height: '100%',
            }}
          />
        }
      />
    </>
  );
};

ImageWithLoadingEffect.defaultProps = {
  onClick: () => {},
  src: '',
  className: '',
  alt: '',
  id: '',
  isShowLoadingState: true,
  isHearo: false,
  style: 'defult',
};

export default ImageWithLoadingEffect;
