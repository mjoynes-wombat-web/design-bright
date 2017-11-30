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
      searchInput: 'Search',
      searchSubmitted: false,
    };

    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSubmitSearch = this.onSubmitSearch.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.onBlurSearch = this.onBlurSearch.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidUpdate() {
    if (this.state.searchSubmitted) {
      this.setState({ searchInput: 'Search', searchSubmitted: false });
    }
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
    target.parentElement.classList.add('child-focused');
   

    target.setSelectionRange(0, value.length);

    if (value === 'Search') {
      this.setState({ [name]: '' });
    }
  }

  onBlurSearch(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    target.parentElement.classList.remove('child-focused');

    if (value === '') {
      this.setState({ [name]: 'Search' });
    }
  }

  onSubmitSearch(e) {
    e.preventDefault();
    this.setState({ searchSubmitted: true });
  }

  render() {
    if (this.state.searchSubmitted) {
      return <Redirect to={{
        pathname: '/campaigns/search',
        search: `?search=${this.state.searchInput}`,
      }} />;
    }

    return (
      <form onSubmit={this.onSubmitSearch} className={this.props.className}>
        <input
          type="search"
          name="searchInput"
          id="search"
          value={this.state.searchInput}
          onChange={this.onChangeSearch}
          onClick={this.onClickSearch}
          onBlur={this.onBlurSearch} />
        <button type="submit" aria-label="Search">
          <svg version="1.1" id="searchIcon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 180 180" style={{ enableBackground: 'new 0 0 180 180' }}>
            <g>
              <rect y="0" className="background" width="180" height="180"/>
              <path className="icon" d="M148,141.8l-29.7-29.7c-0.5-0.5-1.2-0.8-2-0.8h-2.4c7.9-8.5,12.7-19.9,12.7-32.4c0-26.4-21.4-47.8-47.8-47.8c-26.4,0-47.8,21.4-47.8,47.8s21.4,47.8,47.8,47.8c12.5,0,23.9-4.8,32.4-12.7v2.3c0,0.7,0.3,1.4,0.8,2l29.7,29.7c1.1,1.1,2.8,1.1,3.9,0l2.3-2.3C149.1,144.6,149.1,142.9,148,141.8L148,141.8z M79,119.4c-22.4,0-40.5-18.1-40.5-40.5S56.6,38.5,79,38.5c22.4,0,40.5,18.1,40.5,40.5S101.3,119.4,79,119.4z"/>
            </g>
          </svg>
        </button>
      </form>
    );
  }
}

const Search = styled(
  ({ className }) => (
    <SearchForm className={className} />
  ),
) `
padding: 0.625rem 0.875rem;
display: flex;
transition: width 0.75s, left 0.75s, box-shadow 0.75s;
transition-timing-function: ease-in-out;
overflow: hidden;

:hover {
  background-color: rgba(0, 0, 0, 0.25);

  input:focus {
      background-color: ${colors.brightGraphite};
  }
}


@media screen and (min-width: ${screenBreaks.medium}) {
  padding: 0;
  position: absolute;
  width: calc(100% - 136.56px - 1rem);
  bottom: 0;
  left: calc(94.56px + 0.5rem);
  border-radius: 0.3rem;

  &.child-focused {
    width: 100%;
    left: 0;
  }

  :hover {
    background-color: transparent;

    input {
      background-color: rgba(255, 255, 255, 0.7);
      color: ${colors.graphite};
    }
  }
}

&.child-focused {

  @media screen and (min-width: ${screenBreaks.medium}) {
    box-shadow: 0.0625rem 0.0625rem 0.25rem #777777;
  }

  :hover button, button {
    svg#searchIcon {
      .background {
        fill: white;
      }
      .icon {
        fill: ${colors.brightGraphite};
      }
    }
  }
}

input {
  font-size: 1.5rem;
  line-height: 1.625rem;
  padding: 0.4rem 0.5rem 0.5rem 0.5rem;
  border-radius: 0.3rem 0 0 0.3rem;
  border: none;
  font-weight: 300;
  font-family: 'Lato', sans-serif;
  color: ${colors.lightGraphite};
  background: rgba(255, 255, 255, 0.5);
  transition: width 0.75s, background-color 0.5s, left 0.75s, color 0.5s;
  transition-timing-function: ease-in-out;
  display: block;
  z-index: 100;
  width: calc(100% - 2.5rem);

  @media screen and (min-width: ${screenBreaks.medium}) {
    border-radius: 0;
  }

  :active, :focus {
    color: #fff;
    background-color: ${colors.lightGraphite};

    @media screen and (min-width: ${screenBreaks.medium}) {
      background-color: ${colors.brightGraphite};
    }
    outline: none;
    width: calc(100% - 2.5rem);
    left: 0;
  }
}

button {
  border: none;
  border-radius: 0;
  border-radius: 0 0.3rem 0.3rem 0 ;
  width: 2.5rem;
  height: 2.5rem;
  overflow: hidden;
  padding: 0;
  z-index: 100;
  cursor: pointer;

  @media screen and (min-width: ${screenBreaks.medium}) {
    border-radius: 0;
  }

  :focus {
    outline: none;
  }

  svg#searchIcon {
    .background {
      fill: ${colors.lightGraphite};

      @media screen and (min-width: ${screenBreaks.medium}) {
        fill: ${colors.brightGraphite};
      }
      transition: fill 0.5s;
      transition-timing-function: ease-in-out;
    }
    .icon {
      fill: white;
      transition: fill 0.5s;
      transition-timing-function: ease-in-out;
    }
  }
}

:hover {
  button {
    svg#searchIcon {
      .background {
        fill: ${colors.brightGraphite};
  
          @media screen and (min-width: ${screenBreaks.medium}) {
            fill: ${colors.lightGraphite};
          }
      }
      .icon {
        fill: white;
      }
    }
  }
}
`;

export default Search;
