import React, { useReducer } from 'react';
import AuthContext           from './authContext';
import authReducer           from './authReducer';
import axios                 from 'axios';
import {
    AUTH_ERROR, CLEAR_ERRORS, LOGIN_FAIL, LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS, USER_LOADED
} from '../types';
import setAuthToken          from '../../utils/setAuthToken';

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
    const loadUser = async () => {
            setAuthToken(localStorage.token);

        try {
            const res = await axios.get('api/auth/me');
            console.log(res);
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });

        } catch (e) {
            console.log(e);
            dispatch({type: AUTH_ERROR});
        }
    };

    //REGISTER USER
    const register = async (formData) => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        try {
            const res = await axios.post('api/users', formData, config);
            console.log(res);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });

            loadUser();
        } catch (error) {
            console.log(error);
            console.log('IN REDUCER');
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg
            });
        }
    };

    //LOGIN USER
    const login = async (formData) => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        try {
            const res = await axios.post('api/auth/login', formData, config);
            console.log(res);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });

            loadUser();
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.msg
            });
        }    };

    //LOGOUT USER
    const logout = () => {
        console.log('hello');
    };

//CLEAR ERRORS
    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS,
        });
    };


    return (
        <AuthContext.Provider value={
            {
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors
            }
        }>{props.children}</AuthContext.Provider>);
};


export default AuthState;
