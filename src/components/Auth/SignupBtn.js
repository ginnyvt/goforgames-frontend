import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

const SignupBtn = (props) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      className={`btn ${props.className}`}
      onClick={() =>
        loginWithRedirect({
          screen_hint: 'signup',
          redirectUri: 'http://localhost:3000/my-profile',
        })
      }
    >
      {props.children}
    </Button>
  );
};

export default SignupBtn;
