/* eslint-env browser */
import React from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

import validEmail from '../../../../../helpers/validEmail';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginError: '',
      loginAttempted: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
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
    );

    this.setState({ loginAttempted: true });
    this.setState({ password: '' });
    window.scroll(0, 0);
  }

  onLogout(e) {
    e.preventDefault();

    this.props.onLogout();
  }

  componentWillMount() {
    const search = queryString.parse(this.props.location.search);

    if ('origin' in search) {
      switch (search.origin) {
        case 'secure':
          return this.props.onNewMessage('You must be logged in to access this page.');
        default:
          return null;
      }
    }
    return null;
  }

  render() {
    if (this.props.onRequireAuth()) {
      if (this.state.loginAttempted) {
        return (
          <Redirect to={{
            pathname: '/profile',
          }} />
        );
      }
      return (
        <Redirect to={{
          pathname: '/profile',
          search: '?origin=profile',
        }} />
      );
    }
    return (
      <main id="login">
        <section className="row align-center">
          <form className="small-12 large-6 columns" onSubmit={this.onLogin}>
            <div className="row">
              <h1 className="small-12 columns"><span className="underlined">Login</span></h1>
            </div>
            <div className="row align-center">
              <div className="small-12 columns">
                <label htmlFor="email"
                  className={`row${this.props.error.type === 'login' ? ' invalid' : ''}${(validEmail(this.state.email) || this.state.email.length === 0) ? '' : ' invalid'}`}>
                  <div className="small-12 columns">
                    Email: <span className="required">*</span>
                  </div>
                  <div className="small-12 columns">
                    <span className="error">{this.props.error.type === 'login' ? this.props.error.message : 'Please enter a valid email address.'}</span>
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
                className="primary small-11 medium-10 large-10"
                type="submit">
                Login
              </button>
            </div>
          </form>
        </section>
      </main>
    );
  }
}

// const Login = ({ onLogin }) => {
//   const loginInfo = {
//     email: '',
//     password: '',
//   };

//   const submit = (e) => {
//     e.preventDefault();
//     onLogin({
//       email: loginInfo.email.value,
//       password: loginInfo.password.value,
//     });
//   };

//   return (
//     <main className="login">
//       <section className="row align-center">
//         <form className="small-12 large-6 columns" onSubmit={submit}>
//           <div className="row">
//             <h1 className="small-12 columns"><span className="underlined">Login</span></h1>
//           </div>
//           <div className="row align-center">
//             <div className="small-12 columns">
//               <label htmlFor="email">Email: <span className="required">*</span></label>
//               <input type="email" name="email" id="email" ref={input => loginInfo.email = input} required />
//               <label htmlFor="password">Password: <span className="required">*</span></label>
//               <input type="password" name="password" id="password" ref={input => loginInfo.password = input} required />
//             </div>
//           </div>
//           <div className="row align-center">
//             <button
//               className="primary small-11 medium-10 large-10"
//               type="submit">
//               Login
//         </button>
//           </div>
//         </form>
//       </section>
//     </main>
//   )
// };

export default Login;
