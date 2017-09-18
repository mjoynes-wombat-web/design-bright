/* eslint-env browser */
import React from 'react';
import { Link } from 'react-router-dom';

import validEmail from '../../../helpers/validEmail';
import Message from '../../message';

import './scss/style.scss';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginAttempted: false,
      message: {
        type: '',
        message: '',
      },
      error: {
        type: '',
        message: '',
      },
    };

    this.onChange = this.onChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  onLogin(event) {
    event.preventDefault();

    this.props.onLogin(
      {
        email: this.state.email,
        password: this.state.password,
      },
      () => {
        this.setState({ password: '' });
        this.setState({ error: this.props.error });
        window.scroll(0, 0);
      },
    );
  }

  render() {
    return (
      <div id="loginForm">
        <Message
          error={this.state.error}
          onClearMessage={() => this.setState({ message: { type: '', message: '' } })}
          message={this.state.message}
          onClearError={() => this.setState({ error: { type: '', message: '' } })} />
        <section className="row align-center">
          <form className="small-12 large-6 columns" onSubmit={this.onLogin}>
            <div className="row">
              <h1 className="small-12 columns">
                <span className="underlined">
                  {this.props.actionName}
                </span>
              </h1>
              <p className="small-12 columns register-link">
                <Link onClick={() => { document.body.style.overflow = ''; }} to="/register">
                  Need an Account?
                </Link>
              </p>
            </div>
            <div className="row align-center">
              <div className="small-12 columns">
                <label htmlFor="email"
                  className={`row${this.state.error.type === 'login' ? ' invalid' : ''}${(validEmail(this.state.email) || this.state.email.length === 0) ? '' : ' invalid'}`}>
                  <div className="small-12 columns">
                    Email: <span className="required">*</span>
                  </div>
                  <div className="small-12 columns">
                    <span className="error">{this.state.error.type === 'login' ? this.state.error.message : 'Please enter a valid email address.'}</span>
                  </div>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  required />
                <label htmlFor="password" className={this.props.userAuth.error ? 'invalid' : ''}>Password: <span className="required">*</span></label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  required />
              </div>
            </div>
            <div className="row align-center">
              <button
                className="primary small-11 medium-10 large-10 columns"
                type="submit">
                Login
              </button>
            </div>
          </form>
        </section>
      </div>
    );
  }
}

export default LoginForm;
