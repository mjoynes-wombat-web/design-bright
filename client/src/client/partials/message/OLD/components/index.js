/* eslint-env browser */
import React from 'react';

import './scss/style.scss';

class Message extends React.Component {
  render() {
    if (this.props.error.message !== '' || this.props.message.message !== '') {
      return (
        <section id="message" className={`small-12 columns${this.props.error.message !== '' ? ' error' : ''}`}>
          <p><a onClick={this.props.error.message !== '' ? this.props.onClearError : this.props.onClearMessage}></a>{this.props.error.message !== '' ? this.props.error.message : this.props.message.message}</p>
        </section>
      );
    }
    return null;
  }
}

export default Message;
