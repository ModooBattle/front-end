import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import '../fonts/index.css';

const GlobalStyles = createGlobalStyle`
    :root {
        --primary-color: #FF9501;
        --primary-dark: #F57902;

        --text-main-color: #151517;

        --fs-1: .75rem; // 12px
        --fs-2: .85rem; // 14px
        --fs-3: 1rem; // 16px
        --fs-4: 1.25rem; // 20px
        --fs-5: 1.5rem; // 24px
        --fs-6: 1.75rem; // 28px
        --fs-7: 2rem; // 32px
        --fs-8: 2.25rem; // 36px
    }
    ${reset}
    
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 1rem;
        vertical-align: baseline;
    }
    body{
        line-height: 1;
        font-family: 'Pretendard', sans-serif;
        background-color: #F6F9F0;
        margin-bottom: 100px;
    }
    ol, ul{
        list-style: none;
    }
    button {
        border: 0;
        background: transparent;
        cursor: pointer;
    }
`;

export default GlobalStyles;
