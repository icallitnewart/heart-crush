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
  }

  * {
    box-sizing: border-box;
  }
  
`;

export default GlobalStyles;
