import React from 'react';
import './scss/style.scss';

const FormBeginning = () => (
  <fieldset>
    <label for="first-name">First Name: <span className="required">*</span></label>
    <input type="text" name="first-name" required id="first-name" />
    <label for="last-name">Last Name: <span className="required">*</span></label>
    <input type="text" name="last-name" required id="last-name" />
    <label for="email">Email: <span className="required">*</span></label>
    <input type="email" name="email" required id="email" />
  </fieldset>
);

export default FormBeginning;
