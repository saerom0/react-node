import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
  margin:0; padding:0; box-sizing: border-box; font-family: 'Roboto';
}
ul,ol,li {
    list-style: none;
  }
a{
  text-decoration: none; color: #777;
}
body{
  background-color: #efefef;
}
`;

export default GlobalStyle;
