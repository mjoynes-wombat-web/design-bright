/* eslint-env browser */
import React from 'react';
import { Link } from 'react-router-dom';

const SortOptions = ({ state }) => {
  const sortUrl = `/campaigns/${state.view}/${state.page}?search=${state.search}&sort=`;
  return (
    <div className="sortOptions">
      <div>
        <ul>
          <li>
            <Link rel="nofollow" to={`${sortUrl}Newest`}>
              Newest
            </Link>
          </li>
          <li>
            <Link rel="nofollow" to={`${sortUrl}Percent Funded`}>
              Percent Funded
            </Link>
          </li>
          <li>
            <Link rel="nofollow" to={`${sortUrl}Days Remaining`}>
              Days Remaining
            </Link>
          </li>
          <li>
            <Link rel="nofollow" to={`${sortUrl}Funding Needed`}>
              Funding Needed
            </Link>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
};

export default SortOptions;