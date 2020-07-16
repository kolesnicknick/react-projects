import React, { useContext } from 'react';
import AuthContext           from '../../context/auth/authContext';
import { Redirect, Route }   from 'react-router-dom';

const PrivateRoute = ({comp: Component, ...rest}) => {
    const authContext = useContext(AuthContext);
    return (
            <Route
                    {...rest}
                    render={props =>
                            !authContext.isAuthenticated && !authContext.loading ? (
                                    <Redirect to="/login"/>
                            ) : (
                                    <Component {...props} />
                            )
                    }
            />
    );
};

export default PrivateRoute;
