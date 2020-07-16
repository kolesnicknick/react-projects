import * as TYPES from '../types';

export default (state, action) => {
    switch (action.type) {
        case TYPES.GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            };
        case TYPES.CLEAR_CONTACTS:
            return {
                ...state,
                contacts: [],
                filtered: null,
                error: null,
                current: null,
            };
        case TYPES.ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload],
                loading: false
            };
        case TYPES.DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(c => c._id !== action.payload),
                loading: false
            };
        case TYPES.UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(c => c.id === action.payload.id ? action.payload : c),
                loading: false
            };
        case TYPES.SET_CURRENT:
            return {
                ...state,
                current: action.payload,
                loading: false
            };
        case TYPES.CLEAR_CURRENT:
            return {
                ...state,
                current: null,
                loading: false
            };
        case TYPES.FILTER_CONTACTS:
            return {
                ...state,
                filter: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return contact.name.match(regex) || contact.email.match(regex);
                }),
                loading: false
            };
        case TYPES.CLEAR_FILTER:
            return {
                ...state,
                filter: null,
                loading: false
            };
        case TYPES.CONTACT_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            throw new Error();
    }
}
