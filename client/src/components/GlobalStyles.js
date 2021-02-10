import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html,
  body,
  div,
  span {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    /* font-family: 'Do Hyeon', sans-serif; */
    /* font-family: 'Fredoka One', cursive; */
    /* font-family: 'Goldman', cursive; */
    /* font-family: 'Montserrat Alternates', sans-serif; */
    /* font-family: 'MuseoModerno', cursive; */
    /* font-family: 'Orbitron', sans-serif; */
    /* font-family: 'Play', sans-serif; */
    /* font-family: 'Racing Sans One', cursive; */
    /* font-family: 'Varela Round', sans-serif; */
  }
  
  /* GLOBAL STYLES */
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-family: Montserrat, sans-serif;
  }
`;

export default GlobalStyles;
