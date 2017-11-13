/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { colors, screenBreaks, globalStyle } from '../../../styleConsts';

const Logo = styled(
  ({ className }) => (
    <div className={className}>
      <Link to="/">
        <img
          srcSet="/assets/img/logo-retina.png 580w,
                        /assets/img/logo-large.png 435w,
                        /assets/img/logo-medium.png 290w,
                        /assets/img/logo-small.png 145w"
          sizes={`(min-width: ${screenBreaks.large}) 290px,
                        (min-width: ${screenBreaks.large}) 290px,
                        (min-with: ${screenBreaks.medium}) 90vw,
                        (min-with: ${screenBreaks.medium}) 90vw,`}
          src="/assets/img/logo-retina.png"
          alt="Design Bright Logo" />
      </Link>
    </div>
  ),
)`
  a:link {
    border: none;
    
    img {
      max-width: 290px;
    }
  }
`;

export default Logo;
