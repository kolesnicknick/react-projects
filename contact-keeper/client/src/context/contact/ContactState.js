import React, {useReducer} from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer'
import * as uuid from 'uuid';
import * as TYPES from '../types'

const ContactState = props => {
    const initialState = {
        contacts: [{
            id: 1,
            name: "Niko Kole",
            email: 'kolesniknikolai92@gmail.com',
            phone: '+380997859700',
            type: 'personal'
        }, {
            id: 2,
            name: "Niko Kole",
            email: 'kolesniknikolai92@gmail.com',
            phone: '+380997859700',
            type: 'personal'
        }, {
            id: 3,
            name: "Niko Kole",
            email: 'kolesniknikolai92@gmail.com',
            phone: '+380997859700',
            type: 'personal'
        }, {
            id: 4,
            name: "Niko Kole",
            email: 'kolesniknikolai92@gmail.com',
            phone: '+380997859700',
            type: 'professional'
        },],
        current: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //Add contact
    const addContact = (contact) => {
        contact.id = uuid.v4();
        dispatch({type: TYPES.ADD_CONTACT, payload: contact});
    };


    //Delete Contact
    const deleteContact = contactId => {
        dispatch({type: TYPES.DELETE_CONTACT, payload: contactId});
    };

    //Set current contact
    const setCurrent = contact => {
        dispatch({type: TYPES.SET_CURRENT, payload: contact});
    };

    //Clear current contact
    const clearCurrent = contact => {
        dispatch({type: TYPES.CLEAR_CURRENT, payload: {}});
    };

    //Update contact

    //Filter contacts

    //Clear filter

    return (
        <ContactContext.Provider value={
            {
                contacts: state.contacts,
                current: state.current,
                addContact,
                deleteContact,
                clearCurrent,
                setCurrent
            }
        }>{props.children}</ContactContext.Provider>);
};

export default ContactState;