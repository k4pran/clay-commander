import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from 'axios'
import TerminalLine from "../terminal-line/component";
import {StyledTerminal} from "./style";
import GlobalStyle from "../../global-style";
import {Context} from "../../store";
import Logger from "../../logger";

const Terminal = () => {

    const LOG = new Logger("Terminal");

    const ENTER_KEY = 13;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const [, dispatch] = useContext(Context);

    const [lines, setLines] = useState([]);
    const [history, setHistory] = useState([]);
    const [historyPtr, setHistoryPtr] = useState(0);
    const [currentLine, setCurrentLine] = useState("");

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
        dispatch({type: 'SET_CURRENT_PAGE', payload: 'terminal'});
    }, [dispatch]);

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
    }, [history, LOG]);

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
                handleRequestSuccess(res.data.content, res.headers['content-type'].split(";")[0], res.data['content-key']);
            })
            .catch(err => {
                handleRequestError(err)
            });
    }

    function handleRequestSuccess(content, contentType, contentKey) {
        LOG.info("request success for content " + contentType + " : " + contentKey);
        updateFetchState(contentKey);
        setLines(lines => [...lines, {
            key: lines.length, text: "request executed successfully", lineStyle: "info"
        }]);
        if (contentType === "application/json") {
            routeHistory.push({
                pathname: '/json',
                state: {
                    json: content,
                }
            })
        } else if (contentType === "text/csv") {
            handleDisplayTable(content)
        } else if (contentType === "text/uri-list") {
            handleNavigation(content)
        } else if (contentType === "text/plain") {
            setLines(lines => [...lines, {
                key: lines.length, text: content, lineStyle: "info"
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

    function handleDisplayTable(content) {
        LOG.debug("executing request : displaying table");
        routeHistory.push({
            pathname: '/table',
            state: {
                title: content.title,
                columns: content.columns,
                data: content.data
            }
        })
    }

    function handleDisplayImages(args) {
        LOG.debug("executing request : displaying images");
        axios.get('/display/images', {
            params: {
                request: args
            }
        })
            .then(res => {
                let content = res.data.content;
                routeHistory.push({
                    pathname: '/gallery',
                    state: content
                })
            })
            .catch(err => {
                setLines(lines => [...lines, {
                    key: lines.length, text: err, lineStyle: "error"
                }]);
                setCurrentLine("");
            });
    }

    function handleNavigation(content) {
        LOG.debug("executing request : navigation");
        let type = content['type'];
        let location = content['location'];
        if (type === "external") {
            LOG.warn("External navigation not implemented")
            // todo
        } else if (type === "internal") {
            LOG.info("navigating to " + content['location'])
            if (location[0] !== ["/"]) {
                location = "/" + location;
            }
            routeHistory.push({
                pathname: location,
                state: content
            })
        } else {
            LOG.error("Unknown navigation type: " + type)
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
        } else if (currentLine === "display images") {
            handleDisplayImages(args);
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
            return;
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

    function updateFetchState(contentKey) {
        dispatch({type: 'SET_CURRENT_CONTENT_KEY', payload: contentKey});
        dispatch({type: 'ADD_FETCHED_CONTENT', payload: contentKey});
        LOG.debug("fetched state updated");
    }

    return (
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
    )
};

export default Terminal;