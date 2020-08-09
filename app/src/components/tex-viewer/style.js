import styled from "styled-components";

export const StyledTexViewer = styled.div`
    min-height: 50vh;
    max-height: 50vh;
    background-color: white;
    color: black;
    margin: 0;
    overflow: scroll;
    font-size: ${props => props.fontSize + "px"};
`;

export const StyledTexViewerArea = styled.pre`
    line-height: 1.5em;
    padding: 5px 10px;
`;