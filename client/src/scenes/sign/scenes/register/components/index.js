import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './scss/style.scss';

// const Register = ({ onSubmitUser = f => f }) => {
//   const newUser = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     userTypeNonProfit: false,
//     userTypeDonor: false,
//     position: '',
//     nonProfitName: '',
//     ein: null,
//     address: '',
//     city: '',
//     state: '',
//     zip: null,
//     agreed: false,
//   };

//   const submit = (e) => {
//     e.preventDefault();
//     onSubmitUser({
//       firstName: newUser.firstName.value,
//       lastName: newUser.lastName.value,
//       email: newUser.email.value,
//       password: newUser.password.value,
//       confirmPassword: newUser.confirmPassword.value,
//       userTypeNonProfit: newUser.userTypeNonProfit.checked,
//       userTypeDonor: newUser.userTypeDonor.checked,
//       position: newUser.position.value,
//       nonProfitName: newUser.nonProfitName.value,
//       ein: newUser.ein.value,
//       address: newUser.address.value,
//       city: newUser.city.value,
//       state: newUser.state.value,
//       zip: newUser.zip.value,
//       agreed: newUser.agreed.checked,
//     });
//   };


//   return (
//     <main className="register">
//       <section className="row align-center">
//         <form className="small-12 columns" onSubmit={submit}>
//           <div className="row">
//             <h1 className="small-12 columns"><span className="underlined">Register</span></h1>
//           </div>
//           <div className="row align-center">
//             <div className="small-12 large-4 columns">
//               <fieldset>
//                 <label htmlFor="first-name">
//                   First Name: <span className="required">*</span>
//                 </label>
//                 <input
//                   ref={input => newUser.firstName = input}
//                   type="text"
//                   name="firstName"
//                   id="first-name"
//                   required />
//                 <label htmlFor="last-name">
//                   Last Name: <span className="required">*</span>
//                 </label>
//                 <input
//                   ref={input => newUser.lastName = input}
//                   type="text"
//                   name="lastName"
//                   id="last-name"
//                   required />
//                 <label htmlFor="email">
//                   Email: <span className="required">*</span>
//                 </label>
//                 <input
//                   ref={input => newUser.email = input}
//                   type="email"
//                   name="email"
//                   required
//                   id="email" />
//               </fieldset>
//               <hr />
//               <label htmlFor="password">
//                 Password: <span className="required">*</span>
//               </label>
//               <input
//                 ref={input => newUser.password = input}
//                 type="password"
//                 name="password"
//                 id="password"
//                 required />
//               <label htmlFor="confirm-password">
//                 Confirm Password: <span className="required">*</span>
//               </label>
//               <input
//                 ref={input => newUser.confirmPassword = input}
//                 type="password"
//                 name="confirmPassword"
//                 id="confirm-password"
//                 required />
//               <hr className="hide-for-large" />
//             </div>
//             <div className="small-12 large-4 columns">
//               <fieldset className="user-type">
//                 <legend>
//                   Are you a donor or non-profit? <span className="required">*</span>
//                 </legend>
//                 <label htmlFor="non-profit">
//                   <input
//                     ref={input => newUser.userTypeNonProfit = input}
//                     onBlur = {() => selectUserType(this)}
//                     type="checkbox"
//                     name="userTypeNonProfit"
//                     value="non-profit"
//                     id="non-profit" />
//                   <span></span>
//                   Non-Profit
//                   </label>
//                 <label htmlFor="donor">
//                   <input
//                     ref={input => newUser.userTypeDonor = input}
//                     type="checkbox"
//                     name="userTypeDonor"
//                     value="donor"
//                     id="donor" />
//                   <span></span>
//                   Donor
//                   </label>
//               </fieldset>
//               <label htmlFor="position">
//                 Position at Non-Profit: <span className="required">*</span>
//               </label>
//               <input
//                 ref={input => newUser.position = input}
//                 type="text"
//                 name="position"
//                 id="position"
//                 required />
//               <label htmlFor="non-profit-name">
//                 Non-Profit Name: <span className="required">*</span>
//               </label>
//               <input
//                 ref={input => newUser.nonProfitName = input}
//                 type="text"
//                 name="nonProfitName"
//                 id="non-profit-name"
//                 required />
//               <label htmlFor="ein">
//                 Employer Identification Number (EIN): <span className="required">*</span>
//               </label>
//               <input
//                 ref={input => newUser.ein = input}
//                 type="text"
//                 name="ein"
//                 id="ein"
//                 required />
//               <hr className="hide-for-large" />
//             </div>
//             <div className="small-12 large-4 columns">
//               <label htmlFor="address">
//                 Address: <span className="required">*</span>
//               </label>
//               <input
//                 ref={input => newUser.address = input}
//                 type="text"
//                 name="address"
//                 id="address"
//                 required />
//               <label htmlFor="city">
//                 City: <span className="required">*</span>
//               </label>
//               <input
//                 ref={input => newUser.city = input}
//                 type="text"
//                 name="city"
//                 id="city"
//                 required />
//               <label htmlFor="state">
//                 State: <span className="required">*</span>
//               </label>
//               <select
//                 ref={input => newUser.state = input}
//                 name="st"
//                 id="state"
//                 required>
//                 <option value="" disabled>Choose Your State</option>
//                 <option value="al">Alabama</option>
//                 <option value="ak">Alaska</option>
//                 <option value="az">Arizona</option>
//                 <option value="ar">Arkansas</option>
//               </select>
//               <label htmlFor="zip">
//                 Zip: <span className="required">*</span>
//               </label>
//               <input
//                 ref={input => newUser.zip = input}
//                 type="text"
//                 name="zip"
//                 id="zip"
//                 required />
//             </div>
//           </div>
//           <div className="row align-center">
//             <label htmlFor="terms" className="small-12 columns terms">
//               <input
//                 ref={input => newUser.agreed = input}
//                 type="checkbox"
//                 name="agreed"
//                 id="terms"
//                 required />
//               <span></span>
//               I am authorized to represent the non-profit listed above and agree to the Design Bright <Link to="/help/terms">terms of
//             service.</Link>
//             </label>
//             <button
//               className="primary small-11 medium-10 large-8"
//               type="submit">
//               Submit Request
//               </button>
//           </div>
//         </form>
//       </section>
//     </main>
//   )
// }

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordsMatch: true,
      userTypeNonProfit: false,
      userTypeDonor: false,
      position: '',
      nonProfitName: '',
      ein: '',
      einValid: true,
      address: '',
      city: '',
      state: '',
      zip: '',
      zipValid: true,
      agreed: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  onChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value }, () => this.validate(target, value, name));
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.passwordsMatch) {
      if (this.state.userTypeNonProfit || this.state.userTypeDonor) {
        if (this.state.agreed) {
          if (this.state.userTypeNonProfit) {
            if (this.state.einValid) {
              if (this.zipValid) {
                return this.props.onSubmitUser(this.state);
              }
              return new Error('The Zip you entered isn\'t valid');
            }
            return new Error('The Employer Identification Number you entered isn\'t valid');
          }
          return this.props.onSubmitUser(this.state);
        }
        return new Error('You haven\'t agreed to the terms of service.');
      }
      return new Error('No user type is selected.');
    }
    return new Error('The passwords don\'t match.');
  }

  validate(target, value, name) {
    if (target.type === 'checkbox') {
      if (this.state.userTypeDonor === true && this.state.userTypeNonProfit === true) {
        if (name === 'userTypeNonProfit') {
          this.setState({ userTypeDonor: false });
        } else {
          this.setState({ userTypeNonProfit: false });
        }
      }
    }

    if (name === 'confirmPassword') {
      if (value === this.state.password) {
        this.setState({ passwordsMatch: true });
      } else {
        this.setState({ passwordsMatch: false });
      }
    } else if (name === 'password') {
      if (value === this.state.confirmPassword) {
        this.setState({ passwordsMatch: true });
      } else {
        this.setState({ passwordsMatch: false });
      }
    }

    if (name === 'ein') {
      console.log(value.length);
      if (value.match('[0-9]+') && String(value).length === 9) {
        this.setState({ einValid: true });
      } else {
        this.setState({ einValid: false });
      }
    }

    if (name === 'zip') {
      console.log(value.length);
      if (value.match('[0-9]+') && String(value).length === 5) {
        this.setState({ zipValid: true });
      } else {
        this.setState({ zipValid: false });
      }
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
                <label htmlFor="confirm-password" className={this.state.passwordsMatch ? '' : 'bad-pass'}>
                  Confirm Password: <span className="required">*</span><span className={`pass-match ${this.state.passwordsMatch ? '' : 'bad-pass'}`}>Your passwords don't match.</span>
                </label>
                <input
                  value={this.state.confirmPassword}
                  className={this.state.passwordsMatch ? '' : 'bad-pass'}
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
                      checked={this.state.userTypeDonor}
                      onChange={this.onChange}
                      onClick={this.onClick}
                      type="checkbox"
                      name="userTypeDonor"
                      value="donor"
                      id="donor"
                      required={
                        this.state.userTypeNonProfit || this.state.userTypeDonor ?
                          this.state.userTypeDonor : true
                      }/>
                    <span></span>
                    Donor
                  </label>
                  <label htmlFor="non-profit">
                    <input
                      checked={this.state.userTypeNonProfit}
                      onChange={this.onChange}
                      onClick={this.onClick}
                      type="checkbox"
                      name="userTypeNonProfit"
                      value="non-profit"
                      id="non-profit"
                      required={
                        this.state.userTypeNonProfit || this.state.userTypeDonor
                          ? this.state.userTypeNonProfit : true
                      } />
                    <span></span>
                    Non-Profit
                  </label>
                </fieldset>
                <div className={this.state.userTypeNonProfit ? '' : 'hide'}>
                  <label htmlFor="position">
                    Position at Non-Profit: <span className="required">*</span>
                  </label>
                  <input
                    value={this.state.position}
                    onChange={this.onChange}
                    type="text"
                    name="position"
                    id="position"
                    required={this.state.userTypeNonProfit} />
                  <label htmlFor="non-profit-name">
                    Non-Profit Name: <span className="required">*</span>
                  </label>
                  <input
                    value={this.state.nonProfitName}
                    onChange={this.onChange}
                    type="text"
                    name="nonProfitName"
                    id="non-profit-name"
                    required={this.state.userTypeNonProfit} />
                  <label htmlFor="ein">
                    Employer Identification Number (EIN): <span className="required">*</span>
                  </label>
                  <input
                    value={this.state.ein}
                    onChange={this.onChange}
                    type="text"
                    name="ein"
                    id="ein"
                    required={this.state.userTypeNonProfit} />
                  <hr className="hide-for-large" />
                </div>
              </div>
              <div className='small-12 large-4 columns'>
                <div className={this.state.userTypeNonProfit ? '' : 'hide'}>
                  <label htmlFor="address">
                    Address: <span className="required">*</span>
                  </label>
                  <input
                    value={this.state.address}
                    onChange={this.onChange}
                    type="text"
                    name="address"
                    id="address"
                    required={this.state.userTypeNonProfit} />
                  <label htmlFor="city">
                    City: <span className="required">*</span>
                  </label>
                  <input
                    value={this.state.city}
                    onChange={this.onChange}
                    type="text"
                    name="city"
                    id="city"
                    required={this.state.userTypeNonProfit} />
                  <label htmlFor="state">
                    State: <span className="required">*</span>
                  </label>
                  <select
                    value={this.state.state}
                    onChange={this.onChange}
                    name="st"
                    id="state"
                    required={this.state.userTypeNonProfit} >
                    <option value="" disabled>Choose Your State</option>
                    <option value="al">Alabama</option>
                    <option value="ak">Alaska</option>
                    <option value="az">Arizona</option>
                    <option value="ar">Arkansas</option>
                  </select>
                  <label htmlFor="zip">
                    Zip: <span className="required">*</span>
                  </label>
                  <input
                    value={this.state.zip}
                    onChange={this.onChange}
                    type="text"
                    name="zip"
                    id="zip"
                    required={this.state.userTypeNonProfit} />
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
                <span></span> {this.state.userTypeNonProfit ? 'I am authorized to represent the non-profit listed above and' : 'I '} agree to the Design Bright <Link to="/help/terms">terms of
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

Register.propTypes = {
  onSubmitUser: PropTypes.func.isRequired,
};

export default Register;
