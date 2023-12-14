import { Component } from 'react';
import PropTypes from 'prop-types';
import { CiSearch } from 'react-icons/ci';

import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';

export class SearchBar extends Component {
  state = {
    value: '',
  };

  hanlerChange = ({ target }) => {
    this.setState({
      value: target.value,
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit">
            <CiSearch size="24" />
          </SearchFormBtn>
          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={value}
            onChange={this.hanlerChange}
          />
        </SearchForm>
      </Header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
