import React, {useReducer} from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer'


const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        loading: false,
        error: null
    };
    const [state, dispatch] = useReducer(authReducer, initialState);

    //LOAD USER
    //REGISTER USER
    //LOGIN USER
    //LOGOUT USER
    //CLEAR ERRORS

    return (
        <AuthContext.Provider value={
            {
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error
            }
        }>{props.children}</AuthContext.Provider>);
};

export default AuthState;
