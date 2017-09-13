/* eslint-env browser */
import React from 'react';

import './scss/style.scss';

const CampaignItem = ({ state, showSortOpt, cancelSort }) => (
  <section className="row" id="browseCampaigns">
    <div className="columns small-12">
      <h1>
        <span>
          Campaigns by
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
      </h1>
      <hr />
      <div className="spacer" style={{ height: '300px' }}></div>
    </div>
  </section>
);

export default CampaignItem;
