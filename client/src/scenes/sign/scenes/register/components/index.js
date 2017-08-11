import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import './scss/style.scss';

const Register = (props) => {
  const newUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userTypeNonProfit: false,
    userTypeDonor: false,
    position: '',
    nonProfitName: '',
    ein: null,
    address: '',
    city: '',
    state: '',
    zip: null,
    agreed: false,
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmitUser({
      firstName: newUser.firstName.value,
      lastName: newUser.lastName.value,
      email: newUser.email.value,
      password: newUser.password.value,
      confirmPassword: newUser.confirmPassword.value,
      userTypeNonProfit: newUser.userTypeNonProfit.checked,
      userTypeDonor: newUser.userTypeDonor.checked,
      position: newUser.position.value,
      nonProfitName: newUser.nonProfitName.value,
      ein: newUser.ein.value,
      address: newUser.address.value,
      city: newUser.city.value,
      state: newUser.state.value,
      zip: newUser.zip.value,
      agreed: newUser.agreed.checked,
    });
  };


  return (
    <main className="register">
      <section className="row align-center">
        <form className="small-12 columns" onSubmit={submit}>
          <div className="row">
            <h1 className="small-12 columns"><span className="underlined">Register</span></h1>
          </div>
          <div className="row align-center">
            <div className="small-12 large-4 columns">
              <fieldset>
                <label htmlFor="first-name">
                  First Name: <span className="required">*</span>
                </label>
                <Field 
                  name="firstName"
                  component="input"
                  type="text"
                  placeholder="John"
                  id="last-name"
                  required />
                <label htmlFor="last-name">
                  Last Name: <span className="required">*</span>
                </label>
                <Field
                  component="input"
                  type="text"
                  name="lastName"
                  id="last-name"
                  required />
                <label htmlFor="email">
                  Email: <span className="required">*</span>
                </label>
                <Field
                  component="input"
                  type="email"
                  name="email"
                  required
                  id="email" />
              </fieldset>
              <hr />
              <label htmlFor="password">
                Password: <span className="required">*</span>
              </label>
              <Field
                component="input"
                type="password"
                name="password"
                id="password"
                required />
              <label htmlFor="confirm-password">
                Confirm Password: <span className="required">*</span>
              </label>
              <Field
                component="input"
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
                <label htmlFor="non-profit">
                  <Field
                    component="input"
                    type="checkbox"
                    name="userTypeNonProfit"
                    value="non-profit"
                    id="non-profit" />
                  <span></span>
                  Non-Profit
                </label>
                <label htmlFor="donor">
                  <Field
                    component="input"
                    type="checkbox"
                    name="userTypeDonor"
                    value="donor"
                    id="donor" />
                  <span></span>
                  Donor
                </label>
              </fieldset>
              <label htmlFor="position">
                Position at Non-Profit: <span className="required">*</span>
              </label>
              <Field
                component="input"
                type="text"
                name="position"
                id="position"
                required />
              <label htmlFor="non-profit-name">
                Non-Profit Name: <span className="required">*</span>
              </label>
              <Field
                component="input"
                type="text"
                name="nonProfitName"
                id="non-profit-name"
                required />
              <label htmlFor="ein">
                Employer Identification Number (EIN): <span className="required">*</span>
              </label>
              <Field
                component="input"
                type="text"
                name="ein"
                id="ein"
                required />
              <hr className="hide-for-large" />
            </div>
            <div className="small-12 large-4 columns">
              <label htmlFor="address">
                Address: <span className="required">*</span>
              </label>
              <Field
                component="input"
                type="text"
                name="address"
                id="address"
                required />
              <label htmlFor="city">
                City: <span className="required">*</span>
              </label>
              <Field
                component="input"
                type="text"
                name="city"
                id="city"
                required />
              <label htmlFor="state">
                State: <span className="required">*</span>
              </label>
              <Field
                component="select"
                name="st"
                id="state"
                required>
                <option value="" disabled>Choose Your State</option>
                <option value="al">Alabama</option>
                <option value="ak">Alaska</option>
                <option value="az">Arizona</option>
                <option value="ar">Arkansas</option>
              </Field>
              <label htmlFor="zip">
                Zip: <span className="required">*</span>
              </label>
              <Field
                component="input"
                type="text"
                name="zip"
                id="zip"
                required />
            </div>
          </div>
          <div className="row align-center">
            <label htmlFor="terms" className="small-12 columns terms">
              <Field
                component="input"
                type="checkbox"
                name="agreed"
                id="terms"
                required />
              <span></span>
              I am authorized to represent the non-profit listed above and agree to the Design Bright <Link to="/help/terms">terms of
            service.</Link>
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
};

// class Register extends React.Component {
// constructor(props) {
//     super(props);
//     this.state = {
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//       userTypeNonProfit: false,
//       userTypeDonor: false,
//       position: '',
//       nonProfitName: '',
//       ein: '',
//       address: '',
//       city: '',
//       st: '',
//       zip: '',
//       agreed: false,
//     };

//     this.onChange = this.onChange.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//   }

//   onChange(e) {
//     const target = e.target;
//     const value = target.type === 'checkbox' ? target.checked : target.value;
//     const name = target.name;

//     this.setState({ [name]: value });
//   }

//   onSubmit(e) {
//     e.preventDefault();
//     this.props.createUser(this.state);
//   }

