import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACT, CLEAR_FILTER, CONTACT_ERROR, GET_CONTACTS, CLEAR_CONTACTS, } from '../types';

export default (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contact: [action.payload, ...state.contact],
                loading: false
            }
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contact: state.contact.filter(contact => contact._id !== action.payload)
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case GET_CONTACTS:
            return {
                ...state,
                contact: action.payload,
                loading: false
            };
        case CLEAR_CONTACTS:
            return {
                ...state,
                contact: null,
                filterd: null,
                current: null
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contact: state.contact.map(contact => contact._id === action.payload._id ? action.payload : contact),
                loading: false
            }

        case FILTER_CONTACT:
            return {
                ...state,
                filterd: state.contact.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, "gi")
                    return contact.name.match(regex) || contact.email.match(regex)
                })
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filterd: null
            }
        default: return state
    }
}