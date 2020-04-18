import React, {Component} from 'react';
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";

class Home extends Component {
    render() {
        return (
            <div className='grid-2'>
                <div><ContactForm /></div>
                <div><Contacts /></div>
            </div>
        );
    }
}

export default Home;