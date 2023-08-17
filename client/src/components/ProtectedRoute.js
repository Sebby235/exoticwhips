import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './UserContext';

function ProtectedRoute({ component: Component, ...rest }) {
  const { user } = React.useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;
