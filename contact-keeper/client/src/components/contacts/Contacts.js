import React, {Fragment, useContext} from 'react';
import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem';
import TransitionGroup from "react-transition-group/cjs/TransitionGroup";
import {CSSTransition} from "react-transition-group";

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const contacts = contactContext.filter || contactContext.contacts;

    if (contacts.length < 1) {
        return <h3>Please add some contacts...</h3>
    }

    return (
        <Fragment>
            <TransitionGroup>
                {contacts.map(contact =>
                    <CSSTransition key={contact.id} timeout={500} classNames='item'>
                        <ContactItem  contact={contact}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </Fragment>
    );
};

export default Contacts;