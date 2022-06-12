import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    html {
        box-sizing: border-box;
        font-family: 'Open Sans', sans-serif;
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }

    body {
        padding: 0;
        margin: 0;
    }
`

export default GlobalStyles;