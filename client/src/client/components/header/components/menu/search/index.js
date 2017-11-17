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
    
    this.componentWillMount = this.componentWillMount.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSubmitSearch = this.onSubmitSearch.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.onBlurSearch = this.onBlurSearch.bind(this);
  }

  componentWillMount() {
    this.setState({ searchSubmitted: '' });
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
        search: `?search=${this.state.searchSubmitted}`,
      }} />;
    }

    return (
      <form onSubmit={this.onSubmitSearch} className={this.props.className}>
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

input {
  font-size: 1.5rem;
  line-height: 1.625rem;
  padding: .4rem 2.625rem .5rem .5rem;
  position: absolute;
  border: none;
  font-weight: 300;
  font-family: 'Lato', sans-serif;
  color: ${colors.lightGraphite};
  border-radius: 0.3rem;
  background: url(/assets/img/search.svg), rgba(255, 255, 255, 0.5);
  background-position-x: 100.4%;
  background-position-y: 2%;
  background-repeat: no-repeat;
  background-size: 44px auto;
  transition: width 0.75s, background-color 0.5s, left 0.75s, box-shadow 0.75s;
  transition-timing-function: ease-in-out;
  display: block;
  width: calc(100% - 136.56px - 1rem);
  left: calc(94.56px + 0.5rem);
  bottom: 0;
  z-index: 100;

  :hover {
    color: ${colors.graphite};
    background-color: rgba(255, 255, 255, 0.7);
    background-position-y: 49%;
  }

  :active, :focus, :focus:hover {
    color: #fff;
    background-color: ${colors.brightGraphite};
    box-shadow: 0.0625rem 0.0625rem 0.25rem #777777;
    background-image: url(/assets/img/search.svg);
    background-position-y: 97%;
    outline: none;
    width: 100%;
    left: 0;
  }
}

button {
  display: none;
}
`;

export default Search;
