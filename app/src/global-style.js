import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
    html, body {
        height: 100%;
        background-color: ${props => (props.terminal ? 'black' : 'white')};
        color: ${props => (props.terminal ? 'white' : 'black')};
        padding: 0;
        margin: 0;
    }
    #root, #root>div {
        height: 100%;
    }
`;

export default GlobalStyle;