import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

export default class ImageGalleryItem extends Component {
 
  render() {
    const { image, setActiveImage} = this.props;

    return (
      <li className=".ImageGalleryItem">
        <img src={image.webformatURL} alt={image.tags} className='ImageGalleryItem-image'
        onClick={() => {
          setActiveImage(image.largeImageURL);
          }}/>
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  setActiveImage: PropTypes.func.isRequired,
};