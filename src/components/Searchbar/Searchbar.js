import { Component } from 'react';
import { toast } from 'react-toastify';
import { ReactComponent as IconSearch } from '../icons/search.svg';
import PropTypes from 'prop-types';
import './Searchbar.css';

export default class Searchbar extends Component {
  state = {
    imgName: '',
  };

  handleNameChange = event => {
    this.setState({ imgName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.imgName.trim() === '') {
      toast.error('Введите название картинки.');
      return;
    }

    this.props.onSubmit(this.state.imgName);
    this.setState({ imgName: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form onSubmit={this.handleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button"> <IconSearch />
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            value={this.state.imgName}
            onChange={this.handleNameChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};