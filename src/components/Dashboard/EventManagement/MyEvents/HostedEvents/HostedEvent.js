import React, { useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Spinner from '../../../../Spinner/Spinner';
import ParticipantsList from './ParticipantsList';

import eventImg from '../../../../../images/tour-1.jpeg';

const HostedEvent = ({ hostedEvent }) => {
  console.log(hostedEvent);
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showListModal, setShowListModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const showListModalHandler = () => {
    setShowListModal(true);
  };

  const closeListModalHandler = () => {
    setShowListModal(false);
  };

  const cancelEventHandler = async () => {
    setLoading(true);
    const token = await getAccessTokenSilently();
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: `http://localhost:5000/events/${hostedEvent._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          status: 'cancelled',
        },
      });
      setShowModal(false);
      setDisableBtn(true);
    } catch (err) {
      console.log(err.response);
    }
  };

  const showListParticipants = () => {
    setShowListModal(true);
    setShowList(true);
  };

  const renderBtns = () => {
    const current = dayjs().format();
    if (current > hostedEvent.startTime) {
      return (
        <div>
          <Button variant='info' disabled>
            Past Event
          </Button>
        </div>
      );
    } else if (hostedEvent.status === 'cancelled') {
      return (
        <div>
          <p className='text-info text-center'>
            This event has been cancelled!
          </p>
        </div>
      );
    } else {
      return (
        <div className='hosted-event-btns'>
          <Button
            disabled={disableBtn}
            variant='info mr-2'
            onClick={() => history.push(`events/${hostedEvent._id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant='warning'
            onClick={showModalHandler}
            disabled={disableBtn}
          >
            Cancel
          </Button>

          <Modal
            show={showModal}
            onHide={closeModalHandler}
            backdrop='static'
            keyboard={false}
            centered
          >
            <Modal.Body>
              {loading ? <Spinner /> : 'Do you want to cancel the event?'}
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={closeModalHandler}>
                No
              </Button>
              <Button variant='primary' onClick={cancelEventHandler}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  };

  return (
    <Card>
      <Card.Img
        variant='top'
        src={hostedEvent.imgUrl || eventImg}
        style={{ height: '180px' }}
      />
      <Card.Body>
        <Card.Title>{hostedEvent.title}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>
          {hostedEvent.address} |{' '}
          {dayjs(hostedEvent.startTime).format('DD, MMMM - HH:mm')}
        </Card.Subtitle>
        <Card.Text>
          {hostedEvent.description || `Let's have fun time together!`} <br />
          <small>
            <button onClick={showListParticipants}>Manage</button>
          </small>
          {showList && (
            <ParticipantsList
              eventId={hostedEvent._id}
              show={showListModal}
              closeModal={closeListModalHandler}
              showModal={showListModalHandler}
            />
          )}
        </Card.Text>

        {renderBtns()}
      </Card.Body>
    </Card>
  );
};

export default HostedEvent;
