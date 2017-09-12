/* eslint-env browser */
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import './scss/style.scss';
import UserMenu from './userMenu';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: 'Search',
      searchSubmit: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidUpdate() {
    if (this.state.searchSubmit) {
      this.setState({ search: 'Search', searchSubmit: false });
    }
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
    const name = target.name;

    this.setState({ [name]: 'Search' });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      searchSubmit: true,
    });
  }

  render() {
    if (this.state.searchSubmit) {
      return <Redirect to={{
        pathname: '/campaigns/search',
        search: `?search=${this.state.search}`,
      }} />;
    }
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
              <li className="shrink columns"><Link to="/campaigns/browse">Explore</Link></li>
              <li className="columns search expand">
                <form onSubmit={this.onSubmit}>
                  <input
                    type="search"
                    name="search"
                    id="search"
                    value={this.state.search}
                    onChange={this.onChange}
                    onClick={this.onClick}
                    onBlur={this.onBlur} />
                  <button type="submit"></button>
                </form>
              </li>
              <li className="user shrink">
                <a
                  className={`${this.props.onRequireAuth() ? 'logged-in' : ''}${this.props.userInfo.picture !== '/assets/img/user.svg' && 'picture' in this.props.userInfo ? ' picture' : ''}`}>
                  {this.props.userInfo.picture !== '/assets/img/user.svg' && 'picture' in this.props.userInfo
                    ? <img
                      src={this.props.userInfo.picture}
                      alt="User Profile Picture Thumbnail" />
                    : ''}
                </a>
                <UserMenu
                  requireAuth={this.props.onRequireAuth}
                  userType={this.props.userInfo.userType}
                  onLogout={this.props.onLogout} />
              </li>
            </ul>
          </nav>
        </div>
        <div className="orange-line"></div>
      </header>
    );
  }
}

export default Header;
