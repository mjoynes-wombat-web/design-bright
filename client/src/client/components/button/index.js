import styled from 'styled-components';

import { colors, screenBreaks, globalStyle } from '../styleConsts';

globalStyle();

const buttonType = (props) => {
  if (props.primary) {
    return `
    background-image: url(/assets/img/blue-brush-btn.png);
    color: #fff;
    font-size: 1.25rem;
    padding: 1rem 1.25rem;
    width: 90%;

    @media screen and (min-width: ${screenBreaks.medium}) {
      font-size: 1.5rem;
      width: 80%;
      padding: 1.25rem 1.5rem 1.5rem;
    }
    :hover {
      background-image: url(/assets/img/blue-brush-drk.png);
    }
    `;
  } else if (props.secondary) {
    return `
    background-image: url(/assets/img/orange-brush1.png);
    color: #fff;
    font-size: 1.125rem;
    padding: 0.875rem 1.125rem;
    width: 80%;

    @media screen and (min-width: ${screenBreaks.medium}) {
      font-size: 1.25rem;
      width: 70%;
      padding: 1rem 1.25rem 1.25rem;
    }
    :hover {
      background-image: url(/assets/img/orange-brush2.png);
    }
    `;
  } else if (props.cancel) {
    return `
    margin-top: 1.5rem;
    padding: .25rem;
    color: ${colors.errorRed};
    font-size: 1rem;
    font-weight: 300;

    @media screen and (min-width: ${screenBreaks.medium}) {
      margin-top: 0;
    }
    `;
  }
  return null;
};

export const Button = styled.button`
  background-size: 100% 100%;
  font-weight: 300;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0;
  background-color: transparent;
  margin: 0 auto;
  display: block;
  outline: none;
  ${props => buttonType(props)}
  background-image: ${props => (props.disabled ? 'url(/assets/img/grey-brush.png)' : null)};

  :disabled {
    background-image: url(/assets/img/grey-brush.png);
    opacity: .5;
    cursor: not-allowed;
  }
`;

export default Button;
