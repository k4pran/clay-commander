import React from 'react';
import {ThemeProvider} from "styled-components";
import {StyledInput, StyledTerminalLine} from "./style";

const lineTheme = {
    normal: { color: "white" },
    error: { color: "#E96245" },
    success: { color: "#4E7242" },
    info: { color: "#5F8DC1" }
};

const TerminalLine = ({className, initReadOnly, focus, handleLineChange, value, lineStyle}) => {

    return (
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
    )
};

export default TerminalLine;