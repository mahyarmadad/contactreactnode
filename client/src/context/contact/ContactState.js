import React, { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid';
import contactContext from './contactContext';
import contactReducer from './contactReducer';
import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACT, CLEAR_FILTER, } from '../types';

const ContactSteta = props => {
    const inisialState = {
        contact: [
            {
                id: 1,
                name: "mahyar",
                email: "mahyar@yahoo.com",
                phone: "111111111",
                type: "personal"
            },
            {
                id: 2,
                name: "erfan",
                email: "erfan@yahoo.com",
                phone: "222222222",
                type: "personal"
            }
        ],
        current: null,
        filterd: null,
    };

    const [state, dispatch] = useReducer(contactReducer, inisialState);

    //Add Contact 
    const addContact = contact => {
        contact.id = uuidv4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    }
    //Deleet Contact 
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    }
    //set current contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    }
    //clear current conatct
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }
    //update contact
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact });
    }
    //filter contact
    const filterContact = text => {
        dispatch({ type: FILTER_CONTACT, payload: text });
    }
    //clear filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    }
    return (
        <contactContext.Provider value={{
            contacts: state.contact,
            current: state.current,
            filterd: state.filterd,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContact,
            clearFilter
        }}>
            {props.children}
        </contactContext.Provider>
    )
};

export default ContactSteta