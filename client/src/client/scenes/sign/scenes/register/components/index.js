/* eslint-env browser */
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import './scss/style.scss';
import states from '../../../../../helpers/states';
import validEmail from '../../../../../helpers/validEmail';

const doPasswordsMatch = (pass, confPass) => pass === confPass;
const isNumber = (num) => {
  const numbers = num.match('[0-9]+');
  if (numbers) {
    return numbers[0] === num;
  }
  return false;
};
const numLength = (num, length) => String(num).length === length;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: 'donor',
      position: '',
      nonProfitName: '',
      ein: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      agreed: false,
      valid: false,
      userPostResults: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(
      { [name]: value },
      () => {
        if (this.validate()) {
          this.setState({ valid: true });
        } else {
          this.setState({ valid: false });
        }
      },
    );
  }

  validate() {
    if (
      this.state.firstName.length > 0
      && this.state.lastName.length > 0
      && (this.state.email.length > 0
        && validEmail(this.state.email))
      && doPasswordsMatch(this.state.password, this.state.confirmPassword)
      && this.state.password.length > 0
      && (
        this.state.userType === 'donor'
        || (
          this.state.position.length > 0
          && this.state.nonProfitName.length > 0
          && (isNumber(this.state.ein)
            && numLength(this.state.ein, 9))
          && this.state.address.length > 0
          && this.state.city.length > 0
          && this.state.state.length === 2
          && (isNumber(this.state.zip)
            && numLength(this.state.zip, 5))
        )
      )
      && this.state.agreed) {
      return true;
    }
    return false;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.valid) {
      const User = (
        { email,
          password,
          firstName,
          lastName,
          userType,
          position,
          nonProfitName,
          ein,
          address,
          city,
          state,
          zip }) => ({
        userInfo: {
          email,
          password,
          user_metadata: {
            firstName,
            lastName,
            passwordDate: new Date(),
            position,
          },
          app_metadata: {
            userType,
          },
        },
        nonProfitInfo: {
          name: nonProfitName,
          ein,
          address,
          city,
          state,
          zip,
        },
      });

      axios.post(
        `https://${window.location.hostname}:3000/api/users/create`,
        User(this.state))
        .then((results) => {
          const createUserResults = results.data;

          this.props.onNewMessage(`Congratulations, your have created an account for ${createUserResults.data.email}`);
          this.setState({ userPostResults: createUserResults });

          window.scroll(0, 0);
        })
        .catch((error) => {
          const createUserError = error.response.data;
          createUserError.message = `${createUserError.data.email.charAt(0).toUpperCase()}${createUserError.data.email.slice(1)} is already in use.`;

          this.props.onNewError(createUserError.message);
          this.setState({ userPostResults: createUserError });

          window.scroll(0, 0);
        });
    } else {
      this.props.onNewError('You have an invalid or empty field. Please make sure everything is filled out.');

      window.scroll(0, 0);
    }
  }

  render() {
    if (this.props.onRequireAuth()) {
      return (
        <Redirect to={{
          pathname: '/profile',
          search: '?origin=register',
        }} />
      );
    }
    return (
      <main id="register">
        <section className="row align-center">
          <form className="small-12 columns" onSubmit={this.onSubmit}>
            <div className="row">
              <h1 className="small-12 columns"><span className="underlined">Register</span></h1>
            </div>
            <div className="row align-center">
              <div className="small-12 large-4 columns">
                <fieldset>
                  <label htmlFor="first-name">
                    First Name: <span className="required">*</span>
                  </label>
                  <input
                    value={this.state.firstName}
                    onChange={this.onChange}
                    type="text"
                    name="firstName"
                    id="first-name"
                    required />
                  <label htmlFor="last-name">
                    Last Name: <span className="required">*</span>
                  </label>
                  <input
                    value={this.state.lastName}
                    onChange={this.onChange}
                    type="text"
                    name="lastName"
                    id="last-name"
                    required />
                  <label htmlFor="email" className={`row${this.props.error.type === 'register' ? ' invalid' : ''}${(validEmail(this.state.email) || this.state.email.length === 0) ? '' : ' invalid'}`}>
                    <div className="small-12 columns">
                      Email: <span className="required">*</span>
                    </div>
                    <div className=" small-12 columns">
                      <span className='error'>{this.props.error.type === 'register' ? this.props.error.message : 'Please enter a valid email address.'}</span>
                    </div>
                  </label>
                  <input
                    value={this.state.email}
                    onChange={this.onChange}
                    type="email"
                    name="email"
                    required
                    id="email" />
                </fieldset>
                <hr />
                <label htmlFor="password">
                  Password: <span className="required">*</span>
                </label>
                <input
                  value={this.state.password}
                  onChange={this.onChange}
                  type="password"
                  name="password"
                  id="password"
                  required />
                <label htmlFor="confirm-password" className={`row${doPasswordsMatch(this.state.password, this.state.confirmPassword) ? '' : ' invalid'}`}>
                  <div className="small-12 columns">
                    Confirm Password: <span className="required">*</span>
                  </div>
                  <div className=" small-12 columns">
                    <span className='error'>Your passwords don't match.</span>
                  </div>
                </label>
                <input
                  value={this.state.confirmPassword}
                  onChange={this.onChange}
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  required />
                <hr className="hide-for-large" />
              </div>
              <div className="small-12 large-4 columns">
                <fieldset className="user-type">
                  <legend>
                    Are you a donor or non-profit? <span className="required">*</span>
                  </legend>
                  <label htmlFor="donor">
                    <input
                      onChange={this.onChange}
                      onClick={this.onClick}
                      type="radio"
                      checked={this.state.userType === 'donor'}
                      name="userType"
                      value="donor"
                      id="donor" />
                    <span></span>
                    Donor
                  </label>
                  <label htmlFor="non-profit">
                    <input
                      onChange={this.onChange}
                      onClick={this.onClick}
                      checked={this.state.userType === 'non-profit'}
                      type="radio"
                      name="userType"
                      value="non-profit"
                      id="non-profit" />
                    <span></span>
                    Non-Profit
                  </label>
                </fieldset>
                <div className={this.state.userType === 'non-profit' ? '' : 'hide'}>
                  <label htmlFor="position">
                    Position at Non-Profit: <span className="required">*</span>
                  </label>
                  <input
                    value={this.state.position}
                    onChange={this.onChange}
                    type="text"
                    name="position"
                    id="position"
                    required={this.state.userType === 'non-profit'} />
                  <label htmlFor="non-profit-name">
                    Non-Profit Name: <span className="required">*</span>
                  </label>
                  <input
                    value={this.state.nonProfitName}
                    onChange={this.onChange}
                    type="text"
                    name="nonProfitName"
                    id="non-profit-name"
                    required={this.state.userType === 'non-profit'} />
                  <label
                    htmlFor="ein"
                    className={`row align-bottom${(isNumber(this.state.ein) && numLength(this.state.ein, 9)) ? '' : ' invalid'}${numLength(this.state.ein, 0) ? ' empty' : ''}`}>
                    <div className="small-12 columns">
                      Employer Identification Number (EIN): <span className="required">*</span>
                    </div>
                    <div className="small-12 columns">
                      <span className='error'>You entered an invlaid EIN.</span>
                    </div>
                  </label>
                  <input
                    value={this.state.ein}
                    onChange={this.onChange}
                    type="text"
                    name="ein"
                    id="ein"
                    required={this.state.userType === 'non-profit'} />
                  <hr className="hide-for-large" />
                </div>
              </div>
              <div className='small-12 large-4 columns'>
                <div className={this.state.userType === 'non-profit' ? '' : 'hide'}>
                  <label htmlFor="address">
                    Address: <span className="required">*</span>
                  </label>
                  <input
                    value={this.state.address}
                    onChange={this.onChange}
                    type="text"
                    name="address"
                    id="address"
                    required={this.state.userType === 'non-profit'} />
                  <label htmlFor="city">
                    City: <span className="required">*</span>
                  </label>
                  <input
                    value={this.state.city}
                    onChange={this.onChange}
                    type="text"
                    name="city"
                    id="city"
                    required={this.state.userType === 'non-profit'} />
                  <label htmlFor="state">
                    State: <span className="required">*</span>
                  </label>
                  <select
                    value={this.state.state}
                    onChange={this.onChange}
                    name="state"
                    id="state"
                    required={this.state.userType === 'non-profit'} >
                    <option value="" disabled>Choose Your State</option>
                    {states.map(
                      (state, i) =>
                        <option value={state.abbreviation} key={i}>
                          {state.name}
                        </option>)}
                  </select>
                  <label htmlFor="zip" className={`row ${(isNumber(this.state.zip) && numLength(this.state.zip, 5)) ? '' : 'invalid'}${numLength(this.state.zip, 0) ? ' empty' : ''}`}>
                    <div className="small-12 columns">
                      Zip: <span className="required">*</span>
                    </div>
                    <div className="small-12 columns">
                      <span className='error'>You entered an invalid Zip Code.</span>
                    </div>
                  </label>
                  <input
                    value={this.state.zip}
                    onChange={this.onChange}
                    type="text"
                    name="zip"
                    id="zip"
                    required={this.state.userType === 'non-profit'} />
                </div>
              </div>
            </div>
            <div className="row align-center">
              <label htmlFor="terms" className="small-12 columns terms">
                <input
                  checked={this.state.agreed}
                  onChange={this.onChange}
                  type="checkbox"
                  name="agreed"
                  id="terms"
                  required />
                <span></span> {this.state.userType === 'non-profit' ? 'I am authorized to represent the non-profit listed above and' : 'I '} agree to the Design Bright <Link to="/help/terms">terms of
            service.</Link> <span className='required'>*</span>
              </label>
              <button
                className={`primary small-11 medium-10 large-8${this.state.valid ? '' : ' disabled'}`}
                disabled={!this.state.valid}
                type="submit">
                Submit Request
              </button>
              <span className='error small-12'>Please make sure you've entered all your information.</span>
            </div>
          </form>
        </section>
      </main>
    );
  }
}

export default Register;
