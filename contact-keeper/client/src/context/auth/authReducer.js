import * as TYPES from '../types';

export default (state, action) => {
    switch (action.type) {
        case TYPES.USER_LOADED:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false
            };
        case TYPES.REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };
        case TYPES.REGISTER_FAIL:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload,
            };
        case TYPES.AUTH_ERROR:

        case TYPES.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            throw new Error();
    }
}
