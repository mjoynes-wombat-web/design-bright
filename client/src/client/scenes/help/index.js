/* eslint-env browser */
import React from 'react';

import ContactForm from './components/contactForm';
import FAQ from './components/faq';

import './scss/style.scss';

const Help = () => {
  document.title = 'Help - Design Bright';
  return (
    <main id="help" className="row">
      <section className="main-image small-12 columns">
        <h1>
          <span className="underlined">
            How Can We Help?
          </span>
        </h1>
        <p>
          We’d love to help you. Design Bright’s goal is to make your experience simple and
          pleasant. Please view our Frequently Asked Questions for the most common problems
          that people run into. If those don’t help you feel free to Contact Us below.
        </p>
      </section>
      <ContactForm />
      <FAQ />
    </main>
  );
};

export default Help;
