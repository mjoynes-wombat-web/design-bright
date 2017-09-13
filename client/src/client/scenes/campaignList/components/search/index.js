/* eslint-env browser */
import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import SortOptions from '../sortOptions';

import './scss/style.scss';

const Search = ({ state, showSortOpt, cancelSort }) => {
  const pageUrl = `/campaigns/${state.view}`;
  const query = `?search=${state.search}&sort=`;
  if (state.search) {
    return (
      <section className="row" id="searchCampaigns">
        <div className="columns small-12">
          <h1>
            <span>
              Campaigns for
            </span>&nbsp;
            <span className="search">
              <Link rel="nofollow" to={`${pageUrl}${query}${state.sort}`}>
                {state.search}
              </Link>
            </span>
          </h1>
          <h2 className="sort-method">
            <span>
              Sorted by
            </span>&nbsp;
            {state.showSort
              ? null
              : (
                <span onClick={showSortOpt} className="sortWrapper">
                  <span className="sort">
                    {state.sort}
                  </span>
                  <span className="icon"></span>
                </span>
              )
            }
          </h2>
          {state.showSort
            ? <SortOptions
              state={state}
              cancelSort={cancelSort} />
            : null}
          <hr />
          <div className="spacer" style={{ height: '300px' }}></div>
        </div>
      </section>
    );
  }
  return <Redirect to={{
    pathname: '/campaigns/browse',
    search: `?sort=${state.sort}`,
  }} />;
};

export default Search;
