import React, {useEffect, useState} from 'react';
import {ThemeProvider} from "styled-components";
import {StyledInput, StyledTerminalLine, StyledTexMirror} from "./style";

const lineTheme = {
    normal: {color: "white"},
    error: {color: "#E96245"},
    success: {color: "#4E7242"},
    info: {color: "#5F8DC1"}
};

const TerminalLine = ({className, initReadOnly, focus, handleLineChange, value, lineStyle, mathMode}) => {

    return (
        <div>
           <StyledTerminalLine className={className}> {lineStyle === "normal" ? '>' : ''}
                <ThemeProvider theme={lineTheme}>
                    <StyledInput className={className}
                                 type="text"
                                 value={value}
                                 autoFocus={focus}
                                 autoComplete="off"
                                 readOnly={initReadOnly}
                                 onChange={e => handleLineChange(e)}
                                 lineStyle={lineStyle}
                    />
                </ThemeProvider>
            </StyledTerminalLine>
            <StyledTexMirror style={{display: mathMode ? 'block' : 'none'}}>{value}</StyledTexMirror>
        </div>
    )
};

export default TerminalLine;