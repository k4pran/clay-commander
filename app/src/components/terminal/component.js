import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from 'axios'
import TerminalLine from "../terminal-line/component";
import {StyledTerminal} from "./style";
import GlobalStyle from "../../global-style";
import cmdParser from './cmdParser'


const commands = [
    "go home",
    "display table",
    "display images",
    "fetch",
    "list tables",
    "list images",
    "clear",
    "clear history",
];

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

    function handleHome() {
        routeHistory.push({
            pathname: '/'
        })
    }

    function handleFetch() {
        let queryParts = currentLine.split("fetch");
        if (queryParts.length > 1) {
            axios.get('/fetch', {
            params: {
                request: queryParts[1].trim()
            }
        })
            .then(res => {
                let data = res.data;
                setLines(lines => [...lines, {
                    key: lines.length, text: "imported " + data.name, lineStyle: "info"
                }]);
            })
            .catch(err => {
                console.log(err.response.data);
                setLines(lines => [...lines, {
                    key: lines.length, text: err.response.data, lineStyle: "error"
                }]);
                setCurrentLine("");
            });
        }
    }

    function handleDisplayTable() {
        let queryParts = currentLine.split("display table");
        if (queryParts.length > 1) {
            axios.get('/display/table', {
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
                    key: lines.length, text: err, lineStyle: "error"
                }]);
                setCurrentLine("");
            });
        }
    }

    function handleDisplayImages() {
        let queryParts = currentLine.split("display images");
        if (queryParts.length > 1) {
            axios.get('/display/images', {
            params: {
                request: queryParts[1].trim()
            }
        })
            .then(res => {
                let data = res.data;
                // console.log(data);
                routeHistory.push({
                    pathname: '/gallery',
                    state: {
                        imageData:data
                    }
                })
            })
            .catch(err => {
                setLines(lines => [...lines, {
                    key: lines.length, text: err, lineStyle: "error"
                }]);
                setCurrentLine("");
            });
        }
    }

    function handleListImages() {
        axios.get('/list/images')
        .then(res => {
            let imageNames = res.data;
            imageNames.forEach(imageName => {
                setLines(lines => [...lines, {
                    key: lines.length, text: imageName, lineStyle: "info"
                }]);
            });
        })
        .catch(err => {
            setLines(lines => [...lines, {
                key: lines.length, text: err, lineStyle: "error"
            }]);
            setCurrentLine("");
        });
    }

    function handleListTables() {
        axios.get('/list/tables')
        .then(res => {
            let tableNames = res.data;
            tableNames.forEach(tableName => {
                setLines(lines => [...lines, {
                    key: lines.length, text: tableName, lineStyle: "info"
                }]);
            });
        })
        .catch(err => {
            setLines(lines => [...lines, {
                key: lines.length, text: err, lineStyle: "error"
            }]);
            setCurrentLine("");
        });
    }

    function processCommand() {
        let cmd = cmdParser.determineCommand(commands, currentLine);

        if (cmd === "home") {
            handleHome();
            return;
        }
        else if (cmd === "display table") {
            handleDisplayTable();
            return;
        }
        else if (cmd === "display images") {
            handleDisplayImages();
            return;
        }
        else if (cmd === "fetch") {
            handleFetch();
        }
        else if (cmd === "list tables") {
            handleListTables();
        }
        else if (cmd === "list images") {
            handleListImages();
        }

        else if (cmd === "clear history") {
            setHistory(() => []);
            setHistoryPtr(() => 0);
            setLines(lines => [...lines, {
                key: lines.length, text: "history cleared", lineStyle: "success"
            }]);
            setCurrentLine("");
            return
        }

        if (cmd === "clear") {
            setLines(() => [])
        }
        else {
            setLines(lines => [...lines, {
                key: lines.length, text: currentLine, lineStyle: "normal"
            }]);
            if (Array.isArray(cmd) && cmd.length > 0) {
                setLines(lines => [...lines, {
                    key: lines.length, text: "Command not found. Similar commands: ", lineStyle: "info"
                }]);
            }
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