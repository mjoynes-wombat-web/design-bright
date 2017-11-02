import React from 'react';
import styled from 'styled-components';

import { colors, screenBreaks, globalStyle } from '../styleConsts';

globalStyle();

export const Label = styled(
  ({ className, id, inputLabel, required, error }) => (
    <div className={className}>
      <label htmlFor={id}>
        {inputLabel} {required
          ? <span className='required'>*</span>
          : null}
      </label>
      {error ? <p className='error'>{error}</p> : null}
    </div>
  ),
) `
label {
  color: ${colors.lightGraphite};
  font-size: 1.125rem;
  font-weight: 300;
  margin-bottom: 0.375rem;
  display: block;
}

.required {
  color: ${colors.mauiOrange};
  font-weight: 400;
}

@media screen and (min-width: ${screenBreaks.medium}) {
  label {
    font-size: 1.25rem;
  }
}

${props => (props.error ?
    `
    label {
      color: ${colors.errorRed};
      font-weight: 400;
    }

    .error {
      color: ${colors.errorRed};
      font-size: 0.625rem;
      margin: 0.125rem 0 0 0;
    }

    @media screen and (min-width: ${screenBreaks.medium}) {
      .error {
        font-size: 0.75rem;
        margin:  0.25rem 0 0 0;
      }
    }
  `
    : null)}
`;

const generalInputStyling = `
input, select {
  color: ${colors.graphite};
  font-size: 1rem;
  font-weight: 300;
  min-width: 15rem;
  box-sizing: border-box;
  border: 0.0625rem solid ${colors.lightGraphite};
  border-radius: 0.1875rem;
  padding: 0.375rem;
  margin-top: 0.25rem;
  appearance: none;
  font-weight: 400;
}

@media screen and (min-width: ${screenBreaks.medium}) {
  input, select {
    min-width: 20rem;
    font-size: 1.125rem;
    padding: 0.5rem;
    margin-top: 0.375rem;
  }
}
`;

export const Input = styled(
  ({ className, id, inputLabel, required, error, onChange }) => (
    <div className={className}>
      {inputLabel
        ? <Label id={id} inputLabel={inputLabel} required={required} error={error} />
        : null}
      <input onChange={onChange} id={id} required={required} />
    </div>
  ),
) `
${generalInputStyling}
`;

export const Select = styled(
  ({ className, id, inputLabel, required, error, onChange, options }) => (
    <div className={className}>
      {inputLabel
        ? <Label id={id} inputLabel={inputLabel} required={required} error={error} />
        : null}
      <select defaultValue="" onChange={onChange} id={id} required={required}>
        <option value="" disabled>Choose an Option</option>
        {options.map(
          (option, i) =>
            <option value={option.value} key={i}>
              {option.name}
            </option>)}
      </select>
    </div>
  ),
) `
${generalInputStyling}

select {
  background-color: white;
  background-image: url(/assets/img/chevron-square-sprite.svg);
  background-position: right 0.625rem top;
  background-repeat: no-repeat;
  background-size: auto 200%;
  cursor: pointer;

  &:hover {
    background-position: right 0.625rem bottom;
  }
}
`;
