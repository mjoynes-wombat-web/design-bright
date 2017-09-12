/* eslint-env browser */
import React from 'react';

import SortOptions from '../sortOptions';

import './scss/style.scss';

const Browse = ({ state, showSortOpt }) => (
  <section className="row" id="browseCampaigns">
    <div className="columns small-12">
      <h1>
        <span>
          Campaigns by
        </span>&nbsp;
        <span onClick={showSortOpt} className="sortWrapper">
          <span className="sort">
            {state.sort}
          </span>
          <span className="icon"></span>
        </span>
      </h1>
      {state.showSort
        ? <SortOptions state={state} />
        : null}
      <hr />
      <div className="spacer" style={{ height: '300px' }}></div>
    </div>
  </section>
);

export default Browse;
