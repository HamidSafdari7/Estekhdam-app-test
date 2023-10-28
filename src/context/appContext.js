import React, { useReducer, useContext } from 'react';

import reducer from './reducer';

import {

    ALLOW_USER_LOGIN,
    LOGOUT_USER,
    TOGGLE_SIDEBAR,

} from './actions';

const initialState = {
    isAuthenticated: false,
    user: null,
    showSidebar: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const userLogin = (username, password) => {

        dispatch({ type: ALLOW_USER_LOGIN, payload: { username, password } });
    };

    const userLogout = () => {
        dispatch({ type: LOGOUT_USER });
    };

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR });
    };

    return (
        <AppContext.Provider
            value={{
                ...state,
                userLogin,
                userLogout,
                toggleSidebar,
            }}
        >
            {children}
        </AppContext.Provider>
    );

};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };