import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const LoginBtn = (props) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      onClick={() => loginWithRedirect()}
      className={`btn ${props.className}`}
    >
      {props.children}
    </Button>
  );
};

export default LoginBtn;
