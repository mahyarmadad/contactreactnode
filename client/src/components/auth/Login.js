import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alert/AlertContext';

const Login = (props) => {
    const alertcontext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const { setAlert } = alertcontext;
    const { login, error, clearerror, isAuthenticated } = authContext;

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

    const [user, setuser] = useState({ email: "", password: "" })
    const { email, password } = user;
    const onChange = e => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }
    const onSubmit = e => {
        e.preventDefault();
        if (email === "" || password === "") {
            setAlert("Please fill the Form", "danger");
        } else {
            login({ email, password });
        }
    }


    return (
        <div className="form-container">
            <h1>Account <span className="text-primary">Login</span></h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required />
                </div>
                <button type="submit" className="btn btn-block btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;