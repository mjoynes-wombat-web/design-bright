/* eslint-env browser */
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import queryString from 'query-string';

import './scss/style.scss';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false,
    };

    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    return this.props.onGetUserInfo(() => this.setState({ fetched: true }));
  }

  componentDidMount() {
    const search = queryString.parse(this.props.location.search);

    if ('origin' in search) {
      switch (search.origin) {
        case 'register':
          return this.props.onNewMessage('You can\'t create a new user while logged in.');
        case 'login':
          return this.props.onNewMessage('You are already logged in.');
        default:
          return null;
      }
    }
    return null;
  }

  render() {
    if (this.props.onRequireAuth()) {
      if (this.state.fetched) {
        return (
          <main id="profile" className="small-12 columns">
            <section className="row align-center">
              <div className="profile-wrapper small-3 columns">
                <img src={this.props.userInfo.picture} className="profile-img" />
                <Link to='/profile/upload-photo'>
                  <span></span> Upload Profile Photo
                </Link>
              </div>
              <div className="small-12 medium-9 columns">
                <h1>
                  <span className="underlined">
                    {this.props.userInfo.userType === 'non-profit'
                      ? this.props.userInfo.nonProfitName
                      : `${this.props.userInfo.firstName} ${this.props.userInfo.lastName}`
                    }'s Profile
                  </span>
                </h1>
                <p className="title">Name:</p>
                <p>{this.props.userInfo.firstName} {this.props.userInfo.lastName}</p>
                <p className="title">Email:</p>
                <p>{this.props.userInfo.email}</p>
                {this.props.userInfo.userType === 'non-profit'
                  ? <div className='non-profit-info'>
                    <p className="title">Address:</p>
                    <p>{this.props.userInfo.address}<br />
                      {this.props.userInfo.city}, {this.props.userInfo.state} {this.props.userInfo.zip}</p>
                    <p className="title">Employer Identification Number (EIN):</p>
                    <p>{this.props.userInfo.ein}</p>
                  </div>
                  : ''}
                <p>
                  {`Password Changed on ${this.props.userInfo.passwordDate.getMonth() + 1}/${this.props.userInfo.passwordDate.getDate()}/${this.props.userInfo.passwordDate.getFullYear()}`}
                </p>
              </div>
            </section>
          </main>
        );
      }
      return (
        <h1>Loading</h1>
      );
    }

    return (
      <Redirect to={{
        pathname: '/login',
        search: '?origin=profile',
      }} />
    );
  }
}

export default Profile;
