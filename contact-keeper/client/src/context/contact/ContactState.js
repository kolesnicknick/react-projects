import React, {useReducer} from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer'
import * as uuid from 'uuid';
import * as TYPES from '../types'

const ContactState = props => {
    const initialState = {
        contacts: [{
            id: 1,
            name: "Anton Kozal",
            email: 'insfsafdf@wix.com',
            phone: '+380997859700',
            type: 'personal'
        }, {
            id: 2,
            name: "ASp Net",
            email: 'sdf@fff.com',
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
        current: null,
        filter: null,
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
    const clearCurrent = () => {
        dispatch({type: TYPES.CLEAR_CURRENT, payload: {}});
    };

    //Update contact
    const updateContact = (contact) => {
        dispatch({type: TYPES.UPDATE_CONTACT, payload: contact});
    };

    //Filter contacts
    const filterContacts = (params) => {
        dispatch({type: TYPES.FILTER_CONTACTS, payload: params});
    };

    //Clear filter
    const clearFilter = () => {
        dispatch({type: TYPES.CLEAR_FILTER, payload: {}});
    };

    return (
        <ContactContext.Provider value={
            {
                contacts: state.contacts,
                current: state.current,
                filter: state.filter,
                addContact,
                deleteContact,
                clearCurrent,
                setCurrent,
                updateContact,
                filterContacts,
                clearFilter
            }
        }>{props.children}</ContactContext.Provider>);
};

export default ContactState;