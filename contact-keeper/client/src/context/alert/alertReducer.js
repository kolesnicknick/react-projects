import * as TYPES from '../types';

export default (state, action) => {
    switch (action.type) {
        case TYPES.SET_ALERT:
            console.log([...state, action.payload]);
            return [...state, action.payload];
        case TYPES.REMOVE_ALERT:
            return state.filter(i => i.id !== action.payload);
        default:
            throw new Error();
    }
}
