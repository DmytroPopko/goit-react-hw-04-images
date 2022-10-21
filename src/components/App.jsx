import React, { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import pixabay from '../services/pixabay-api';
import Modal from './Modal';
import './App.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () => {
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(0);
  const [images, setImages] = useState([]);
  const [, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [showModal, setShowModal] = useState(false);
  const [imageInModal, setImageInModal] = useState('');

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setPage(1);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    setStatus(Status.PENDING);
    console.log(page);
    pixabay
      .fetchImg(imageName, page)
      .then(data => {
        return (
        setImages(page===1 ? [...data.hits] : [...images, ...data.hits]),
        setStatus(data.hits.length === 0 ? Status.REJECTED : Status.RESOLVED)
        )})
      .catch(error => setError(error), 
      setStatus(Status.REJECTED));
      // eslint-disable-next-line
  }, [imageName, page]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const setActiveImage = largeImageURL => {
    setImageInModal(largeImageURL);
    toggleModal();
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        images={images}
        status={status}
        setActiveImage={setActiveImage}
      />
      <button className="Button" onClick={loadMore}>
        Load more
      </button>

      {showModal && <Modal url={imageInModal} onClose={toggleModal}></Modal>}
    </div>
  );
};

export default App;
