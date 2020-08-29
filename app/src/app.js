import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import DataTable from "./components/data-table/component";
import Terminal from "./components/terminal/component";
import TexHub from "./components/tex-hub/component";
import ImageViewer from "./components/image-gallery/component";
import JsonViewer from "./components/json-viewer/component";

const App = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Terminal}/>
            <Route exact path="/home" component={Terminal}/>
            <Route exact path="/table">
                <DataTable/>
            </Route>
            <Route exact path="/tex">
                <TexHub/>
            </Route>
            <Route exact path="/gallery">
                <ImageViewer/>
                <Terminal/>
            </Route>
            <Route exact path="/json">
                <JsonViewer/>
                <Terminal/>
            </Route>
        </BrowserRouter>
    )
};

export default App;