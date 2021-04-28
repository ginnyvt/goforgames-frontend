import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

const LogoutBtn = (props) => {
  const { logout } = useAuth0();
  return (
    <Button
      className={`btn ${props.className}`}
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      {props.children}
    </Button>
  );
};

export default LogoutBtn;
