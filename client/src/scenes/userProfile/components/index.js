/* eslint-env browser */
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import auth0 from 'auth0-js';
import axios from 'axios';
import queryString from 'query-string';

import requireAuth from '../../../helpers/requireAuth';
import './scss/style.scss';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      passwordDate: new Date(),
      position: '',
      userType: '',
      picture: '/assets/img/user.svg',
      nonProfitName: '',
      ein: '',
      address: '',
      city: '',
      state: '',
      zip: null,
      fetched: false,
    };

    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    if (requireAuth()) {
      const webAuth = new auth0.WebAuth({
        domain: 'designbright.auth0.com',
        clientID: 'bBvDRGSmgiYZk2GRZ3Va5hGeuNKwQ3Rh',
      });

      webAuth.client.userInfo(
        this.props.userAuth.accessToken,
        (err, userInfo) => {
          if (err) {
            if (err.code === 401) {
              this.props.onLogout();
              return;
            }
          }

          const { email, picture } = userInfo;
          const { firstName, lastName, passwordDate, position } = userInfo.user_metadata;
          const { userType } = userInfo.app_metadata;
          this.setState({
            firstName,
            lastName,
            email,
            passwordDate: new Date(Date.parse(passwordDate)),
            position,
            userType,
          });

          if (userType === 'non-profit') {
            axios.get(`https://${window.location.hostname}:3000/api/nonprofits/${this.props.userAuth.accessToken}`)
              .then(({ data }) => {
                const { name, ein, address, city, state, zip } = data.data;
                return this.setState({
                  nonProfitName: name,
                  ein,
                  address,
                  city,
                  state,
                  zip,
                  fetched: true,
                });
              })
              .catch(error => (error.response.data.statusCode === 401 ? this.props.onLogout() : this.props.onNewError(error.response.data.message)));
          }

          if (picture.indexOf('s.gravatar.com/avatar/')) {
            return;
          }

          this.setState({
            picture,
            fetched: true,
          });
        },
      );
    }
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
    if (requireAuth()) {
      if (this.state.fetched) {
        return (
          <main id="profile" className="small-12 columns">
            <section className="row align-center">
              <div className="profile-wrapper small-3 columns">
                <img src={this.state.picture} className="profile-img" />
                <Link to='/profile/upload-photo'>
                  <span></span> Upload Profile Photo
              </Link>
              </div>
              <div className="small-12 medium-9 columns">
                <h1>
                  <span className="underlined">
                    {this.state.userType === 'non-profit'
                      ? this.state.nonProfitName
                      : `${this.state.firstName} ${this.state.lastName}`
                    }'s Profile
                </span>
                </h1>
                <p className="title">Name:</p>
                <p>{this.state.firstName} {this.state.lastName}</p>
                <p className="title">Email:</p>
                <p>{this.state.email}</p>
                {this.state.userType === 'non-profit'
                  ? <div className='non-profit-info'>
                    <p className="title">Address:</p>
                    <p>{this.state.address}<br />
                      {this.state.city}, {this.state.state} {this.state.zip}</p>
                    <p className="title">Employer Identification Number (EIN):</p>
                    <p>{this.state.ein}</p>
                  </div>
                  : ''}
                <p>
                  {`Password Changed on ${this.state.passwordDate.getMonth() + 1}/${this.state.passwordDate.getDate()}/${this.state.passwordDate.getFullYear()}`}
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
