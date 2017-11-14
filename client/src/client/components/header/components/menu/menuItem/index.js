/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { colors, screenBreaks, globalStyle } from '../../../../styleConsts';

const MenuItem = styled(
  ({ className, linkName, linkURL }) => (
    <Link to={linkURL} className={className}>{linkName}</Link>
  ),
)`

`;

export default MenuItem;
