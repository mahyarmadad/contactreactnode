import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACT, CLEAR_FILTER, } from '../types';

export default (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contact: [...state.contact, action.payload]
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contact: state.contact.filter(contact => contact.id !== action.payload)
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }

        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contact: state.contact.map(contact => contact.id === action.payload.id ? action.payload : contact)
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