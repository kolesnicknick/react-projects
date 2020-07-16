import React, { useReducer } from 'react';
import ContactContext        from './contactContext';
import contactReducer        from './contactReducer';
import axios                 from 'axios';
import * as TYPES            from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [],
    current: null,
    filter: null,
    error: null,
    loading: false
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // Get Contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');
      console.log(`GET CONTACTS CALL: ` + JSON.stringify(res.data));
      dispatch({
        type: TYPES.GET_CONTACTS,
        payload: res.data.contacts
      });
    } catch (err) {
      dispatch({
        type: TYPES.CONTACT_ERROR,
        payload: err
      });
    }
  };

  // Get Contacts
  const clearContacts = () => {
    dispatch({type: TYPES.CLEAR_CONTACTS});
  };
  //Add contact
  const addContact = async (contact) => {
    try {
      const res = await axios.post('api/contacts/ ', contact, config);
      dispatch({type: TYPES.ADD_CONTACT, payload: res.data});
    } catch (err) {
      dispatch({type: TYPES.CONTACT_ERROR, payload: err.response.msg});
    }
  };


  //Delete Contact
  const deleteContact = async contactId => {
    try {
      await axios.delete(`api/contacts/${contactId}`, config);
      dispatch({type: TYPES.DELETE_CONTACT, payload: contactId});
    } catch (err) {
      dispatch({type: TYPES.CONTACT_ERROR, payload: err.response.msg});
    }
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
  const updateContact = async (contact) => {
    try {
      const res = await axios.put(`api/contacts/${contact._id}`, contact, config);
      dispatch({type: TYPES.UPDATE_CONTACT, payload: res.data});
    } catch (err) {
      dispatch({type: TYPES.CONTACT_ERROR, payload: err.response.msg});
    }
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
              getContacts,
              clearContacts,
              addContact,
              deleteContact,
              clearCurrent,
              setCurrent,
              updateContact,
              filterContacts,
              clearFilter,
              error: state.error,
            }
          }>{props.children}</ContactContext.Provider>);
};

export default ContactState;
