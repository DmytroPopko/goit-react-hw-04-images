import React, { } from 'react';
import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

export default function ImageGalleryItem({image, keys, setActiveImage}) {
 
    return (
      <li className=".ImageGalleryItem">
        <img src={image.webformatURL} alt={image.tags} className='ImageGalleryItem-image'
        onClick={() => {
          setActiveImage(image.largeImageURL);
          }}/>
      </li>
    );
  }

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  setActiveImage: PropTypes.func.isRequired,
};
