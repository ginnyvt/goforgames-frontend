import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

const SignupBtn = (props) => {
  const client_url = process.env.REACT_APP_CLIENT_URL;
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      className={`btn ${props.className}`}
      onClick={() =>
        loginWithRedirect({
          screen_hint: 'signup',
          redirectUri: `${client_url}/users/dashboard`,
        })
      }
    >
      {props.children}
    </Button>
  );
};

export default SignupBtn;
