import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from 'axios'
import TerminalLine from "../terminal-line/component";
import {StyledTerminal} from "./style";
import GlobalStyle from "../../global-style";
import Logger from "../../logger";

const Terminal = ({child}) => {

    const LOG = new Logger("Terminal");

    const ENTER_KEY = 13;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const [lines, setLines] = useState([]);
    const [history, setHistory] = useState([]);
    const [historyPtr, setHistoryPtr] = useState(0);
    const [currentLine, setCurrentLine] = useState("");
    const [content, setContent] = useState({})

    let routeHistory = useHistory();

    const _handleKeyDown = (e) => {

        switch (e.which) {

            case ENTER_KEY:
                processCommand();
                break;

            case DOWN_KEY:
                if (historyPtr < history.length) {
                    setHistoryPtr(() => historyPtr + 1)
                }
                break;

            case UP_KEY:
                if (historyPtr > 0) {
                    setHistoryPtr(() => historyPtr - 1)
                }
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', _handleKeyDown);
        return () => {
            window.removeEventListener('keydown', _handleKeyDown);
        };
    });

    useEffect(() => {
        if (historyPtr > history.length - 1) {
            setCurrentLine("");
        }
        if (history[historyPtr] !== undefined) {
            setCurrentLine(history[historyPtr]);
        }
    }, [historyPtr, history]);

    useEffect(() => {
        LOG.debug("history updated : currently " + history.length + " items");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history]);

    const handleLineChange = (e) => {
        setCurrentLine(e.target.value);
    };

    function handleHome() {
        routeHistory.push({
            pathname: '/'
        })
    }

    function handleTex() {
        routeHistory.push({
            pathname: '/tex'
        })
    }

    function executeRequest(args) {
        LOG.info("received request: " + args);
        axios.get('/request', {
            params: {
                request: args
            }
        })
            .then(res => {
                handleRequestSuccess(res.data, res.headers['content-type'].split(";")[0], res.data['key']);
            })
            .catch(err => {
                handleRequestError(err)
            });
    }

    function handleRequestSuccess(data, contentType, contentKey) {
        LOG.info("request success for content " + contentType + " : " + contentKey);
        setLines(lines => [...lines, {
            key: lines.length, text: "request executed successfully", lineStyle: "info"
        }]);
        if (contentType === "application/json") {
            routeHistory.push({
                pathname: '/json',
                state: {
                    content: data.content,
                }
            })
        } else if (contentType === "text/csv") {
            handleDisplayTable(data)
        } else if (contentType === "text/uri-list") {
            handleNavigation(data)
        } else if (contentType === "text/plain") {
            setLines(lines => [...lines, {
                key: lines.length, text: data.content, lineStyle: "info"
            }]);
        }
    }

    function handleRequestError(err) {
        if (err.response === undefined) {
            LOG.error("Unhandled exception when handling request, history will not be updated: " + err);
            return;
        }
        let errMessage = err.response.data === undefined ?
            "No response from server" : err.response.data.reason;
        LOG.error(errMessage);
        setLines(lines => [...lines, {
            key: lines.length, text: errMessage, lineStyle: "error"
        }]);
        updateHistory();
    }

    function handleDisplayTable(data) {
        LOG.debug("executing request : displaying table");
        routeHistory.push({
            pathname: '/table',
            state: {
                content: data.content
            }
        })
    }

    function handleNavigation(data) {
        LOG.debug("executing request : navigation");
        let origin = data['origin'];
        let location = data['location'];
        if (origin === "external") {
            LOG.warn("External navigation not implemented")
            // todo
        } else if (origin === "internal") {
            LOG.info("navigating to " + data['location'])
            if (location[0] !== ["/"]) {
                location = "/" + location;
            }
            routeHistory.push({
                pathname: location,
                state: data.content
            })
        } else {
            LOG.error("Unknown navigation type: " + origin)
        }
    }

    function processCommand() {
        LOG.info("parsing command : " + currentLine);
        let cmdParts = currentLine.split("--");
        let args = cmdParts.slice(1).join();

        setLines(lines => [...lines, {
            key: lines.length, text: currentLine, lineStyle: "normal"
        }]);
        setCurrentLine("");
        if (currentLine === "go home") {
            handleHome();
            return;
        } else if (currentLine === "go tex") {
            handleTex();
            return;
        } else if (currentLine === "display table") {
            handleDisplayTable(args);
            return;
        } else if (currentLine === "clear history") {
            let nbItems = lines.length;
            setHistory(() => []);
            setHistoryPtr(() => 0);
            setLines(lines => [...lines, {
                key: lines.length, text: "history cleared", lineStyle: "success"
            }]);
            LOG.debug("history cleared : " + nbItems + " items removed");
            return
        } else if (currentLine === "clear") {
            setLines(() => [])
        } else {
            executeRequest(currentLine);
        }
        if (currentLine.length > 0) {
            setHistory(oldHistory => [...oldHistory, currentLine]);
            setHistoryPtr(historyPtr => historyPtr + 1);
            updateHistory();
        }
    }

    function updateHistory() {
        setHistory(oldHistory => [...oldHistory, currentLine]);
        setHistoryPtr(historyPtr => historyPtr + 1);
    }

    return (
       <div>
            {child === undefined ? <div style={{display: 'none'}}/> : child({content})}
            <StyledTerminal>
                <GlobalStyle terminal={true}/>
                {lines.map(line => (
                    <TerminalLine
                        key={line.key}
                        initReadOnly={true}
                        focus={false}
                        handleLineChange={handleLineChange}
                        value={line.text}
                        lineStyle={line.lineStyle}
                    />
                ))}
                <TerminalLine
                    key={"current line"}
                    initReadOnly={false}
                    focus={true}
                    handleLineChange={handleLineChange}
                    value={currentLine}
                    lineStyle={"normal"}
                />
            </StyledTerminal>
        </div>
    )
};

export default Terminal;