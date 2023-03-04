import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Lightbox from 'react-image-lightbox';
import ImageWithLoadingEffect from 'components/ImageWithLoadingEffect';

const SingleLightbox = ({ thumb, className, large }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <NavLink to="#" location={{}} onClick={() => setIsOpen(true)}>
        <ImageWithLoadingEffect
          src={thumb}
          alt="thumbnail"
          className={className}
        />
      </NavLink>

      {isOpen && (
        <Lightbox mainSrc={large} onCloseRequest={() => setIsOpen(false)} />
      )}
    </>
  );
};
export default SingleLightbox;
