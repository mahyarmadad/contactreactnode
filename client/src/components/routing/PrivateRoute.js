import React, { useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const context = useContext(AuthContext)
    const { isAuthenticated, loading } = context;
    return (
        <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to="/login" />) : (<Component {...props} />)} />
    );
};

export default PrivateRoute;
