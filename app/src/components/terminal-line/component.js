import React from 'react';
import {StyledInput, StyledTerminalLine} from "./style";

const TerminalLine = ({className, initReadOnly, focus, handleLineChange, value}) => {

    return (
        <StyledTerminalLine className={className}> >
            <StyledInput className={className}
                         type="text"
                         value={value}
                         autoFocus={focus}
                         autoComplete="off"
                         readOnly={initReadOnly}
                         onChange={e => handleLineChange(e)}
            />
        </StyledTerminalLine>
    )
};

export default TerminalLine;