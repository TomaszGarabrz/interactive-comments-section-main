import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap');


  *, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: ${colors.veryLightGray};
  font-family: 'Rubik', sans-serif;
}
`;
