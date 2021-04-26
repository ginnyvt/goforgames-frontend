import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Spinner from '../components/Spinner/Spinner';

const ProtectedRoute = ({ component, ...args }) => {
  return (
    <Route
      component={withAuthenticationRequired(component, {
        onRedirecting: () => <Spinner />,
      })}
      {...args}
    />
  );
};

export default ProtectedRoute;
