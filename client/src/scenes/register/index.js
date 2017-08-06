import React from 'react';
import { Link } from 'react-router-dom';
import FormBeginning from '../../containers/form-beginning';

const Register = () => (
  <main className="advisor">
    <section className="row align-center">
      <form className="small-12 columns">
        <div className="row">
          <h1 className="small-12 columns"><span className="underlined">Register</span></h1>
        </div>
        <div className="row align-center">
          <div className="small-12 large-4 columns">
            <FormBeginning />
            <hr />
            <label for="password">Password: <span className="required">*</span></label>
            <input type="password" name="password" id="password" required />
            <label for="confirm-password">Password: <span className="required">*</span></label>
            <input type="password" name="confirm-password" id="confirm-password" required />
            <hr className="hide-for-large" />
          </div>
          <div className="small-12 large-4 columns">
            <fieldset className="user-type">
              <legend>Are you a donor or non-profit? <span className="required">*</span></legend>
              <label for="non-profit">
                <input type="checkbox" name="non-profit" value="non-profit" id="non-profit" />
                <span></span>
                Non-Profit
              </label>
              <label for="donor">
                <input type="checkbox" name="donor" value="donor" id="donor" />
                <span></span>
                Donor
              </label>
            </fieldset>
            <label for="position">
              Position at Non-Profit: <span className="required">*</span>
            </label>
            <input type="text" name="position" id="position" required />
            <label for="non-profit-name">
              Non-Profit Name: <span className="required">*</span>
            </label>
            <input type="text" name="non-profit-name" id="non-profit-name" required />
            <label for="ein">
              Employer Identification Number (EIN) <span className="required">*</span>
            </label>
            <input type="text" name="ein" id="ein" required />
            <hr className="hide-for-large" />
          </div>
          <div className="small-12 large-4 columns">
            <label for="address">Address: <span className="required">*</span></label>
            <input type="text" name="address" id="address" required />
            <label for="city">City: <span className="required">*</span></label>
            <input type="text" name="city" id="city" required />
            <label for="state">State: <span className="required">*</span></label>
            <select name="state" id="state" required>
              <option value="al">Alabama</option>
              <option value="ak">Alaska</option>
              <option value="az">Arizona</option>
              <option value="ar">Arkansas</option>
            </select>
            <label for="zip">Zip: <span className="required">*</span></label>
            <input type="text" name="zip" id="zip" required />
          </div>
        </div>
        <div className="row align-center">
          <label for="terms" className="small-12 columns terms">
            <input type="checkbox" name="terms" id="terms" required />
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

export default Register;
