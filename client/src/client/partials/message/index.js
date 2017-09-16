/* eslint-env browser */
import React from 'react';

import './scss/style.scss';

const Message = ({ error, message, onClearError, onClearMessage }) => {
  if (error.message !== '' || message.message !== '') {
    return (
      <section id="message" className={`small-12 columns${error.message !== '' ? ' error' : ''}`}>
        <p><a onClick={error.message !== '' ? onClearError : onClearMessage}></a>{error.message !== '' ? error.message : message.message}</p>
      </section>
    );
  }
  return null;
};

export default Message;
