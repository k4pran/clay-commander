import React, {useContext, useEffect, useState} from 'react';
import ReactJson from 'react-json-view'
import {useLocation} from "react-router-dom";
import {StyledJsonViewer} from "./style";
import {Context} from "../../store";

const safeJsonFromLocation = (location) => {
    if (location.state === undefined || location.state.json === undefined) {
        return JSON.parse("{}");
    }
    let json = location.state.json;
    return typeof json === "string" || json instanceof String ?
        JSON.parse(json) : json;
}

const safeJsonFromProp = (content) => {
    if (content === undefined || content === undefined) {
        return JSON.parse("{}");
    }
    return jsonify(content);
}


const jsonify = (json) => {
    return typeof json === "string" || json instanceof String ?
        JSON.parse(json) : json;
}

const JsonViewer = ({content}) => {

    const location = useLocation();
    const [, dispatch] = useContext(Context);

    const [json, setJson] = useState(
        location.state ? safeJsonFromLocation(location) : safeJsonFromProp(content));

    useEffect(() => {
        dispatch({type: 'SET_CURRENT_PAGE', currentPage: 'json-viewer'});
    }, [dispatch]);

    useEffect(() => {
        setJson(() => safeJsonFromProp(content))
    }, [content]);

    return (
        <StyledJsonViewer>
            <ReactJson src={json}/>
        </StyledJsonViewer>
    )
};

export default JsonViewer;