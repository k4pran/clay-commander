import React, {useState} from 'react';
import TexEditor from "../tex-editor/component";
import TexViewer from "../tex-viewer/component";
import {StyledTexHub} from "./style";
import GlobalStyle from "../../global-style";

const TexHub = () => {

    const [tex, setTex] = useState();

    const handleTexChange = (newTex) => {
        setTex(() => newTex);
    };

    return (
        <StyledTexHub>
            <GlobalStyle terminal={false}/>
            <TexEditor onChangeHandler={handleTexChange}/>
            <TexViewer tex={tex}/>
        </StyledTexHub>
    );
};

export default TexHub;