import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

import SignupBtn from '../../../Auth/SignupBtn';
import LoginBtn from '../../../Auth/LoginBtn';
import LogoutBtn from '../../../Auth/LogoutBtn';
// import Spinner from '../../../Spinner/Spinner';

const AuthNav = () => {
  const { isAuthenticated } = useAuth0();

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <Nav>
      {isAuthenticated ? (
        <>
          <LinkContainer to='/new-event'>
            <Nav.Link>
              <span>
                <i className='far fa-calendar-plus'></i>
              </span>
            </Nav.Link>
          </LinkContainer>

          <LinkContainer to='/users/dashboard'>
            <Nav.Link>Dashboard</Nav.Link>
          </LinkContainer>

          <LogoutBtn>Logout</LogoutBtn>
        </>
      ) : (
        <>
          <SignupBtn className='btn-info mr-2'>Sign Up</SignupBtn>
          <LoginBtn className='btn-warning'>Login</LoginBtn>
        </>
      )}
    </Nav>
  );
};

export default AuthNav;
