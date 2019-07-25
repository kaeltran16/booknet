import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    width: 100%;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }
  img {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }
  button {
    outline: 0;
    border: 0;
  }
  p {
    margin-top: 0;
  }
`;

export default GlobalStyle;