//   render() {
//     return (
//       <main className="register">
//         <section className="row align-center">
//           <form className="small-12 columns" onSubmit={this.onSubmit}>
//             <div className="row">
//               <h1 className="small-12 columns"><span className="underlined">Register</span></h1>
//             </div>
//             <div className="row align-center">
//               <div className="small-12 large-4 columns">
//                 <fieldset>
//                   <label htmlFor="first-name">
//                     First Name: <span className="required">*</span>
//                   </label>
//                   <input
//                     value={this.state.firstName}
//                     onChange = {this.onChange}
//                     type="text"
//                     name="firstName"
//                     id="first-name"
//                     required />
//                   <label htmlFor="last-name">
//                     Last Name: <span className="required">*</span>
//                   </label>
//                   <input
//                     value={this.state.lastName}
//                     onChange = {this.onChange}
//                     type="text"
//                     name="lastName"
//                     id="last-name"
//                     required />
//                   <label htmlFor="email">
//                     Email: <span className="required">*</span>
//                   </label>
//                   <input
//                     value={this.state.email}
//                     onChange = {this.onChange}
//                     type="email"
//                     name="email"
//                     required
//                     id="email" />
//                 </fieldset>
//                 <hr />
//                 <label htmlFor="password">
//                   Password: <span className="required">*</span>
//                 </label>
//                 <input
//                   value={this.state.password}
//                   onChange = {this.onChange}
//                   type="password"
//                   name="password"
//                   id="password"
//                   required />
//                 <label htmlFor="confirm-password">
//                   Confirm Password: <span className="required">*</span>
//                 </label>
//                 <input
//                   value={this.state.confirmPassword}
//                   onChange = {this.onChange}
//                   type="password"
//                   name="confirmPassword"
//                   id="confirm-password"
//                   required />
//                 <hr className="hide-for-large" />
//               </div>
//               <div className="small-12 large-4 columns">
//                 <fieldset className="user-type">
//                   <legend>
//                     Are you a donor or non-profit? <span className="required">*</span>
//                   </legend>
//                   <label htmlFor="non-profit">
//                     <input
//                       checked={this.state.userTypeNonProfit}
//                       onChange = {this.onChange}
//                       type="checkbox"
//                       name="userTypeNonProfit"
//                       value="non-profit"
//                       id="non-profit" />
//                     <span></span>
//                     Non-Profit
//                   </label>
//                   <label htmlFor="donor">
//                     <input
//                       checked={this.state.userTypeDonor}
//                       onChange = {this.onChange}
//                       type="checkbox"
//                       name="userTypeDonor"
//                       value="donor"
//                       id="donor" />
//                     <span></span>
//                     Donor
//                   </label>
//                 </fieldset>
//                 <label htmlFor="position">
//                   Position at Non-Profit: <span className="required">*</span>
//                 </label>
//                 <input
//                   value={this.state.position}
//                   onChange = {this.onChange}
//                   type="text"
//                   name="position"
//                   id="position"
//                   required />
//                 <label htmlFor="non-profit-name">
//                   Non-Profit Name: <span className="required">*</span>
//                 </label>
//                 <input
//                   value={this.state.nonProfitName}
//                   onChange = {this.onChange}
//                   type="text"
//                   name="nonProfitName"
//                   id="non-profit-name"
//                   required />
//                 <label htmlFor="ein">
//                   Employer Identification Number (EIN): <span className="required">*</span>
//                 </label>
//                 <input
//                   value={this.state.ein}
//                   onChange = {this.onChange}
//                   type="text"
//                   name="ein"
//                   id="ein"
//                   required />
//                 <hr className="hide-for-large" />
//               </div>
//               <div className="small-12 large-4 columns">
//                 <label htmlFor="address">
//                   Address: <span className="required">*</span>
//                 </label>
//                 <input
//                   value={this.state.address}
//                   onChange = {this.onChange}
//                   type="text"
//                   name="address"
//                   id="address"
//                   required />
//                 <label htmlFor="city">
//                   City: <span className="required">*</span>
//                 </label>
//                 <input
//                   value={this.state.city}
//                   onChange = {this.onChange}
//                   type="text"
//                   name="city"
//                   id="city"
//                   required />
//                 <label htmlFor="state">
//                   State: <span className="required">*</span>
//                 </label>
//                 <select
//                   value={this.state.st}
//                   onChange = {this.onChange}
//                   name="st"
//                   id="state"
//                   required>
//                   <option value="" disabled>Choose Your State</option>
//                   <option value="al">Alabama</option>
//                   <option value="ak">Alaska</option>
//                   <option value="az">Arizona</option>
//                   <option value="ar">Arkansas</option>
//                 </select>
//                 <label htmlFor="zip">
//                   Zip: <span className="required">*</span>
//                 </label>
//                 <input
//                   value={this.state.zip}
//                   onChange = {this.onChange}
//                   type="text"
//                   name="zip"
//                   id="zip"
//                   required />
//               </div>
//             </div>
//             <div className="row align-center">
//               <label htmlFor="terms" className="small-12 columns terms">
//                 <input
//                   checked={this.state.agreed}
//                   onChange = {this.onChange}
//                   type="checkbox"
//                   name="agreed"
//                   id="terms"
//                   required />
//                 <span></span>
//                 I am authorized to represent the non-profit listed above and agree to the Design Bright <Link to="/help/terms">terms of
//             service.</Link>
//               </label>
//               <button
//                 className="primary small-11 medium-10 large-8"
//                 type="submit">
//                 Submit Request
//               </button>
//             </div>
//           </form>
//         </section>
//       </main>
//     );
//   }
// }

// Register.propTypes = {
//   createUser: PropTypes.func.isRequired,
// };

export default reduxForm({
  form: 'register',
})(Register);
