import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import './scss/style.scss';
import states from '../../../../helpers/states';

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
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (
      doPasswordsMatch(this.state.password, this.state.confirmPassword)
      && ((isNumber(this.state.zip) && numLength(this.state.zip, 5))
        || this.state.userType === 'donor')
      && ((isNumber(this.state.ein) && numLength(this.state.ein, 9))
        || this.state.userType === 'donor')
    ) {
      axios.post('http://localhost:3001/api/users/create', this.state);
    } else {
      console.log('You missed a field');
    }
  }

  render() {
    return (
      <main className="register">
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
                  <label htmlFor="email">
                    Email: <span className="required">*</span>
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
                      <span className='error'>You entered an invlaid Zip Code.</span>
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
                className="primary small-11 medium-10 large-8"
                type="submit">
                Submit Request
              </button>
            </div>
          </form>
        </section>
      </main>
    );
  }
}

export default Register;
