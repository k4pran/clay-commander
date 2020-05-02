import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from 'axios'
import TerminalLine from "../terminal-line/component";
import {StyledTerminal} from "./style";

const Terminal = () => {

    const ENTER_KEY = 13;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

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
        if (historyPtr > history.length - 1) {
            setCurrentLine("");
        }
        if (history[historyPtr] !== undefined) {
            setCurrentLine(history[historyPtr]);
        }
    }, [historyPtr]);

    const handleLineChange = (e) => {
        setCurrentLine(e.target.value);
    };

    function handleDisplay() {
        let queryParts = currentLine.split("display");
        if (queryParts.length > 1) {
            axios.get('/fetch', {
            params: {
                request: queryParts[1].trim()
            }
        })
            .then(res => {
                let data = res.data;
                routeHistory.push({
                    pathname: '/table',
                    state: {
                        title: data.title,
                        columns: data.columns,
                        data: data.data
                    }
                })
            })
            .catch(err => {
                setLines(lines => [...lines, {
                    key: lines.length, text: err, error: true
                }]);
                setCurrentLine("");
            });
        }
    }

    function handleDisplayTable() {
        let queryParts = currentLine.split("display table");
        if (queryParts.length > 1) {
            axios.get('/fetch/table', {
            params: {
                request: queryParts[1].trim()
            }
        })
            .then(res => {
                let data = res.data;
                routeHistory.push({
                    pathname: '/table',
                    state: {
                        title: data.title,
                        columns: data.columns,
                        data: data.data
                    }
                })
            })
            .catch(err => {
                setLines(lines => [...lines, {
                    key: lines.length, text: err, error: true
                }]);
                setCurrentLine("");
            });
        }
    }

    function processCommand() {
        if (currentLine.includes("display table")) {
            handleDisplayTable();
            return;
        }
        if (currentLine.includes("display")) {
            handleDisplay();
            return;
        }
        if (currentLine === "clear") {
            setLines(() => [])
        } else {
            setLines(lines => [...lines, {
                key: lines.length, text: currentLine, error: false
            }]);
        }
        if (currentLine.length > 0) {
            setHistory(oldHistory => [...oldHistory, currentLine]);
            setHistoryPtr(historyPtr => historyPtr + 1);
            setCurrentLine("");
        }

        setCurrentLine("");
    }

    return (
        <StyledTerminal>
            {lines.map(line => (
                <TerminalLine
                    key={line.key}
                    initReadOnly={true}
                    focus={false}
                    handleLineChange={handleLineChange}
                    value={line.text}
                    isError={line.error}
                />
            ))}
            <TerminalLine
                key={"current line"}
                initReadOnly={false}
                focus={true}
                handleLineChange={handleLineChange}
                value={currentLine}
                isError={false}
            />
        </StyledTerminal>
    )
};

export default Terminal;