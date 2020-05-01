import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {createGlobalStyle} from "styled-components";
import App from "./app";

const GlobalStyle = createGlobalStyle`
    html, body {
        height: 100%;
        background-color: black;
        padding: 0;
        margin: 0;
    }
`;

ReactDOM.render(
    <div>
        <GlobalStyle/>
        <App />
    </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
