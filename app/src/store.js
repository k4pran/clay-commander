import React, {createContext, useEffect, useReducer} from "react";
import Reducer from './reducer'
import axios from "axios";


const initialState = {
    currentPage: 'terminal',
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    useEffect(() => {
        console.log(state);

        axios.get('/state/update', {
            params: {
                state: state
            }
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log("Server failed to update current state: " + state + " -- " + err);
            });
    }, [state]);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;