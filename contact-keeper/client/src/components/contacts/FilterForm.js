import React, {useContext, useEffect, useRef} from 'react';
import ContactContext from '../../context/contact/contactContext'

const FilterForm = () => {
    const contactContext = useContext(ContactContext);
    const onChange = e => {
        if (text.current.value !== '') {
            contactContext.filterContacts(e.target.value);
        } else {
            contactContext.clearFilter();
        }
    };    const text = useRef('');
    useEffect(() => {
        if(!contactContext.filter){
            text.current.value = null;
        }
    });

        return (
            <form>
                <input
                    ref={text}
                    type='text'
                    placeholder='Filter Contacts...'
                    onChange={onChange}
                />
            </form>
        );
};

export default FilterForm;