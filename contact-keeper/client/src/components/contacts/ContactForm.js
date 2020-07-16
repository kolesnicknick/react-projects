import React, { useContext, useEffect, useState } from 'react';
import ContactContext                             from '../../context/contact/contactContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
    });

    useEffect(() => {
        contactContext.current ? setContact(contactContext.current) : setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal',
        });
    }, [contactContext]);

    const clearForm = () => {
        contactContext.clearCurrent();
    };
    const onChange = e => setContact({...contact, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if (!contactContext.current) {
            contactContext.addContact(contact);
        } else {
            contactContext.updateContact(contact);
        }
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal',
        });
        contactContext.clearCurrent();
    };

    return (
            <form onSubmit={onSubmit}>
                <h2 className='text-primary'>{contactContext.current ? 'Edit contact' : 'Add contact'}</h2>
                <input type='text'
                       placeholder='Name'
                       name='name'
                       value={contact.name}
                       onChange={onChange}
                />
                <input type='text'
                       placeholder='Email'
                       name='email'
                       value={contact.email}
                       onChange={onChange}
                />
                <input type='text'
                       placeholder='Phone'
                       name='phone'
                       value={contact.phone}
                       onChange={onChange}
                />

                <h5>Contact Type</h5>
                <input type='radio' name='type' value='personal'
                       checked={contact.type === 'personal'} onChange={onChange}/> Personal {''}
                <input type='radio' name='type' value='professional'
                       checked={contact.type === 'professional'} onChange={onChange}/> Professional
                <div>
                    <input type='submit' value={contactContext.current ? 'Edit contact' : 'Add contact'}
                           className='btn btn-primary btn-block'/>
                    {contactContext.current &&
                    <input type='button' value='Clear' className='btn  btn-block' onClick={() => {
                        clearForm();
                    }}/>}
                </div>
            </form>
    );
};

export default ContactForm;
