import * as TYPES from '../types'
const initialState = {count: 0};

export default (state, action) => {
    switch (action.type) {
        case TYPES.ADD_CONTACT:
            return {
                ...state,
                contacts:[...state.contacts, action.payload]
            };
        case TYPES.DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(c => c.id !== action.payload),
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
        default:
            throw new Error();
    }
}
