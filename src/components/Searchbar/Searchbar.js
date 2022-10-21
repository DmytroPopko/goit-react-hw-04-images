import { useState } from 'react';
import { toast } from 'react-toastify';
import { ReactComponent as IconSearch } from '../icons/search.svg';
import PropTypes from 'prop-types';
import './Searchbar.css';

export default function Searchbar({ onSubmit }) {
  const [imgName, setImgName] = useState('');

  const handleNameChange = event => {
    setImgName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (imgName.trim() === '') {
      toast.error('Введите название картинки.');
      return;
    }

    onSubmit(imgName);
    setImgName('');
  };

  return (
    <header className="Searchbar">
      <form onSubmit={handleSubmit} className="SearchForm">
        <button type="submit" className="SearchForm-button">
          {' '}
          <IconSearch />
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          value={imgName}
          onChange={handleNameChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
