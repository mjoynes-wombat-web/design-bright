/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import styled from 'styled-components';

import { colors, screenBreaks, globalStyle } from '../styleConsts';
import Logo from './components/logo';
import Menu from './components/menu';

// HEADER COMPONENT
// Header component with state.
const Header = styled(
  ({ className }) => (
    <header className={`${className}${('ontouchstart' in document.documentElement) ? '' : ' no-touch'}`}>
      <Logo />
      <Menu />
      <div className="orange-line"></div>
    </header>
  ),
)`
background-image: url(/assets/img/paper.png);
padding: 1.125rem 0.75rem;
position: relative;
z-index: 200;

@media screen and (min-width: ${screenBreaks.medium}) {
  padding: 1.125rem 1.125rem 1.75rem 1.125rem;
}

.orange-line {
  background-image: url(/assets/img/orange-line.svg);
  background-position-x: 50%;
  height: 1.125rem;
  position: absolute;
  width: 100%;
  bottom: -.5625rem;
  background-repeat: no-repeat;
  background-size: cover;
  left: 0;
}
`;

export default Header;
