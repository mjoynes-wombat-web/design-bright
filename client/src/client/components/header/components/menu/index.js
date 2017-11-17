/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import styled from 'styled-components';

import { colors, screenBreaks, globalStyle } from '../../../styleConsts';
import MenuItem from './menuItem';
import Search from './search';
import UserMenu from './userMenu';

const Menu = styled(
  ({ className }) => (
    <nav className={className}>
      <ul>
        <li><MenuItem linkURL="/campaigns/browse" linkName="Explore" /></li>
        <li><Search /></li>
        <li>
          <UserMenu />
        </li>
      </ul>
    </nav>
  ),
) `
align-self: flex-end;
position: relative;
width: 50%;

ul {
  width: 100%;
  justify-content: space-between;
  display: flex;
}

> ul > li {
  display: inline-block;
  font-size: 1.5rem;
  line-height: 1.625rem;
  font-weight: 300;
  text-align: center;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;

  a:link, a:visited {
    color: ${colors.lightGraphite};
    border: none;

    &:hover {
      color: ${colors.graphite};
    }
  }
}
`;

export default Menu;
