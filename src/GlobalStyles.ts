import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}

  :root {
    --main-color-purple: #ADA2FF;
    --main-color-yellow: #FBF0B2; //#ffe8ec;
    --sub-color-blue: #CAEDFF; //#bad0ef;
    --sub-color-purple: #D8B4F8; 
    --sub-color-lightpink: #ffe8ec; 
    --sub-color-pink: pink;//#b69cdc;

    --main-font: Agbalumo;
    --sub-font: Calistoga;

    --heart-color-pink: #ed7fd0;
    --heart-color-orange: #ffab3f;
    --heart-color-green: #50cb86;
    --heart-color-blue: #7fd7f3;
    --heart-color-white: #f5fffa;
    --heart-color-purple: #ADA2FF;
  }

  * {
    box-sizing: border-box;
  }
  
`;

export default GlobalStyles;
