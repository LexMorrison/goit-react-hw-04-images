import React, { useState } from 'react';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';

import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

function SearchBar({ onSubmit }) {
  const [search, setSearch] = useState('');

  const handleInputChange = evt => {
    setSearch(evt.currentTarget.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (search.trim() === '') {
      return Notiflix.Notify.warning('Please, type something!');
    }
    onSubmit(search);
    setSearch('');
  };

  return (
    <header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <AiOutlineSearch size="3rem" />
        </SearchFormButton>

        <SearchFormInput
          onChange={handleInputChange}
          value={search}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
