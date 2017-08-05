import React from 'react';
import { Link } from 'react-router-dom';
import './scss/style.scss';

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <div className="row align-bottom">
      <div className="logo small-5 columns">
        <Link to="/">
        <img src={"/assets/img/logo.png"} alt="Design Bright Logo" />
        </Link>
      </div>
      <nav className="columns expand">
        <ul className="row align-right">
          <li className="shrink columns"><Link to="browser">Explore</Link></li>
          <li className="small-6 medium-5 large-4 columns search">
            <form>
              <input type="search" name="search" id="search" value="Search" />
              <button type="submit"></button>
            </form>
          </li>
          <li className="user shrink"><a href=""></a></li>
        </ul>
      </nav>
    </div>
    <div className="orange-line"></div>
  </header>
);

export default Header;
