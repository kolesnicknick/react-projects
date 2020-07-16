import React, { useContext, useEffect, useState } from 'react';
import AlertContext                               from '../../context/alert/alertContext';
import AuthContext                                from '../../context/auth/authContext';

const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (authContext.isAuthenticated) {
            props.history.push('/');
        }
        if (authContext.error === 'Invalid Credentials') {
            alertContext.setAlert(authContext.error, 'danger');
            authContext.clearErrors();
        }
        authContext.clearErrors();
    }, [authContext.error, authContext.isAuthenticated, props.history]);

    const onChange = e => setUser({...user, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        if (user.email === '' || user.password === '') {
            alertContext.setAlert('Please fill in all fields', 'danger');
        } else {
            authContext.login(user);
        }
    };

    return (
            <div className='form-container'>
                <h1>Account <span className='text-primary'>Login</span></h1>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input type='text' name='email' value={user.email} onChange={onChange}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input type='text' name='password' value={user.password} onChange={onChange}/>
                    </div>
                    <input type='submit' value='Login' className='btn btn-block btn-primary'/>
                </form>
            </div>);
};

export default Login;
