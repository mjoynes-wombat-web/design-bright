/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { colors, screenBreaks, globalStyle } from '../../../../../styleConsts';

// USER MENU COMPONENT
// Stateless component for the user menu in the header.
// Takes a requireAuth function for checking login, a userType login to determine
// which menu type to show and an onLogout function to log the user out.
const UserMenuItems = ({ onRequireAuth, userType, onLogout }) => {
  if (onRequireAuth()) {
    if (userType === 'non-profit') {
      return (
        <ul className="user-menu">
          <div>
            <li><Link to="/user/profile">Profile</Link></li>
            <li><Link to="/user/manage-campaigns">Campaigns</Link></li>
            <li><Link to="/" onClick={onLogout}>Logout</Link></li>
          </div>
        </ul>
      );
    }
    return (
      <ul className="user-menu">
        <div>
          <li><Link to="/user/profile">Profile</Link></li>
          <li><a onClick={onLogout}>Logout</a></li>
        </div>
      </ul>
    );
  }
  return (
    <ul className="user-menu">
      <div>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </div>
    </ul>
  );
};

const UserMenu = styled(
  ({ className, onRequireAuth, userType, onLogout, loggedIn, userPhoto }) => (
    <div className={className}>
      {userPhoto
        ? <div id="userIcon">
          <img src={userPhoto} alt="User profile photo." />
        </div>
        : <svg version="1.1" id="userIcon"
          xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 153 153"
          style={{ enableBackground: 'new 0 0 153 153' }}>
          {loggedIn
            ? <path className="userIcon" d="M76.5,32.8c15.1,0,27.3,12.2,27.3,27.3S91.6,87.4,76.5,87.4S49.2,75.2,49.2,60.1S61.4,32.8,76.5,32.8M107.8,89.8L99,87.6c-2-0.5-4.2-0.2-6,0.9c-4.9,2.9-10.6,4.4-16.5,4.4c-5.9,0-11.5-1.6-16.5-4.4c-1.9-1.1-4.1-1.4-6.2-0.9l-8.7,2.2c-7.3,1.8-12.4,8.4-12.4,15.9v6.3c0,4.5,3.7,8.2,8.2,8.2h71c4.5,0,8.2-3.7,8.2-8.2v-6.3C120.2,98.2,115.1,91.6,107.8,89.8z" />
            : <path className="userIcon" d="M108.8,87l-9-2.6c5.8-5.9,9.2-14,9.2-22.7c0-18-14.6-32.6-32.6-32.6S43.9,43.7,43.9,61.7c0,8.7,3.4,16.8,9.2,22.7l-9,2.6c-8.8,2.5-15,10.6-15,19.9v5.1c0,6.5,5.3,11.8,11.8,11.8h71c6.5,0,11.8-5.3,11.8-11.8v-5.1C123.9,97.7,117.8,89.5,108.8,87z M49.9,61.7c0-14.7,11.9-26.6,26.6-26.6s26.6,11.9,26.6,26.6c0,14.7-11.9,26.6-26.6,26.6C61.8,88.3,49.9,76.4,49.9,61.7L49.9,61.7z M117.9,112c0,3.3-2.6,5.9-5.9,5.9H41c-3.3,0-5.9-2.6-5.9-5.9v-5.1c0-6.6,4.4-12.4,10.7-14.2L58.7,89c5.1,3.3,11.2,5.3,17.8,5.3c6.6,0,12.7-2,17.8-5.3l12.9,3.7c6.3,1.8,10.7,7.6,10.7,14.2L117.9,112L117.9,112z" />
          }
        </svg>
      }
      <UserMenuItems
        onRequireAuth={onRequireAuth}
        userType={userType}
        onLogout={onLogout} />
    </div>
  ),
) `
position: relative;
line-height: 0rem;
padding: 0px;

#userIcon {
  display: none;
  border-radius: 0.3rem;
  overflow: hidden;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  background-color: transparent;
  transition: background-color 0.5s;
  transition-timing-function: ease-in-out;

  > * {
    transition: fill 0.5s;
    transition-timing-function: ease-in-out;
  }

  .userIcon {
    fill: ${colors.brightGraphite};
  }

  @media screen and (min-width: ${screenBreaks.medium}) {
    display: inline-block;
  }
}

ul.user-menu {
  width: auto;
  display: block;
  transition: left 1s;
  transition-timing-function: ease-in-out;

  @media screen and (min-width: ${screenBreaks.medium}) {
      background-color: transparent;
      position: absolute;
      right: -1.125rem;
      left: calc(1.125rem + 42px);
      padding-top: calc((2.125rem) - 0.5rem);
      top: 42px;
    }

  div {
    background-color: ${colors.brightGraphite};
    border-radius: 0 0 0 0.3rem;

    @media screen and (min-width: ${screenBreaks.medium}) {
      box-shadow: -0.0625rem 0.0625rem 0.25rem #777777;
      overflow: hidden;
    }

    li {
      display: block;

      :not(:first-child) {
        a, a:link {
          padding-top: 0.75rem; 
        }

        &:last-child {
          // Fix box shadow transitioning
          box-shadow: 0 0.13rem 0.2rem #777777;
          transition: box-shadow 0.5s;
          transition-timing-function: ease-in-out;

          @media screen and (min-width: ${screenBreaks.medium}) {
            border-radius: 0 0 0 0.3rem;
          }

          a, a:link, a:visited {
            padding-bottom: 0.875rem;
          }
        }
      }
      
      a, a:link, a:visited {
        cursor: pointer;
        color: white;
        padding: 0.75rem 1.375rem;
        text-align: left;
        display: block;
        line-height: initial;
        transition: background-color 0.5s, box-shadow 0.5s;
        transition-timing-function: ease-in-out;

        @media screen and (min-width: ${screenBreaks.medium}) {
          padding: 1rem 0.5rem 1rem 0.5rem;
          text-align: center;
        }
        
        :hover {
          background-color: rgba(0, 0, 0, 0.25);
        }
      }
    }
  }
}

:hover {
  #userIcon {
    background-color: ${colors.brightGraphite};
  
    .userIcon {
      fill: white;
    }
  }

  ul {
    left: -25vw;

    @media screen and (min-width: ${screenBreaks.large}) {
      left: -15vw;
    }
  }
}
`;

export default UserMenu;
