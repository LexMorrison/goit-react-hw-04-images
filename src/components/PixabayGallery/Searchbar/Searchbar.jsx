import React from 'react';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';

import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

class SearchBar extends React.Component {
  state = {
    search: '',
  };

  handleInputChange = evt => {
    this.setState({ search: evt.currentTarget.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { search } = this.state;
    if (search.trim() === '') {
      return Notiflix.Notify.warning('Please, type something!');
    }
    this.props.onSubmit(this.state.search);
    this.setState({ search: '' });
  };
  render() {
    return (
      <header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <AiOutlineSearch size="3rem" />
          </SearchFormButton>

          <SearchFormInput
            onChange={this.handleInputChange}
            value={this.state.search}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
