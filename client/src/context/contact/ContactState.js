import React, { useReducer } from 'react'
import contactContext from './contactContext';
import contactReducer from './contactReducer';
import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACT, CLEAR_FILTER, CONTACT_ERROR, GET_CONTACTS, CLEAR_CONTACTS } from '../types';
import axios from "axios";

const ContactSteta = props => {
    const inisialState = {
        contact: null,
        current: null,
        filterd: null,
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, inisialState);
    // GET contact
    const getContacts = async () => {
        try {
            const res = await axios.get("/api/contacts");
            dispatch({ type: GET_CONTACTS, payload: res.data })
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.msg })
        }
    }

    //Add Contact 
    const addContact = async contact => {
        const config = {
            headers: { "Content-Type": "application/json" }
        }
        try {
            const res = await axios.post("/api/contacts", contact, config);
            dispatch({ type: ADD_CONTACT, payload: res.data });
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.msg })
        }
    }
    //Deleet Contact 
    const deleteContact = async id => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            dispatch({ type: DELETE_CONTACT, payload: id });
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.msg })
        }
    }
    //update contact
    const updateContact = async contact => {
        const config = {
            headers: { "Content-Type": "application/json" }
        }
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({ type: UPDATE_CONTACT, payload: res.data });
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.msg })
        }
    }
    // Clear Contacts 
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS })
    }
    //set current contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    }
    //clear current conatct
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
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
            error: state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContact,
            clearFilter,
            getContacts,
            clearContacts
        }}>
            {props.children}
        </contactContext.Provider>
    )
};

export default ContactSteta