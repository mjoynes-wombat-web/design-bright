/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { colors, screenBreaks, globalStyle } from '../../../../styleConsts';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: 'Search',
      searchSubmitted: '',
    };
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSubmitSearch = this.onSubmitSearch.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.onBlurSearch = this.onBlurSearch.bind(this);
  }

  onChangeSearch(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  onClickSearch(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    target.setSelectionRange(0, value.length);

    if (value === 'Search') {
      this.setState({ [name]: '' });
    }
  }

  onBlurSearch(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    if (value === '') {
      this.setState({ [name]: 'Search' });
    }
  }

  onSubmitSearch(e) {
    e.preventDefault();
    this.setState({
      searchSubmitted: this.state.search,
      search: 'Search',
    });
  }

  render() {
    if (this.state.searchSubmitted !== '') {
      return <Redirect to={{
        pathname: '/campaigns/search',
        search: `?search=${this.state.search}`,
      }} />;
    }

    return (
      <form onSubmit={this.onSubmitSearch}>
        <input
          type="search"
          name="search"
          id="search"
          value={this.state.search}
          onChange={this.onChangeSearch}
          onClick={this.onClickSearch}
          onBlur={this.onBlurSearch} />
        <button type="submit">Search</button>
      </form>
    );
  }
}

const Search = styled(
  ({ className }) => (
    <SearchForm className={className} />
  ),
) `

`;

export default Search;
