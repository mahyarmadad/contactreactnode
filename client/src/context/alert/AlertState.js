import React, { useReducer } from 'react'
import AlertReducer from './AlertReducer';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_ERROR, SET_ALERT, REMOVE_ALERT } from '../types';
import AlertContext from './AlertContext';
import { v4 as uuidv4 } from 'uuid';

const AlertState = props => {
    const initialState = [];

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    //Set Alert
    const setAlert = (msg, type, timeout = 5000) => {
        let id = uuidv4();
        dispatch({ type: SET_ALERT, payload: { msg, type, id } });
        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout)
    }

    // Register

    // Login User

    // Logout

    // Clear Error


    return (
        <AlertContext.Provider value={{
            alerts: state,
            setAlert
        }}>
            {props.children}
        </AlertContext.Provider>
    )
};

export default AlertState