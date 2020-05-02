import React from 'react';
import {StyledInput, StyledTerminalLine} from "./style";

const TerminalLine = ({className, initReadOnly, focus, handleLineChange, value, isError}) => {

    return (
        <StyledTerminalLine className={className}> {isError ? '' : '>'}
            <StyledInput className={className}
                         type="text"
                         value={value}
                         autoFocus={focus}
                         autoComplete="off"
                         readOnly={initReadOnly}
                         onChange={e => handleLineChange(e)}
                         isError={isError}
            />
        </StyledTerminalLine>
    )
};

export default TerminalLine;