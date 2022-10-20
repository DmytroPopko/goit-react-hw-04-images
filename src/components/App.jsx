import { Component } from 'react';
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

export default class App extends Component {
  state = {
    imageName: '',
    page: 0,
    images: [],
    error: null,
    status: Status.IDLE,
    showModal: false,
    imageInModal: '',
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName, page: 1 });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;
    const prevPage = prevState.page;
    const page = this.state.page;

    if (prevName !== nextName || page !== prevPage) {
      this.setState({ status: Status.PENDING });
        pixabay
          .fetchImg(nextName, page)
          .then(data => {
            return this.setState(prevState => ({
              images: prevName === nextName ? [...prevState.images, ...data.hits] : [...data.hits],
              status:
                data.hits.length === 0 ? Status.REJECTED : Status.RESOLVED,
            }));
          })
          .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  setActiveImage = ( largeImageURL ) => {
    this.setState({
      imageInModal:  largeImageURL,
    });
    this.toggleModal();
  };

  render() {
    const { images, status, showModal, imageInModal } = this.state;
    return (
      <div className='App'>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          images={images}
          status={status}
          setActiveImage={this.setActiveImage}
        />
        <button className='Button' onClick={this.loadMore}>Load more</button>

        {showModal && (
          <Modal url={imageInModal} onClose={this.toggleModal}></Modal>
        )}
      </div>
    );
  }
}
