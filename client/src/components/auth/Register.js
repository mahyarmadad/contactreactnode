import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

const Register = (props) => {
    const [user, setuser] = useState({ name: "", email: "", password: "", password2: "" })
    const { name, email, password, password2 } = user;
    const alertcontext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const { setAlert } = alertcontext;
    const { register, error, clearerror, isAuthenticated } = authContext;
    useEffect(() => {
        if (isAuthenticated) {
            props.history.push("/");
        }
        if (error) {
            setAlert(error, "danger");
            clearerror();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const onChange = e => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }
    const onSubmit = e => {
        e.preventDefault();
        if (name === "" || email === "" || password === "") {
            setAlert("Please Enter all Fields", "danger");
        } else if (password !== password2) {
            setAlert("Password do not Match", "danger");
        } else {
            register({ name, email, password });
        }
    }
    return (
        <div className="form-container">
            <h1>Account <span className="text-primary">Register</span></h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required minLength="6" />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" name="password2" value={password2} onChange={onChange} required minLength="6" />
                </div>
                <button type="submit" className="btn btn-block btn-success">Register</button>
            </form>
        </div>
    );
};

export default Register;