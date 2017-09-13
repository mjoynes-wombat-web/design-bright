/* eslint-env browser */
import React from 'react';
import { Link } from 'react-router-dom';

const SortOptions = ({ state, cancelSort }) => {
  const pageUrl = `/campaigns/${state.view}`;
  const query = () => {
    if (state.search) {
      return `?search=${state.search}&sort=`;
    }
    return '?sort=';
  };

  return (
    <div className="sortOptions">
      <div>
        <ul>
          <li>
            <Link rel="nofollow" to={`${pageUrl}${query()}Newest`}>
              Newest
            </Link>
          </li>
          <li>
            <Link rel="nofollow" to={`${pageUrl}${query()}Percent Funded`}>
              Percent Funded
            </Link>
          </li>
          <li>
            <Link rel="nofollow" to={`${pageUrl}${query()}Days Remaining`}>
              Days Remaining
            </Link>
          </li>
          <li>
            <Link rel="nofollow" to={`${pageUrl}${query()}Funding Needed`}>
              Funding Needed
            </Link>
          </li>
          <li>
            <button
              className="cancel columns small-12"
              onClick={cancelSort}
              type='button'>
              Cancel
            </button>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
};

export default SortOptions;
