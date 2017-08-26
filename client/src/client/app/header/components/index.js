/* eslint-env browser */
import React from 'react';
import { Link } from 'react-router-dom';

import './scss/style.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: 'Search',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  onClick(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    if (value === 'Search') {
      this.setState({ [name]: '' });
    }
  }

  onBlur(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    if (value === '') {
      this.setState({ [name]: 'Search' });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSearch(this.state.search);
  }

  render() {
    return (
      <header className={('ontouchstart' in document.documentElement) ? '' : 'no-touch'}>
        <div className="row align-bottom align-center">
          <div className="logo small-10 medium-6 large-7 columns">
            <Link to="/">
              <img src="/assets/img/logo.png" alt="Design Bright Logo" />
            </Link>
          </div>
          <nav className="columns small-9 medium-6 large-5">
            <ul className="row align-justify">
              <li className="shrink columns"><Link to="browser">Explore</Link></li>
              <li className="columns search expand">
                <form onSubmit={this.onSubmit}>
                  <input
                    type="search"
                    name="search"
                    id="search"
                    value={this.state.search} onChange={this.onChange}
                    onClick={this.onClick}
                    onBlur={this.onBlur} />
                  <button type="submit"></button>
                </form>
              </li>
              <li className="user shrink">
                <a
                  className={this.props.onRequireAuth() ? 'logged-in' : ''}>
                  
                </a>
                {
                  this.props.userAuth.accessToken ?
                    <ul className="user-menu">
                      <li><Link to="/profile">Profile</Link></li>
                      <li><Link to="/" onClick={this.props.onLogout}>Logout</Link></li>
                    </ul>
                    : <ul className="user-menu">
                      <li><Link to="/register">Register</Link></li>
                      <li><Link to="/login">Login</Link></li>
                    </ul>
                }
              </li>
            </ul>
          </nav>
        </div>
        <div className="orange-line"></div>
      </header>
    )
  }
}

export default Header;
