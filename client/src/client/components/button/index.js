import styled from 'styled-components';

import { colors, screenBreaks, globalStyle } from '../styleConsts';

globalStyle();

const buttonType = (props) => {
  if (props.primary) {
    return `
    background-image: url(/assets/img/blue-brush-btn.png);
    text-shadow: ${colors.blueHydrangea} 0 0 0.25rem;
    color: #fff;
    font-size: 1.25rem;
    padding: 1rem 1.25rem;
    width: 90%;

    @media screen and (min-width: ${screenBreaks.medium}) {
      font-size: 1.5rem;
      width: 80%;
      max-width: 50rem;
      padding: 1.25rem 1.5rem 1.5rem;
    }
    :hover {
      background-position-y: 100%;
    }
    `;
  } else if (props.secondary) {
    return `
    background-image: url(/assets/img/orange-brush-btn.png);
    text-shadow: ${colors.mauiOrange} 0 0 0.25rem;
    color: #fff;
    font-size: 1.125rem;
    padding: 0.875rem 1.125rem;
    width: 80%;

    @media screen and (min-width: ${screenBreaks.medium}) {
      font-size: 1.25rem;
      width: 70%;
      max-width: 45rem;
      padding: 1rem 1.25rem 1.25rem;
    }
    :hover {
      background-position-y: 100%;
    }
    `;
  } else if (props.cancel) {
    return `
    margin-top: 1.25rem;
    padding: .5rem;
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
  background-size: 100% 200%;
  font-weight: 400;
  cursor: pointer;
  appearance: none;
  border: 0;
  background-color: transparent;
  margin: 0 auto;
  display: block;
  outline: none;
  ${props => buttonType(props)}

  :disabled {
    background-image: url(/assets/img/grey-brush-btn.png);
    text-shadow: ${colors.graphite} 0 0 0.25rem;
    opacity: .5;
    cursor: not-allowed;
    background-size: 100% 100%;
    text-shadow: 
  }
`;

export default Button;
