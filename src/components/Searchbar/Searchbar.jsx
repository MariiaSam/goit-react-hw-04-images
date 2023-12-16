import { useState } from 'react';
import PropTypes from 'prop-types';
import { CiSearch } from 'react-icons/ci';

import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const hanlerChange = ({ target }) => {
    setValue(target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    onSubmit(value);
    setValue('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <CiSearch size="24" />
        </SearchFormBtn>
        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={hanlerChange}
        />
      </SearchForm>
    </Header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
