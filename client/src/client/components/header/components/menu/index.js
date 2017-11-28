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
        <span className="icon"></span>
        <div>
          <li><MenuItem linkURL="/campaigns/browse" linkName="Explore" /></li>
          <li><Search /></li>
          <li>
            <UserMenu />
          </li>
        </div>
      </ul>
    </nav>
  ),
) `
align-self: flex-end;
position: relative;
min-width: 40px;
margin-bottom: 0.5rem;

@media screen and (min-width: ${screenBreaks.medium}) {
  width: 50%;
}

> ul {
  > span.icon {
      background-image: url(/assets/img/bars.svg);
      display: inline-block;
      width: 20px;
      height: 20px;
      padding: 0.375rem 0.4rem;
      background-size: 100% 200%;
      border-radius: 0.3rem;
      transition: background-color 0.5s;
      transition-timing-function: ease-in-out;
      cursor: pointer;

      @media screen and (min-width: ${screenBreaks.small}) {
        width: 26px;
        height: 26px;
        padding: 0.45rem 0.5rem;
      }

    @media screen and (min-width: ${screenBreaks.medium}) {
      display: none;
    }
  }

  @media screen and (max-width: ${screenBreaks.medium}) {
    :hover, :focus {
      outline: none;
      > span.icon {
        background-position-y: 100%;
        box-shadow: 0.0625rem 0.0625rem 0.25rem #777777;
        background-color: ${colors.brightGraphite};
      }

      > div  {
        @media screen and (max-width: ${screenBreaks.medium}) {
          max-height: 300px;
          padding-bottom: 1rem;
        }
      }
    }
  }
  > div {
    padding-top: calc((2.125rem) - 0.5rem);

    @media screen and (max-width: ${screenBreaks.medium}) {
      position: absolute;
      width: 100vw;
      right: -1.125rem;
      max-height: 0;
      transition: max-height 1s, padding 1s;
      transition-timing-function: ease-in-out;
      overflow: hidden;
      box-sizing: border-box;
    }

    > li {
      font-size: 1.5rem;
      line-height: 1.625rem;
      font-weight: 300;
      display: block;
      background-color: ${colors.brightGraphite};
      
      @media screen and (min-width: ${screenBreaks.medium}) {
        background-color: transparent;
        display: inline-block;
        text-align: center;
      }
    }

    @media screen and (min-width: ${screenBreaks.medium}) {
      height: auto;
      display: flex;
      justify-content: space-between;
      display: flex;
    }
  }
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;

  a:link, a:visited {
    color: white;
    border: none;

    @media screen and (min-width: ${screenBreaks.medium}) {
      color: ${colors.lightGraphite};
  
      &:hover {
        color: ${colors.graphite};
      }
    }
  }
}
`;

export default Menu;
