import React, { useContext, useEffect } from 'react';
import Contacts                         from '../contacts/Contacts';
import ContactForm                      from '../contacts/ContactForm';
import FilterForm                       from '../contacts/FilterForm';
import AuthContext                      from '../../context/auth/authContext';

const Home = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
    }, []);

    return (
            <div className='grid-2'>
                <div>
                    <ContactForm/>
                </div>
                <div>
                    <FilterForm/>
                    <Contacts/>
                </div>
            </div>
    );
};

export default Home;
