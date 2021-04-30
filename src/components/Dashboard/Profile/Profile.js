import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import './Profile.css';
import axios from 'axios';
import UpdateProfileModal from './UpdateProfileModal';

const Profile = () => {
  const server_url = process.env.REACT_APP_SERVER_URL;
  const { user, getAccessTokenSilently } = useAuth0();
  const { picture } = user;

  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setMessage('');
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setShowModal(true);
    const updatedProfile = {
      given_name: firstName,
      family_name: lastName,
      email,
    };

    const token = await getAccessTokenSilently();
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: `${server_url}/users`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: updatedProfile,
      });
      setMessage(data.message);
    } catch (err) {
      setMessage(err.response.data);
    }
  };
  return (
    <article className='my-profile'>
      <div className='profile-header'>
        <h3>My Profile</h3>
      </div>
      <div className='profile-body row justify-content-center'>
        <div className='profile-img-container col-md-12 col-lg-3 mb-4'>
          <img src={picture} alt='profile picture' className='profile-img' />
        </div>
        <div className='profile-details col-md-12 col-lg-9 '>
          <form onSubmit={onSubmitHandler}>
            <div className='row'>
              <div className='form-group col-lg-6'>
                <input
                  type='text'
                  className='form-control'
                  placeholder={
                    user.given_name ? `${user.given_name}` : 'First Name'
                  }
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className='form-group col-lg-6'>
                <input
                  type='text'
                  className='form-control'
                  placeholder={
                    user.family_name ? `${user.family_name}` : 'Last Name'
                  }
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>
            <div className='form-group '>
              <input
                type='email'
                className='form-control'
                placeholder={user.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='submit-btn-wrapper'>
              <button
                type='submit'
                className='btn btn-success '
                onClick={onSubmitHandler}
              >
                Update
              </button>
            </div>
          </form>

          <UpdateProfileModal
            show={showModal}
            closeModal={closeModalHandler}
            showModal={showModalHandler}
            message={message}
          />
        </div>
      </div>
    </article>
  );
};

export default Profile;
