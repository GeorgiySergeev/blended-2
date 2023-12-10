import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    query: '',
  };

  onSearchChange = ({ target: { value } }) => {
    this.setState({ query: value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <SearchFormStyled onSubmit={this.onSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          onChange={this.onSearchChange}
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
        />
      </SearchFormStyled>
    );
  }
}
