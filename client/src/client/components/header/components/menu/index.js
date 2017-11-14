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
    <ul className={className}>
      <li><MenuItem linkURL="/campaigns/browse" linkName="Explore"/></li>
      <li><Search /></li>
      <li><UserMenu /></li>
    </ul>
  ),
)`

`;

export default Menu;
