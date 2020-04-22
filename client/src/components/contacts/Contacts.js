import React, { Fragment, useContext } from 'react';
import contactContext from '../../context/contact/contactContext';
import Contactitem from './Contactitem';

const Contacts = () => {
    const context = useContext(contactContext);
    const { contacts, filterd } = context;
    if (contacts.lenght === 0) {
        return <h4>Please Add a Contact</h4>
    }
    return (
        <Fragment>
            {filterd !== null ? filterd.map(contact => (<Contactitem key={contact.id} contact={contact} />)) : contacts.map(contact => (<Contactitem key={contact.id} contact={contact} />))}
        </Fragment>
    );
};

export default Contacts;