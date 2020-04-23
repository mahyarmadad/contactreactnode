import React, { useState, useContext, useEffect } from 'react';
import contactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    const context = useContext(contactContext);
    const { addContact, current, clearCurrent, updateContact } = context;
    useEffect(() => {
        if (current !== null) {
            setcontact(current);
        } else {
            setcontact({ name: "", email: "", phone: "", type: "personal" })
        }
    }, [context, current])
    const [contact, setcontact] = useState({ name: "", email: "", phone: "", type: "personal" });
    const { name, email, phone, type } = contact;
    const onChange = e => setcontact({ ...contact, [e.target.name]: e.target.value })
    const onsubmit = e => {
        e.preventDefault();
        if (current === null) {
            addContact(contact);
        } else {
            updateContact(contact);
        }
        clearAll();
    }

    const clearAll = () => { clearCurrent(); }
    return (
        <form onSubmit={onsubmit}>
            <h2 className="text-primary">{current ? "Edit Contact" : "Add Contact"}</h2>
            <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
            <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} />
            <input type="text" name="phone" value={phone} onChange={onChange} placeholder="09**-111-1111" />
            <h5>Contact Type</h5>
            <input type="radio" name="type" value="personal" checked={type === "personal"} onChange={onChange} /> Personal {' '}
            <input type="radio" name="type" value="professional" checked={type === "professional"} onChange={onChange} /> Professional {' '}
            <div>
                <input type="submit" value={current ? "Update Contact" : "Add Contact"} className="btn btn-promary btn-lg" />
            </div>
            {current && <div>
                <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
            </div>}
        </form>
    );
};

export default ContactForm; 