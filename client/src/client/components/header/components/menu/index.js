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
          <span className="icon"></span>
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
  padding: 0.4rem 0.5rem 0.5rem;
  font-weight: 300;
  text-align: center;

  &:nth-child(2) {
    width: calc(100% - 136.56px);
  }
  &:nth-child(3) {
    position: relative;
    padding: 0;
    line-height: 0rem;

    span.icon {
      background-image: url(/assets/img/user.svg);
      display: inline-block;
      width: 26px;
      height: 26px;
      background-size: 100% 400%;
      padding: 0.45rem 0.5rem;
      border-radius: 0.3rem;
      transition: background-color 0.5s;
      transition-timing-function: ease-in-out;
    }

    ul {
      position: absolute;
      right: -1.125rem;
      left: calc(1.125rem + 42px);
      padding-top: calc((1.625rem) - 0.5rem);
      top: 42px;
      width: auto;
      display: block;
      transition: left 1s;
      transition-timing-function: ease-in-out;

      div {
        background-color: ${colors.brightGraphite};
        box-shadow: -0.0625rem 0.0625rem 0.25rem #777777;
        border-radius: 0 0 0 0.3rem;
        overflow: hidden;

        li {
          display: block;
          text-align: center;

          :not(:first-child) {
            a:link {
              padding-top: 0.75rem; 
            }
            
          :last-child {
            border-radius: 0 0 0 0.3rem;
          }
          }
          
          a:link {
            color: white;
            padding: 1rem 0.5rem 1rem 0.5rem;
            display: block;
            line-height: initial;
            transition: background-color 0.5s, box-shadow 0.5s;
            transition-timing-function: ease-in-out;
            
            :hover {
              background-color: rgba(0, 0, 0, 0.25);
            }
          }
        }
      }
    }

    :hover {
      span.icon {
        background-position-y: 33%;
        box-shadow: 0.0625rem 0.0625rem 0.25rem #777777;
        background-color: ${colors.brightGraphite};
      }

      ul {
        left: -15vw;
      }
    }
  }
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;

  a:link {
    color: ${colors.lightGraphite};
    border: none;

    &:hover {
      color: ${colors.graphite};
    }
  }
}
`;

export default Menu;
