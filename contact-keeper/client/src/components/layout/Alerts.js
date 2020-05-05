import React, {Component, useContext} from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = (props) => {
    const alertContext = useContext(AlertContext);
    alertContext.alerts.forEach(console.log);
        return (
            alertContext.alerts.length > 0 && alertContext.alerts.map(alert => (
                <div key = {alert.id} className={`alert alert-${alert.type}`}>
                    <i className="fas fa-info-circle" /> { ' ' + alert.msg }
                </div>
                )
            )
        );
};

export default Alerts;