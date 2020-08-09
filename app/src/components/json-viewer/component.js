import React, {useContext, useEffect, useState} from 'react';
import ReactJson from 'react-json-view'
import {useLocation} from "react-router-dom";
import {StyledJsonViewer} from "./style";
import {Context} from "../../store";


const JsonViewer = () => {

    const location = useLocation();
    const [state, dispatch] = useContext(Context);

    const [json, setJson] = useState(JSON.parse(location.state.json));

    useEffect(() => {
        dispatch({type: 'SET_CURRENT_PAGE', currentPage: 'json-viewer'});
    }, []);

    return (
        <StyledJsonViewer>
            <ReactJson src={json}/>
        </StyledJsonViewer>
    )
};

export default JsonViewer;