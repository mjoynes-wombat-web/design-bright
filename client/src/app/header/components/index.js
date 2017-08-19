import React from 'react';
import { Link } from 'react-router-dom';

import './scss/style.scss';
import requireAuth from '../../../helpers/requireAuth';

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
    this.props.search(this.state);
  }

  render() {
    return (
      <header>
        <div className="row align-bottom">
          <div className="logo small-5 columns">
            <Link to="/">
              <img src="/assets/img/logo.png" alt="Design Bright Logo" />
            </Link>
          </div>
          <nav className="columns expand">
            <ul className="row align-right">
              <li className="shrink columns"><Link to="browser">Explore</Link></li>
              <li className="small-6 medium-5 large-4 columns search">
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
                  className={requireAuth() ? 'logged-in' : ''}>
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
