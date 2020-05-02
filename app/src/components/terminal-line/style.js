import styled, { css } from "styled-components";

const TerminalShared = css`
    font-size: 20px;
    color: white;
    background-color: black;
    padding: 4px 10px;
    margin: 0;
`;

export const StyledTerminalLine = styled.div`
    ${TerminalShared}
`;

export const StyledInput = styled.input`
    ${props => console.log(props.isError)}
    ${TerminalShared}
    color: ${props => props.isError ? "red" : "white"};
    width: 95%;
    word-break: break-word;
    border: 0;
    outline: none;
`;