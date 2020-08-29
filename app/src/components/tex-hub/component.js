import React, {useContext, useEffect, useState} from 'react';
import TexEditor from "../tex-editor/component";
import TexViewer from "../tex-viewer/component";
import {StyledTexHub} from "./style";
import GlobalStyle from "../../global-style";
import {Context} from "../../store";

const TexHub = () => {

    const [, dispatch] = useContext(Context);

    const [tex, setTex] = useState();

    const handleTexChange = (newTex) => {
        setTex(() => newTex);
    };

    useEffect(() => {
        dispatch({type: 'SET_CURRENT_PAGE', currentPage: 'tex'});
    }, [dispatch]);

    return (
        <StyledTexHub>
            <GlobalStyle terminal={false}/>
            <TexEditor onChangeHandler={handleTexChange}/>
            <TexViewer tex={tex}/>
        </StyledTexHub>
    );
};

export default TexHub;