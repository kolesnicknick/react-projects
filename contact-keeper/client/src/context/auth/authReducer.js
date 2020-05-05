import * as TYPES from '../types'

export default (state, action) => {
    switch (action.type) {
        case TYPES.ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            };
        default:
            throw new Error();
    }
}
