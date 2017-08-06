import React from 'react';
import { Link } from 'react-router-dom';
import './scss/style.scss';

const Home = () => (
  <main className="index">
    <section className="main-image">
      <img src="assets/img/sunset marsh.jpg" alt="Sunset over the marsh."/>
      <div className="orange-line"></div>
    </section>
    <section className="row">
      <div className="columns small-12">
        <h1><span className="underlined">Who are We?</span></h1>
        <p>“Forgive me,” began Miüsov, addressing Father Zossima, “for perhaps I seem to be taking part in this shameful foolery.
          I made a mistake in believing that even a man like Fyodor Pavlovitch would understand what was due on a visit to so
          honored a personage. I did not suppose I should have to apologize simply for having come with him….”
        </p>
      </div>
    </section>
    <section className="row">
      <div className="column small-12 medium-4">
        <h2><Link to="/browse">Find a Cause to Support</Link></h2>
        <p>Pyotr Alexandrovitch could say no more, and was about to leave the room, overwhelmed with confusion.</p>
      </div>
      <div className="column small-12 medium-4">
        <h2><Link to="/register">Start a Campaign</Link></h2>
        <p>It was difficult even now to decide whether he was joking or really moved.</p>
      </div>
      <div className="column small-12 medium-4">
        <h2><Link to="/advisor">Become an Advisor</Link></h2>
        <p>“Blessed man! Give me your hand to kiss.”</p>
      </div>
    </section>
  </main>
);

export default Home;
