import React, {createContext, useEffect, useReducer} from "react";
import Reducer from './reducer'
import axios from "axios";
import Logger from "./logger";

const initialState = {
    currentPage: 'terminal',
    currentContentKey: null,
    fetchedContent: []
};

const Store = ({children}) => {

    const LOG = new Logger("Store");
    const [state, dispatch] = useReducer(Reducer, initialState);

    useEffect(() => {
        axios.get('/state/update', {
            params: {
                state: state
            }
        })
            .then(res => {
                LOG.debug("state updated")
                console.log(res);
            })
            .catch(err => {
                LOG.error("Server failed to update current state: " + state + " -- " + err)
            });
    }, [state, LOG]);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;