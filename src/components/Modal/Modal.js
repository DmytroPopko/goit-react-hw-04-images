import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ url, onClose }) {

  function handleKeyDown(e) {
    if (e.code === 'Escape') {
      console.log('Нажали ESC, нужно закрыть модалку');
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

    //eslint-disable-next-line
  }, []);
  

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

 
    return createPortal(
      <div
        className='Modal__backdrop'
        onClick={handleBackdropClick}
      >
        <div className='Modal__content'>
              <img src={url} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }

Modal.propTypes = {
  url: PropTypes.string.isRequired,
};
