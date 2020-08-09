import React, {useEffect, useState} from 'react';
import {StyledTexEditor, StyledTextField} from "./style";
import TexEditorMenu from "../tex-editor-menu/component";

const defaultFontSize = 18;

const TexEditor = ({className, onChangeHandler}) => {

    const [tex, setTex] = useState("");
    const [fontSize, setFontSize] = useState(defaultFontSize);

    useEffect(() => {
        onChangeHandler(tex);
    }, [tex]);

    const handleClearTexEvent = () => {
        setTex(() => "");
    };

    const handleFontSizeChange = (newFontSize) => {
        setFontSize(newFontSize);
    };

    const handleCopyToClipboard = () => {
        navigator.permissions.query({name: "clipboard-write"}).then(result => {
            if (result.state === "granted" || result.state === "prompt") {
                writeToClipboard()
            }
            else {
                console.log("Permission denied to write to clipboard")
            }
        });
    };

    const writeToClipboard = () => {
        navigator.clipboard.writeText(tex).then(function () {
            console.log("copied to clipboard successfully")
        }, function () {
            console.log("Error writing to clipboard")
        });
    };

    return (
        <StyledTexEditor className={className}>
            <TexEditorMenu defaultFontSize={defaultFontSize}
                           clearTexHandler={handleClearTexEvent}
                           fontSizeChangeHandler={handleFontSizeChange}
                           copyToClipboardHandler={handleCopyToClipboard}/>
            <StyledTextField value={tex}
                             className={className}
                             fontSize={fontSize}
                             onChange={e => setTex(e.target.value)}
            />
        </StyledTexEditor>
    );
};

export default TexEditor;