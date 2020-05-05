import * as TYPES from '../types'

export default (state, action) => {
    switch (action.type) {
        case TYPES.ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            };
        case TYPES.DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(c => c.id !== action.payload),
            };
        case TYPES.UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(c => c.id === action.payload.id ? action.payload : c),
            };
        case TYPES.SET_CURRENT:
            return {
                ...state,
                current: action.payload,
            };
        case TYPES.CLEAR_CURRENT:
            return {
                ...state,
                current: null,
            };
        case TYPES.FILTER_CONTACTS:
            return {
                ...state,
                filter: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return contact.name.match(regex) || contact.email.match(regex);
                }),
            };
        case TYPES.CLEAR_FILTER:
            return {
                ...state,
                filter: null,
            };
        default:
            throw new Error();
    }
}
