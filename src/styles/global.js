import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: 'Outfit', sans-serif;
}

button {
    cursor: pointer;
    border: none;
    outline: none;

    &:hover{
        opacity: 0.8;
    }
    &:active{
        opacity: 0.5;
    }
}

body{
    -webkit-font-smoothing: antialiased !important;
    background: #00182A;
}`