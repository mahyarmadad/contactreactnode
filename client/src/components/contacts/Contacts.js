import React, { Fragment, useContext, useEffect } from 'react';
import contactContext from '../../context/contact/contactContext';
import Contactitem from './Contactitem';
import Spinner from "../layout/Spinner"
const Contacts = () => {
    const context = useContext(contactContext);
    const { contacts, filterd, getContacts, loading } = context;
    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, [])

    if (contacts === null || contacts.length === 0) {
        return <h4>Please Add a Contact</h4>
    }

    return (
        <Fragment>
            {contacts !== null && !loading ? (
                <Fragment>
                    {filterd !== null ? filterd.map(contact => (<Contactitem key={contact._id} contact={contact} />)) :
                        contacts.map(contact => (<Contactitem key={contact._id} contact={contact} />))}
                </Fragment>
            ) :
                <Spinner />}
        </Fragment>
    );
};

export default Contacts;