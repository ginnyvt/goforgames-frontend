import React, { useState } from 'react';
import axios from 'axios';

import SubscriptionModal from './SubscriptionModal';

const Footer = () => {
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

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowModal(true);
    try {
      const { data } = await axios({
        method: 'POST',
        url: 'http://localhost:5000/subscribers',
        data: { email: email },
      });

      setMessage(data.message);
      setEmail('');
    } catch (err) {
      setMessage(err.response.data);
    }
  };

  return (
    <footer className='bg-light text-center text-lg-start '>
      <div className='container p-4'>
        <form onSubmit={submitHandler}>
          <div className='row d-flex justify-content-center'>
            <div className='col-auto'>
              <p className='pt-2'>
                <strong>Sign up for our latest events</strong>
              </p>
            </div>

            <div className='col-md-5 col-12'>
              <div className='form-outline mb-2 form-white'>
                <input
                  type='email'
                  name='subscribers'
                  id='subscribers-input'
                  className='form-control'
                  placeholder='Email address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <p>{message}</p>
            </div>

            <div className='col-auto'>
              <button type='submit' className='btn btn-success mb-4'>
                Subscribe
              </button>
            </div>
          </div>
        </form>

        <SubscriptionModal
          show={showModal}
          closeModal={closeModalHandler}
          showModal={showModalHandler}
          message={message}
        />
      </div>

      <div
        className='text-center p-3'
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
      >
        © 2021 Copyright:{' '}
        <a
          className='text-dark'
          href='https://github.com/quynh-vt'
          style={{ fontWeight: 'bold' }}
        >
          Quynh Tran
        </a>
      </div>
    </footer>
  );
};

export default Footer;
