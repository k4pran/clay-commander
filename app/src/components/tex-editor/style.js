import styled from "styled-components";

export const StyledTexEditor = styled.div`
    min-height: 50vh;
    max-height: 50vh;
    background-color: white;
    color: black;
    margin: 0;
    overflow: scroll;
`;

export const StyledTextField = styled.textarea`
    width: 100%;
    height: 100%;
    font-size: ${props => props.fontSize + "px"};
    resize: none;
    border: none;
    outline: none;
    padding: 5px 10px;
    // &:focus {
    //     outline: none;
    //     box-shadow: 0px 0px 2px green;
    // }
`;