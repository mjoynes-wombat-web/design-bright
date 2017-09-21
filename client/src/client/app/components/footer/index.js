/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { Link } from 'react-router-dom';

// IMPORT COMPONENT STYLE
import './scss/style.scss';

// FOOTER COMPONENT
// Stateless site footer component.
const Footer = () => (
  <footer className={('ontouchstart' in document.documentElement) ? '' : 'no-touch'}>
    <div className="row">
      <div className="columns small-6"><Link to="/advisor">Become an Advisor</Link></div>
      <div className="columns small-6"><Link to="/help">Need Help?</Link></div>
      <div className="columns small-12">
        <p>
          <span>© 2017 by Simeon Smith</span>
          <Link to="/references">Image and Content References</Link>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
