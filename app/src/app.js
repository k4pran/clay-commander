import React, {useEffect, useState} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import DataTable from "./components/data-table/component";
import Terminal from "./components/terminal/component";

const App = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Terminal} />
            <Route exact path="/table">
                <DataTable/>
                <Terminal/>
            </Route>
        </BrowserRouter>
    )
};

export default App;