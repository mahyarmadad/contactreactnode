import React, { useContext, useRef, useEffect } from 'react';
import contactContext from '../../context/contact/contactContext';


const ContactFilter = () => {
    const context = useContext(contactContext)
    const { filterContact, clearFilter, filterd } = context;
    useEffect(() => {
        if (filterd === null) {
            text.current.value = "";
        }
    }, [])

    const text = useRef("")
    const onChange = e => {
        if (text.current.value !== "") {
            filterContact(e.target.value);
        } else {
            clearFilter();
        }
    }
    return (
        <form>
            <input ref={text} type="text" placeholder="Filter Contacts..." onChange={onChange} />
        </form>
    );
};

export default ContactFilter;