import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import auth0 from 'auth0-js';

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

          if (picture.indexOf('gravatar')) {
            return;
          }

          this.setState({ picture });
        },
      );
    }
  }

  render() {
    if (requireAuth()) {
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
                  {this.state.firstName} {this.state.lastName}'s Profile
                </span>
              </h1>
              <p className="title">Name:</p>
              <p>{this.state.firstName} {this.state.lastName}</p>
              <p className="title">Email:</p>
              <p>{this.state.email}</p>
              <p>Password Changed on {this.state.passwordDate.getMonth() + 1}/{this.state.passwordDate.getDate()}/{this.state.passwordDate.getFullYear()}</p>
            </div>
          </section>
        </main>
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
