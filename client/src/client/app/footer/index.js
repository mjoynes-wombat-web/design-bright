/* eslint-env browser */
import React from 'react';
import { Link } from 'react-router-dom';
import './scss/style.scss';

const Footer = () => (
  <footer className={('ontouchstart' in document.documentElement) ? '' : 'no-touch'}>
    <div className="row">
      <div className="columns small-6"><Link to="/advisor">Become an Advisor</Link></div>
      <div className="columns small-6"><Link to="/help">Need Help?</Link></div>
      <div className="columns small-12">
        <p>© 2017 by Simeon Smith</p>
      </div>
    </div>
  </footer>
);

export default Footer;
