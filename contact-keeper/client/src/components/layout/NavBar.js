import React, { Fragment, useContext, useEffect } from 'react';
import * as PropTypes                             from 'prop-types';
import { Link }                                   from 'react-router-dom';
import AuthContext                                from '../../context/auth/authContext';
import ContactContext                             from '../../context/contact/contactContext';

const NavBar = ({title, icon}) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

    const onLogout = () => {
        authContext.logout();
        contactContext.clearContacts();
    };

    const authLinks = (
            <Fragment>
                <li>Hello, {authContext.user && authContext.user.name}</li>
                <li><a onClick={onLogout} href='#!'>
                    <i className='fas fa-sign-out-alt'>
                    </i>
                    <span className='hide-sm'>Logout</span>
                </a>
                </li>
            </Fragment>
    );

    const guestLinks = (
            <Fragment>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/register'>Register</Link></li>
            </Fragment>
    );

    return (
            <div className='navbar bg-primary'>
                <h1>
                    <i className={icon}/> <Link to='/'>{title}</Link>
                </h1>
                <ul>
                    {authContext.isAuthenticated ? authLinks : guestLinks}
                    <li><Link to='/about'>About</Link></li>
                </ul>
            </div>
    );
};

NavBar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
};

NavBar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt'
};

export default NavBar;
