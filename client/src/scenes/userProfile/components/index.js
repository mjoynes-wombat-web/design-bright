import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import requireAuth from '../../../helpers/requireAuth';
import './scss/style.scss';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'James',
      lastName: 'Roberts',
      email: 'jimmyr@gmail.com',
      passwordDate: new Date(Date.parse('2017-08-16T16:54:54.323Z')),
      position: '',
      userType: 'donor',
      profileImg: '/assets/img/james-roberts.jpg',
    };
  }

  render() {
    if (requireAuth()) {
      return (
        <main className="profile">
          <section className="row align-center">
            <div className="profile-wrapper small-3 columns">
              <img src={this.state.profileImg} className="profile-img" />
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
              <p>Password Changed on {this.state.passwordDate.getMonth()}/{this.state.passwordDate.getDate()}/{this.state.passwordDate.getFullYear()}</p>
            </div>
          </section>
        </main>
      );
    }

    return (
      <Redirect to={{
        pathname: '/login',
      }} />
    );
  }
}

export default Profile;
