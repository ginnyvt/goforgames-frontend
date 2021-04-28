import React, { useContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import RegistrationModal from './RegistrationModal/RegistrationModal';
import Spinner from '../Spinner/Spinner';

import EventContext from '../../context/event-context';

import eventImg from '../../images/tour-1.jpeg';
import styles from './EventDetail.module.css';

const EventDetail = () => {
  // const { eventObj: singleEvent } = useContext(EventContext);
  const {
    isAuthenticated,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();
  const { eventId } = useParams();
  const [singleEvent, setSingleEvent] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [numParticipants, setNumParticipants] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/events/${eventId}`
        );
        console.log(data);
        setSingleEvent(data.results);
        setImgUrl(data.results.imgUrl || '');
      } catch (err) {
        console.log(err.response);
      }
    };

    fetchEvent();
  }, []);

  useEffect(() => {
    const fetchCountParticipants = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/participants/count/${eventId}`
        );
        setNumParticipants(data.results);
      } catch (err) {
        console.log(err.response);
      }
    };

    fetchCountParticipants();
  }, [numParticipants, message]);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setMessage('');
  };

  const registerEventHandler = async () => {
    setShowModal(true);
    const token = await getAccessTokenSilently();
    try {
      const { data } = await axios({
        method: 'POST',
        url: `http://localhost:5000/participants/${singleEvent._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(data.message);
    } catch (err) {
      setMessage(err.response.data);
    }
  };

  const cancelEventHandler = async () => {
    setShowModal(true);
    const token = await getAccessTokenSilently();
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: `http://localhost:5000/participants/${eventId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(data.message);
    } catch (err) {
      setMessage(err.response.data);
    }
  };

  const renderButtons = () => {
    const current = dayjs().format();
    if (!isAuthenticated) {
      return (
        <div>
          <p className={styles.login}>
            Please
            <span onClick={() => loginWithRedirect()}> login</span> to register!
          </p>
        </div>
      );
    }

    if (current > singleEvent.startTime) {
      return (
        <div>
          <button className='btn' disabled='true'>
            Past Event
          </button>
        </div>
      );
    } else if (singleEvent.status === 'cancelled') {
      return (
        <div>
          <p className='text-center text-info'>
            This event has been cancelled!
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <button className='btn btn-info mr-3' onClick={registerEventHandler}>
            ATTEND
          </button>
          <button className='btn btn-warning' onClick={cancelEventHandler}>
            CANCEL
          </button>
        </div>
      );
    }
  };

  const imageUrl = imgUrl || eventImg;
  const bgStyle = {
    backgroundImage: `url(${imageUrl})`,
  };

  return (
    <section className={styles.event__section}>
      <div className={styles.event__section__center}>
        {singleEvent === null ? (
          <Spinner />
        ) : (
          <div className='row'>
            <div className='col-12'>
              <article className={styles.event__details}>
                <div className={styles.sed__background} style={bgStyle}></div>

                <div className={styles.sed__header}>
                  <div className={styles.date__box}>
                    <span className={styles.date__day}>
                      {dayjs(singleEvent.startTime).format('DD')}
                    </span>
                    <span className={styles.date__month}>
                      {' '}
                      {dayjs(singleEvent.startTime).format('MMMM')}
                    </span>
                  </div>
                  <div className={styles.title__wrapper}>
                    <h4>{singleEvent.title}</h4>
                    <h5 className={`text-muted ${styles.event__location}`}>
                      {singleEvent.address}
                      <span>
                        {' '}
                        {singleEvent.maxParticipants - numParticipants} spots
                        left
                      </span>
                    </h5>
                  </div>
                  <hr />
                </div>

                <div className={styles.sed__info}>
                  <p>
                    <span className={styles.event__icon}>
                      <i className='far fa-user'></i>
                    </span>
                    Hosted: {singleEvent.creator.name}
                  </p>
                  <p>
                    <span className={styles.event__icon}>
                      <i className='far fa-clock'></i>
                    </span>
                    From {dayjs(singleEvent.startTime).format('HH:mm')} to{' '}
                    {dayjs(singleEvent.endTime).format('HH:mm')}
                  </p>
                  <p>
                    <span className={styles.event__icon}>
                      <i className='fas fa-users'></i>
                    </span>
                    No. of participants: {numParticipants}
                  </p>

                  <p>
                    <span className={styles.event__icon}>
                      <i className='fas fa-hourglass-start'></i>
                    </span>
                    Register before:{' '}
                    {dayjs(singleEvent.registerBefore).format(
                      'HH:mm,  MMMM DD  '
                    )}
                  </p>

                  <p>
                    <span className={styles.event__icon}>
                      <i className='fas fa-hourglass-end'></i>
                    </span>
                    Cancel before:{' '}
                    {dayjs(singleEvent.cancelBefore).format(
                      'HH:mm,    MMMM DD  '
                    )}
                  </p>
                  <p>
                    <span className={styles.event__icon}>
                      <i className='far fa-clipboard'></i>
                    </span>
                    {singleEvent.description || `Let's have fun time together!`}
                  </p>

                  <div className={styles.btn__group}>
                    {renderButtons()}

                    <Link to='/'>
                      <span>
                        <i className='far fa-arrow-alt-circle-left fa-2x'></i>
                      </span>
                    </Link>
                  </div>

                  {/* Registraion modal */}
                  <RegistrationModal
                    show={showModal}
                    closeModal={closeModalHandler}
                    showModal={showModalHandler}
                    message={message}
                  />
                </div>
              </article>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventDetail;
