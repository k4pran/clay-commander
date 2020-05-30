import React, {useEffect, useState} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import DataTable from "./components/data-table/component";
import Terminal from "./components/terminal/component";
import TexHub from "./components/tex-hub/component";
import ImageViewer from "./components/image-gallery/component";

const App = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Terminal} />
            <Route exact path="/table">
                <DataTable/>
                <Terminal/>
            </Route>
            <Route exact path="/math">
                <TexHub/>
            </Route>
            <Route exact path="/gallery">
                <ImageViewer/>
            </Route>
        </BrowserRouter>
    )
};

export default App;