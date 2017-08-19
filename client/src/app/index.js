/* eslint-env browser */
import React from 'react';

import Header from './header';
import Routes from './routes';
import Footer from './footer';
import './scss/style.scss';

const App = () => (
  <div>
    <Header />
    <Routes onChange={window.scrollTo(0, 0)}/>
    <Footer />
  </div>
);

export default App;
