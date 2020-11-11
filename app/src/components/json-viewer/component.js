import React, {useState} from 'react';
import ReactJson from 'react-json-view'
import {useLocation} from "react-router-dom";
import {StyledJsonViewer} from "./style";

const safeJsonFromLocation = (location) => {
    if (location.state === undefined || location.state.content === undefined) {
        return JSON.parse("{}");
    }
    let json = location.state.content;
    return typeof json === "string" || json instanceof String ?
        JSON.parse(json) : json;
}

const safeJsonFromProp = (content) => {
    if (content === undefined) {
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

    const [json, setJson] = useState(
                    content === undefined ? safeJsonFromLocation(location) :
                        safeJsonFromProp(content));

    return (
        <StyledJsonViewer>
            <ReactJson src={json}/>
        </StyledJsonViewer>
    )
};

export default JsonViewer;