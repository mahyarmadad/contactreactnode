import React, { useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';

const Alerts = () => {
    const alertcontext = useContext(AlertContext);

    return (
        alertcontext.alerts.length > 0 &&
        alertcontext.alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle" /> {alert.msg}
            </div>
        ))
    );
};

export default Alerts;