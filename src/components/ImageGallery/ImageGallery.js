import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import PendingSpiner from '../Loader/Loader';
import PropTypes from 'prop-types';
import './ImageGallery.css';

export default class ImageGallery extends Component {

  render() 
  {
    const { images, status, setActiveImage} = this.props;

    if (status === 'idle') {
      return <div>Введите имя картинки.</div>;
    }

    if (status === 'pending') {
      return <PendingSpiner/>;
    }

    if (status === 'rejected') {
      return <div>Не найдено изображение по вашему запросу</div>;
    }

    if (status === 'resolved') {
      return (
        <ul className="ImageGallery">
          {images.map(image => (
            <ImageGalleryItem image={image} key={image.id} setActiveImage={setActiveImage} />
          ))}
        </ul>
      );
    }
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};