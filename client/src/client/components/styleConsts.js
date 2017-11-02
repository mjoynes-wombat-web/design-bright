import { injectGlobal } from 'styled-components';

export const colors = {
  lightGraphite: '#808080',
  mauiOrange: '#ffaa00',
  graphite: '#404040',
  errorRed: '#ff5800',
  blueHydrangea: '#4097ff',
};

export const screenBreaks = {
  medium: '40em',
  large: '64em',
  xlarge: '90em',
  xxlarge: '120em',
};

export const globalStyle = () => injectGlobal`
@import url('https://fonts.googleapis.com/css?family=Lato:300,400');
@import url('/assets/css/normalize.css');

body {
  font-family: 'Lato', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 1rem;
}
`;
