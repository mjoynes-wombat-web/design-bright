/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

// IMPORT USER MENU COMPONENT
import UserMenu from './components/userMenu';

// IMPORT COMPONENT STYLE
import './scss/style.scss';

// HEADER COMPONENT
// Header component with state.
class Header extends React.Component {
  // Sets up state and props and binds this to the class methods.
  constructor(props) {
    super(props);
    this.state = {
      search: 'Search',
      searchSubmit: false,
    };

    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.onBlurSearch = this.onBlurSearch.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  // When component updates check if search was submitted and reset the value to Search.
  componentDidUpdate() {
    if (this.state.searchSubmit) {
      this.setState({ search: 'Search', searchSubmit: false });
    }
  }

  // Pass search input changes to state.
  onChangeSearch(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  // When search is clicked clear the value.
  onClickSearch(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    if (value === 'Search') {
      this.setState({ [name]: '' });
    }
  }

  // When search is blurred change the value to Search.
  onBlurSearch(e) {
    const target = e.target;
    const name = target.name;

    this.setState({ [name]: 'Search' });
  }

  // When search is submitted change the searchSubmit state to true.
  onSubmit(e) {
    e.preventDefault();
    this.setState({
      searchSubmit: true,
    });
  }

  render() {
    // If search was submitted, redirect to the campaigns search page and query the
    // input of the value.
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
                    onChange={this.onChangeSearch}
                    onClick={this.onClickSearch}
                    onBlur={this.onBlurSearch} />
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
