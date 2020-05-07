import React, { useContext, useEffect, useState } from 'react';
import AlertContext                               from '../../context/alert/alertContext';
import AuthContext                                from '../../context/auth/authContext';

const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });

    useEffect(() => {
        if(authContext.isAuthenticated){
            props.history.push('/');
        }
        if (authContext.error === 'User already exists') {
            alertContext.setAlert(authContext.error, 'danger');
        }
        authContext.clearErrors();
    }, [authContext.error, authContext.isAuthenticated, props.history]);

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (!user.name || !user.email || !user.password) {
            console.log('WHERE IT IS?');
            alertContext.setAlert('Please fill in all fields', 'danger');
        } else if (user.password !== user.passwordConfirmation) {
            alertContext.setAlert('Passwords should be equal', 'danger');
        } else {
            authContext.register({
                name: user.name,
                email: user.email,
                password: user.password
            });
        }
    };

    return (
        <div className='form-container'>
            <h1>Account <span className='text-primary'>Register</span></h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' value={user.name} onChange={onChange} required/>
                </div>

                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='text' name='email' value={user.email} onChange={onChange} required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='text' name='password' value={user.password} onChange={onChange} required/>
                </div>

                <div className='form-group'>
                    <label htmlFor='passwordConfirmation'>Confirm Password</label>
                    <input type='text' name='passwordConfirmation' value={user.passwordConfirmation}
                           onChange={onChange}
                           required
                           minLength='6'
                    />
                </div>
                <input type='submit' value='Register' className='btn btn-block btn-primary'/>
            </form>
        </div>
    );
};
export default Register;
